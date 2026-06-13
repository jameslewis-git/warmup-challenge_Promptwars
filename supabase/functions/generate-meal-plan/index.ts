import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "npm:zod";
import { verifyAuth } from "../_shared/auth.ts";
import { checkRateLimit } from "../_shared/rateLimit.ts";
import { callGemini } from "../_shared/gemini.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sanitizeString = (val: string) => val.replace(/<[^>]*>?/gm, '').trim();

const UserPreferencesSchema = z.object({
  dietary_restrictions: z.array(z.string().transform(sanitizeString).pipe(z.string().max(50))).max(20).default([]),
  allergies: z.array(z.string().transform(sanitizeString).pipe(z.string().max(50))).max(20).default([]),
  available_time_minutes: z.number().min(5).max(240),
  budget_per_day_usd: z.number().min(1).max(999),
  preferred_cuisines: z.array(z.string().transform(sanitizeString).pipe(z.string().max(50))).max(10).default([]),
  plan_date: z.string()
});

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { user, supabaseClient } = await verifyAuth(req);
    await checkRateLimit(supabaseClient, user.id, 'generate_meal_plan', 10);

    const body = await req.json();
    const prefs = UserPreferencesSchema.parse(body);

    const systemPrompt = `You are a professional meal planner. Respond ONLY with valid JSON, no explanation.
Return a meal plan object with this exact structure:
{
  "breakfast": { "name": "string", "ingredients": ["string"], "estimated_cost": 0, "cook_time_minutes": 0 },
  "lunch": { "name": "string", "ingredients": ["string"], "estimated_cost": 0, "cook_time_minutes": 0 },
  "dinner": { "name": "string", "ingredients": ["string"], "estimated_cost": 0, "cook_time_minutes": 0 }
}`;

    const userPrompt = `Generate a meal plan.
Constraints:
- Total cost MUST be under $${prefs.budget_per_day_usd}
- Cook time per meal MUST be under ${prefs.available_time_minutes} minutes
- MUST respect dietary restrictions: ${prefs.dietary_restrictions.join(', ')}
- MUST avoid allergens: ${prefs.allergies.join(', ')}
- Preferred cuisines: ${prefs.preferred_cuisines.join(', ')}`;

    let content = await callGemini(systemPrompt, userPrompt);
    let plan = JSON.parse(content);
    
    let totalCost = plan.breakfast.estimated_cost + plan.lunch.estimated_cost + plan.dinner.estimated_cost;
    let budgetStatus = 'within';
    
    if (totalCost > prefs.budget_per_day_usd * 1.10) {
      budgetStatus = 'exceeded';
      const retryUserPrompt = userPrompt + `\n\nIMPORTANT: Reduce all costs by at least 20%. Current total $${totalCost} exceeds $${prefs.budget_per_day_usd} budget.`;
      content = await callGemini(systemPrompt, retryUserPrompt);
      plan = JSON.parse(content);
      totalCost = plan.breakfast.estimated_cost + plan.lunch.estimated_cost + plan.dinner.estimated_cost;
      budgetStatus = totalCost > prefs.budget_per_day_usd * 1.10 ? 'exceeded' : (totalCost <= prefs.budget_per_day_usd * 0.85 ? 'within' : 'warning');
    } else if (totalCost > prefs.budget_per_day_usd * 0.85) {
      budgetStatus = 'warning';
    }

    const { data, error } = await supabaseClient.from('meal_plans').insert({
      user_id: user.id,
      plan_date: prefs.plan_date,
      breakfast: plan.breakfast,
      lunch: plan.lunch,
      dinner: plan.dinner,
      total_estimated_cost: totalCost,
      budget_status: budgetStatus,
      ai_model_used: 'gemini-2.0-flash'
    }).select().single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    if (error.message === 'RATE_LIMIT_EXCEEDED') {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { headers: corsHeaders, status: 429 });
    }
    return new Response(JSON.stringify({ error: error.message }), { headers: corsHeaders, status: 400 });
  }
});

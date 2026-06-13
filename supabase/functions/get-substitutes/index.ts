import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "npm:zod";
import { verifyAuth } from "../_shared/auth.ts";
import { checkRateLimit } from "../_shared/rateLimit.ts";
import { callGemini } from "../_shared/gemini.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SubstituteRequestSchema = z.object({
  ingredient: z.string().max(100),
  reason: z.enum(["allergy", "vegan", "budget", "unavailable"])
});

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { user, supabaseClient } = await verifyAuth(req);
    await checkRateLimit(supabaseClient, user.id, 'get_substitutes', 50);

    const body = await req.json();
    const { ingredient, reason } = SubstituteRequestSchema.parse(body);

    const { data: existing } = await supabaseClient
      .from('ingredient_substitutes')
      .select('*')
      .ilike('original_ingredient', ingredient)
      .limit(3);

    if (existing && existing.length >= 3) {
      return new Response(JSON.stringify({ substitutes: existing.map(sub => ({
        name: sub.substitute,
        reason: sub.reason,
        costDelta: sub.cost_delta
      }))}), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const systemPrompt = `You are a cooking expert. Respond ONLY with valid JSON. No extra text.`;
    const userPrompt = `Give me 3 substitutes for ${ingredient} for reason: ${reason}.
Return exactly this format: {"substitutes": [{"name": "string", "reason": "string", "cost_delta": 0.0}]}`;

    const content = await callGemini(systemPrompt, userPrompt);
    const parsed = JSON.parse(content);
    
    // Cache to DB
    for (const sub of parsed.substitutes) {
      await supabaseClient.from('ingredient_substitutes').insert({
        original_ingredient: ingredient,
        substitute: sub.name,
        reason: sub.reason,
        cost_delta: sub.cost_delta
      });
    }

    return new Response(JSON.stringify({ substitutes: parsed.substitutes }), {
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

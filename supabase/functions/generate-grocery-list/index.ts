import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "npm:zod";
import { verifyAuth } from "../_shared/auth.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CATEGORY_MAP: Record<string, string> = {
  "tomato": "Produce", "lettuce": "Produce", "onion": "Produce",
  "garlic": "Produce", "spinach": "Produce", "carrot": "Produce",
  "milk": "Dairy", "cheese": "Dairy", "butter": "Dairy", "yogurt": "Dairy",
  "chicken": "Meat & Seafood", "beef": "Meat & Seafood", "salmon": "Meat & Seafood",
  "shrimp": "Meat & Seafood", "turkey": "Meat & Seafood",
  "rice": "Pantry", "pasta": "Pantry", "flour": "Pantry", "oil": "Pantry",
  "salt": "Pantry", "pepper": "Pantry", "sugar": "Pantry",
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { user, supabaseClient } = await verifyAuth(req);
    const body = await req.json();
    const { meal_plan_id } = z.object({ meal_plan_id: z.string().uuid() }).parse(body);

    const { data: mealPlan, error: fetchError } = await supabaseClient
      .from('meal_plans')
      .select('*')
      .eq('id', meal_plan_id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !mealPlan) throw new Error("Meal plan not found or access denied");

    const rawIngredients = [
      ...(mealPlan.breakfast.ingredients || []),
      ...(mealPlan.lunch.ingredients || []),
      ...(mealPlan.dinner.ingredients || [])
    ];

    const deduplicated = Array.from(new Set(rawIngredients.map(i => i.toLowerCase().trim())));
    
    const items = await Promise.all(deduplicated.map(async (ingredient) => {
      let category = "Other";
      for (const [key, val] of Object.entries(CATEGORY_MAP)) {
        if (ingredient.includes(key)) {
          category = val;
          break;
        }
      }

      const { data: substitutes } = await supabaseClient
        .from('ingredient_substitutes')
        .select('*')
        .ilike('original_ingredient', `%${ingredient}%`)
        .limit(3);

      return {
        id: crypto.randomUUID(),
        name: ingredient,
        category,
        quantity: 1,
        unit: 'unit',
        estimatedCost: 2.0,
        checked: false,
        substitutes: substitutes?.map(sub => ({
          name: sub.substitute,
          reason: sub.reason,
          costDelta: sub.cost_delta
        })) || []
      };
    }));

    const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);

    const { data, error } = await supabaseClient.from('grocery_lists').insert({
      user_id: user.id,
      meal_plan_id,
      items,
      total_estimated_cost: totalCost
    }).select().single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { headers: corsHeaders, status: 400 });
  }
});

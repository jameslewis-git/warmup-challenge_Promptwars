import type { GroceryItem, MealPlan, Substitute, UserPreferences } from "@/types";
import { supabase } from "./supabase";

export async function generateMealPlan(preferences: UserPreferences): Promise<MealPlan> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const payload = {
    dietary_restrictions: preferences.dietaryRestrictions,
    allergies: preferences.allergies,
    available_time_minutes: preferences.cookTimeMinutes,
    budget_per_day_usd: preferences.budgetUsd,
    preferred_cuisines: preferences.cuisines,
    plan_date: new Date().toISOString().split('T')[0]
  };

  const { data, error } = await supabase.functions.invoke('generate-meal-plan', {
    body: payload,
    headers: { Authorization: `Bearer ${session.access_token}` }
  });

  if (error) {
    throw new Error(error.message || "Failed to generate meal plan");
  }

  return {
    id: data.id,
    breakfast: {
      name: data.breakfast.name,
      ingredients: data.breakfast.ingredients,
      estimatedCost: data.breakfast.estimated_cost,
      cookTimeMinutes: data.breakfast.cook_time_minutes
    },
    lunch: {
      name: data.lunch.name,
      ingredients: data.lunch.ingredients,
      estimatedCost: data.lunch.estimated_cost,
      cookTimeMinutes: data.lunch.cook_time_minutes
    },
    dinner: {
      name: data.dinner.name,
      ingredients: data.dinner.ingredients,
      estimatedCost: data.dinner.estimated_cost,
      cookTimeMinutes: data.dinner.cook_time_minutes
    },
    totalCost: data.total_estimated_cost,
    budgetStatus: data.budget_status,
    date: data.plan_date
  };
}

export async function generateGroceryList(mealPlanId: string): Promise<GroceryItem[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const { data, error } = await supabase.functions.invoke('generate-grocery-list', {
    body: { meal_plan_id: mealPlanId },
    headers: { Authorization: `Bearer ${session.access_token}` }
  });

  if (error) {
    throw new Error(error.message || "Failed to generate grocery list");
  }

  return data.items;
}

export async function getSubstitutes(ingredient: string, reason: string): Promise<Substitute[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  // Map Reason "Allergy-Free" back to "allergy" if needed
  let mappedReason = reason.toLowerCase();
  if (mappedReason === 'allergy-free') mappedReason = 'allergy';

  const { data, error } = await supabase.functions.invoke('get-substitutes', {
    body: { ingredient, reason: mappedReason },
    headers: { Authorization: `Bearer ${session.access_token}` }
  });

  if (error) {
    throw new Error(error.message || "Failed to get substitutes");
  }

  return data.substitutes;
}

export async function saveUserProfile(prefs: UserPreferences): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const payload = {
    id: user.id,
    dietary_restrictions: prefs.dietaryRestrictions,
    allergies: prefs.allergies,
    weekly_budget_usd: prefs.budgetUsd * 7,
    preferred_cuisines: prefs.cuisines,
    default_cook_time_minutes: prefs.cookTimeMinutes
  };

  const { error } = await supabase
    .from('user_profiles')
    .upsert(payload);

  if (error) throw new Error(error.message || "Failed to save profile");
}

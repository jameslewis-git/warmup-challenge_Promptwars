import type { GroceryItem, MealPlan, Substitute, UserPreferences } from "@/types";
import { mockGroceryItems, mockMealPlan, mockSubstitutes } from "./mock-data";

const delay = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

// TODO: wire to Supabase Edge Function
export async function generateMealPlan(_preferences: UserPreferences): Promise<MealPlan> {
  await delay();
  return mockMealPlan;
}

// TODO: wire to Supabase Edge Function
export async function generateGroceryList(_mealPlanId: string): Promise<GroceryItem[]> {
  await delay();
  return mockGroceryItems;
}

// TODO: wire to Supabase Edge Function
export async function getSubstitutes(_ingredient: string, _reason: string): Promise<Substitute[]> {
  await delay(800);
  return mockSubstitutes;
}

// TODO: wire to Supabase Edge Function
export async function saveUserProfile(_prefs: UserPreferences): Promise<void> {
  await delay(500);
}

import { create } from "zustand";
import type { BudgetStatus, MealPlan, UserPreferences } from "@/types";
import { generateMealPlan } from "@/lib/api";

interface PlannerState {
  preferences: UserPreferences;
  mealPlan: MealPlan | null;
  budgetStatus: BudgetStatus;
  isLoading: boolean;
  error: string | null;
  setPreferences: (p: Partial<UserPreferences>) => void;
  toggleArrayPref: (key: "dietaryRestrictions" | "allergies" | "cuisines", value: string) => void;
  generate: () => Promise<void>;
  clearError: () => void;
}

const defaultPreferences: UserPreferences = {
  dietaryRestrictions: [],
  allergies: [],
  cookTimeMinutes: 30,
  budgetUsd: 25,
  cuisines: [],
};

export const usePlannerStore = create<PlannerState>((set, get) => ({
  preferences: defaultPreferences,
  mealPlan: null,
  budgetStatus: "within",
  isLoading: false,
  error: null,
  setPreferences: (p) => set({ preferences: { ...get().preferences, ...p } }),
  toggleArrayPref: (key, value) => {
    const cur = get().preferences[key];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    set({ preferences: { ...get().preferences, [key]: next } });
  },
  generate: async () => {
    set({ isLoading: true, error: null });
    try {
      const plan = await generateMealPlan(get().preferences);
      set({ mealPlan: plan, budgetStatus: plan.budgetStatus, isLoading: false });
    } catch {
      set({ error: "Couldn't generate your meal plan. Please try again.", isLoading: false });
    }
  },
  clearError: () => set({ error: null }),
}));

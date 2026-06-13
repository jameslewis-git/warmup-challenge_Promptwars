export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  cookTimeMinutes: number;
  budgetUsd: number;
  cuisines: string[];
}

export interface Meal {
  name: string;
  ingredients: string[];
  estimatedCost: number;
  cookTimeMinutes: number;
}

export type BudgetStatus = "within" | "warning" | "exceeded";

export interface MealPlan {
  id?: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  totalCost: number;
  budgetStatus: BudgetStatus;
  date: string;
}

export interface Substitute {
  name: string;
  reason: "Vegan" | "Budget" | "Allergy-Free";
  costDelta: number;
}

export type GroceryCategory = "Produce" | "Dairy" | "Meat & Seafood" | "Pantry" | "Frozen";

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit: string;
  estimatedCost: number;
  checked: boolean;
  substitutes: Substitute[];
}

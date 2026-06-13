import type { GroceryItem, Meal, MealPlan, Substitute } from "@/types";

export const mockMealPlans: { id: string; title: string; meal: Meal; date: string }[] = [
  {
    id: "1",
    title: "Mon · Breakfast",
    date: "Mon",
    meal: {
      name: "Overnight Oats with Berries",
      ingredients: ["Rolled oats", "Almond milk", "Blueberries", "Chia seeds", "Honey"],
      estimatedCost: 3.4,
      cookTimeMinutes: 5,
    },
  },
  {
    id: "2",
    title: "Tue · Lunch",
    date: "Tue",
    meal: {
      name: "Grilled Chicken Salad",
      ingredients: ["Chicken breast", "Romaine", "Cherry tomatoes", "Cucumber", "Olive oil"],
      estimatedCost: 7.8,
      cookTimeMinutes: 20,
    },
  },
  {
    id: "3",
    title: "Wed · Dinner",
    date: "Wed",
    meal: {
      name: "Tomato Basil Pasta",
      ingredients: ["Spaghetti", "Tomatoes", "Garlic", "Basil", "Parmesan"],
      estimatedCost: 5.6,
      cookTimeMinutes: 25,
    },
  },
];

export const mockMealPlan: MealPlan = {
  date: new Date().toISOString().slice(0, 10),
  breakfast: {
    name: "Avocado Toast with Egg",
    ingredients: ["Sourdough bread", "Avocado", "Egg", "Chili flakes", "Lemon"],
    estimatedCost: 4.2,
    cookTimeMinutes: 10,
  },
  lunch: {
    name: "Mediterranean Quinoa Bowl",
    ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Feta", "Olives", "Lemon dressing"],
    estimatedCost: 6.5,
    cookTimeMinutes: 25,
  },
  dinner: {
    name: "Lemon Herb Chicken & Rice",
    ingredients: ["Chicken breast", "Jasmine rice", "Lemon", "Garlic", "Parsley"],
    estimatedCost: 9.1,
    cookTimeMinutes: 35,
  },
  totalCost: 19.8,
  budgetStatus: "within",
};

export const mockGroceryItems: GroceryItem[] = [
  // Produce
  { id: "g1", name: "Avocado", category: "Produce", quantity: 2, unit: "pcs", estimatedCost: 2.4, checked: false, substitutes: [] },
  { id: "g2", name: "Cherry Tomatoes", category: "Produce", quantity: 1, unit: "pint", estimatedCost: 3.2, checked: false, substitutes: [] },
  { id: "g3", name: "Lemon", category: "Produce", quantity: 3, unit: "pcs", estimatedCost: 1.5, checked: false, substitutes: [] },
  { id: "g4", name: "Cucumber", category: "Produce", quantity: 1, unit: "pcs", estimatedCost: 0.9, checked: false, substitutes: [] },
  { id: "g5", name: "Garlic", category: "Produce", quantity: 1, unit: "bulb", estimatedCost: 0.6, checked: false, substitutes: [] },
  // Dairy
  { id: "g6", name: "Feta Cheese", category: "Dairy", quantity: 200, unit: "g", estimatedCost: 4.2, checked: false, substitutes: [] },
  { id: "g7", name: "Eggs", category: "Dairy", quantity: 12, unit: "pcs", estimatedCost: 3.8, checked: false, substitutes: [] },
  { id: "g8", name: "Almond Milk", category: "Dairy", quantity: 1, unit: "L", estimatedCost: 3.5, checked: false, substitutes: [] },
  // Meat & Seafood
  { id: "g9", name: "Chicken Breast", category: "Meat & Seafood", quantity: 500, unit: "g", estimatedCost: 8.9, checked: false, substitutes: [
    { name: "Tofu (extra firm)", reason: "Vegan", costDelta: -2.5 },
    { name: "Chickpeas (canned)", reason: "Budget", costDelta: -5.4 },
    { name: "Ground Turkey", reason: "Allergy-Free", costDelta: 0.4 },
  ] },
  // Pantry
  { id: "g10", name: "Quinoa", category: "Pantry", quantity: 1, unit: "lb", estimatedCost: 4.6, checked: false, substitutes: [] },
  { id: "g11", name: "Jasmine Rice", category: "Pantry", quantity: 2, unit: "lb", estimatedCost: 3.9, checked: false, substitutes: [] },
  { id: "g12", name: "Olive Oil", category: "Pantry", quantity: 1, unit: "bottle", estimatedCost: 7.5, checked: false, substitutes: [] },
  { id: "g13", name: "Chickpeas (canned)", category: "Pantry", quantity: 2, unit: "cans", estimatedCost: 2.4, checked: false, substitutes: [] },
  { id: "g14", name: "Sourdough Bread", category: "Pantry", quantity: 1, unit: "loaf", estimatedCost: 4.8, checked: false, substitutes: [] },
  // Frozen
  { id: "g15", name: "Frozen Blueberries", category: "Frozen", quantity: 1, unit: "bag", estimatedCost: 4.2, checked: false, substitutes: [] },
];

export const mockSubstitutes: Substitute[] = [
  { name: "Tofu (extra firm)", reason: "Vegan", costDelta: -2.5 },
  { name: "Chickpeas (canned)", reason: "Budget", costDelta: -5.4 },
  { name: "Ground Turkey", reason: "Allergy-Free", costDelta: 0.4 },
];

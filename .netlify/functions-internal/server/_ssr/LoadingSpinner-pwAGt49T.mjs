import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./authStore-BRf9fkcX.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LoadingSpinner-pwAGt49T.js
var import_jsx_runtime = require_jsx_runtime();
async function generateMealPlan(preferences) {
	const { data: { session } } = await supabase.auth.getSession();
	if (!session) throw new Error("Not authenticated");
	const payload = {
		dietary_restrictions: preferences.dietaryRestrictions,
		allergies: preferences.allergies,
		available_time_minutes: preferences.cookTimeMinutes,
		budget_per_day_usd: preferences.budgetUsd,
		preferred_cuisines: preferences.cuisines,
		plan_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
	};
	const { data, error } = await supabase.functions.invoke("generate-meal-plan", {
		body: payload,
		headers: { Authorization: `Bearer ${session.access_token}` }
	});
	if (error) throw new Error(error.message || "Failed to generate meal plan");
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
async function generateGroceryList(mealPlanId) {
	const { data: { session } } = await supabase.auth.getSession();
	if (!session) throw new Error("Not authenticated");
	const { data, error } = await supabase.functions.invoke("generate-grocery-list", {
		body: { meal_plan_id: mealPlanId },
		headers: { Authorization: `Bearer ${session.access_token}` }
	});
	if (error) throw new Error(error.message || "Failed to generate grocery list");
	return data.items;
}
async function getSubstitutes(ingredient, reason) {
	const { data: { session } } = await supabase.auth.getSession();
	if (!session) throw new Error("Not authenticated");
	let mappedReason = reason.toLowerCase();
	if (mappedReason === "allergy-free") mappedReason = "allergy";
	const { data, error } = await supabase.functions.invoke("get-substitutes", {
		body: {
			ingredient,
			reason: mappedReason
		},
		headers: { Authorization: `Bearer ${session.access_token}` }
	});
	if (error) throw new Error(error.message || "Failed to get substitutes");
	return data.substitutes;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function LoadingSpinner({ className, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative inline-flex h-5 w-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border-2 border-primary/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" })]
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { getSubstitutes as a, generateMealPlan as i, cn as n, generateGroceryList as r, LoadingSpinner as t };

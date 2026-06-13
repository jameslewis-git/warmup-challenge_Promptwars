import { t as create } from "../_libs/zustand.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as ProtectedRoute, t as Navbar } from "./Navbar-PiXBr17_.mjs";
import { t as MealPlanCard } from "./MealPlanCard-DLtXtz2B.mjs";
import { i as generateMealPlan, n as cn, t as LoadingSpinner } from "./LoadingSpinner-pwAGt49T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-fTuao0rC.js
var import_jsx_runtime = require_jsx_runtime();
var defaultPreferences = {
	dietaryRestrictions: [],
	allergies: [],
	cookTimeMinutes: 30,
	budgetUsd: 25,
	cuisines: []
};
var usePlannerStore = create((set, get) => ({
	preferences: defaultPreferences,
	mealPlan: null,
	budgetStatus: "within",
	isLoading: false,
	error: null,
	setPreferences: (p) => set({ preferences: {
		...get().preferences,
		...p
	} }),
	toggleArrayPref: (key, value) => {
		const cur = get().preferences[key];
		const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
		set({ preferences: {
			...get().preferences,
			[key]: next
		} });
	},
	generate: async () => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const plan = await generateMealPlan(get().preferences);
			set({
				mealPlan: plan,
				budgetStatus: plan.budgetStatus,
				isLoading: false
			});
		} catch (err) {
			set({
				error: err.message || "Couldn't generate your meal plan. Please try again.",
				isLoading: false
			});
		}
	},
	clearError: () => set({ error: null })
}));
var DIETS = [
	"Vegetarian",
	"Vegan",
	"Keto",
	"Paleo",
	"Halal",
	"Gluten-Free"
];
var ALLERGIES = [
	"Nuts",
	"Dairy",
	"Gluten",
	"Shellfish",
	"Eggs",
	"Soy"
];
var CUISINES = [
	"Indian",
	"Mediterranean",
	"Mexican",
	"Asian",
	"Italian"
];
var COOK_STOPS = [
	15,
	30,
	45,
	60
];
function Chip({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("rounded-full border px-3 py-1.5 text-sm transition-colors", active ? "border-primary/40 bg-primary/15 text-primary" : "border-border bg-secondary text-muted-foreground hover:border-border hover:text-foreground"),
		children: label
	});
}
function PreferencesForm({ onSubmit }) {
	const { preferences, toggleArrayPref, setPreferences } = usePlannerStore();
	const stopIdx = Math.max(0, COOK_STOPS.findIndex((s) => s === preferences.cookTimeMinutes));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7 rounded-2xl border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold",
				children: "Dietary Restrictions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: DIETS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					label: d,
					active: preferences.dietaryRestrictions.includes(d),
					onClick: () => toggleArrayPref("dietaryRestrictions", d)
				}, d))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold",
				children: "Allergies"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: ALLERGIES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					label: a,
					active: preferences.allergies.includes(a),
					onClick: () => toggleArrayPref("allergies", a)
				}, a))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "Max Cook Time"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: preferences.cookTimeMinutes === 60 ? "60+ min" : `${preferences.cookTimeMinutes} min`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: COOK_STOPS.length - 1,
					step: 1,
					value: stopIdx === -1 ? 1 : stopIdx,
					onChange: (e) => setPreferences({ cookTimeMinutes: COOK_STOPS[Number(e.target.value)] }),
					className: "mt-3 w-full accent-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex justify-between text-xs text-muted-foreground",
					children: COOK_STOPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s === 60 ? "60+" : s }, s))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold",
				children: "Daily Budget"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center rounded-xl border border-border bg-input/60 px-3 focus-within:border-primary/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "$"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						value: preferences.budgetUsd,
						placeholder: "25",
						onChange: (e) => setPreferences({ budgetUsd: Number(e.target.value) || 0 }),
						className: "w-full bg-transparent px-2 py-2.5 text-sm outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "/ day"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-display text-base font-semibold",
				children: ["Cuisine ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-normal text-muted-foreground",
					children: "(optional)"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: CUISINES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					label: c,
					active: preferences.cuisines.includes(c),
					onClick: () => toggleArrayPref("cuisines", c)
				}, c))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onSubmit,
				className: "gradient-cta w-full rounded-xl px-4 py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5",
				children: "Generate Meal Plan"
			})
		]
	});
}
var labels = {
	within: "Within Budget",
	warning: "Near Limit",
	exceeded: "Over Budget"
};
var styles = {
	within: "bg-primary/15 text-primary border border-primary/30",
	warning: "bg-warning/15 text-warning border border-warning/30",
	exceeded: "bg-destructive/15 text-destructive border border-destructive/30"
};
function BudgetBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", styles[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mr-2 h-1.5 w-1.5 rounded-full", status === "within" && "bg-primary", status === "warning" && "bg-warning", status === "exceeded" && "bg-destructive") }), labels[status]]
	});
}
function ErrorBanner({ message, onDismiss }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message }), onDismiss && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onDismiss,
			className: "rounded-md p-0.5 text-destructive/80 transition-colors hover:text-destructive",
			"aria-label": "Dismiss",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
		})]
	});
}
function Planner() {
	const navigate = useNavigate();
	const { mealPlan, budgetStatus, isLoading, error, generate, clearError } = usePlannerStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-6 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: "Meal Planner"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: "Tell us what you like — we'll plan your day."
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, {
						message: error,
						onDismiss: clearError
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[380px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesForm, { onSubmit: generate }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-72 items-center justify-center rounded-2xl border border-dashed border-border bg-card/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Cooking up your plan…" })
					}) : !mealPlan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: "No plan yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 max-w-sm text-sm text-muted-foreground",
							children: [
								"Set your preferences and tap ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Generate Meal Plan"
								}),
								" to see today's menu."
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Today's Plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-lg font-semibold",
								children: ["Total: $", mealPlan.totalCost.toFixed(2)]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetBadge, { status: budgetStatus })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealPlanCard, {
									type: "Breakfast",
									meal: mealPlan.breakfast
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealPlanCard, {
									type: "Lunch",
									meal: mealPlan.lunch
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealPlanCard, {
									type: "Dinner",
									meal: mealPlan.dinner
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: generate,
								className: "flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
								children: "Regenerate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate({ to: "/grocery" }),
								className: "flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
								children: "Save & Get Grocery List"
							})]
						})
					] }) })]
				})
			]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Planner, {}) });
//#endregion
export { SplitComponent as component };

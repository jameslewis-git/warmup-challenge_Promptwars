import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuthStore } from "./authStore-BRf9fkcX.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Sparkles } from "../_libs/lucide-react.mjs";
import { n as ProtectedRoute, t as Navbar } from "./Navbar-PiXBr17_.mjs";
import { t as MealPlanCard } from "./MealPlanCard-DLtXtz2B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BINmxdof.js
var import_jsx_runtime = require_jsx_runtime();
function BudgetRing({ spent, total, status }) {
	const pct = Math.min(100, Math.round(spent / total * 100));
	const r = 56;
	const c = 2 * Math.PI * r;
	const offset = c - pct / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-5 rounded-2xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-32 w-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "h-full w-full -rotate-90",
				viewBox: "0 0 140 140",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "70",
					r,
					fill: "none",
					stroke: "var(--color-border)",
					strokeWidth: "10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "70",
					r,
					fill: "none",
					stroke: status === "within" ? "var(--color-primary)" : status === "warning" ? "var(--color-warning)" : "var(--color-destructive)",
					strokeWidth: "10",
					strokeLinecap: "round",
					strokeDasharray: c,
					strokeDashoffset: offset,
					className: "transition-all duration-700"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-2xl font-semibold",
					children: ["$", spent]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: ["of $", total]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-medium text-muted-foreground",
				children: "Weekly Budget"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-display text-xl font-semibold",
				children: [pct, "% used"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"$",
					total - spent,
					" remaining this week"
				]
			})
		] })]
	});
}
var mockMealPlans = [
	{
		id: "1",
		title: "Mon · Breakfast",
		date: "Mon",
		meal: {
			name: "Overnight Oats with Berries",
			ingredients: [
				"Rolled oats",
				"Almond milk",
				"Blueberries",
				"Chia seeds",
				"Honey"
			],
			estimatedCost: 3.4,
			cookTimeMinutes: 5
		}
	},
	{
		id: "2",
		title: "Tue · Lunch",
		date: "Tue",
		meal: {
			name: "Grilled Chicken Salad",
			ingredients: [
				"Chicken breast",
				"Romaine",
				"Cherry tomatoes",
				"Cucumber",
				"Olive oil"
			],
			estimatedCost: 7.8,
			cookTimeMinutes: 20
		}
	},
	{
		id: "3",
		title: "Wed · Dinner",
		date: "Wed",
		meal: {
			name: "Tomato Basil Pasta",
			ingredients: [
				"Spaghetti",
				"Tomatoes",
				"Garlic",
				"Basil",
				"Parmesan"
			],
			estimatedCost: 5.6,
			cookTimeMinutes: 25
		}
	}
];
(/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function greeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good morning";
	if (h < 18) return "Good afternoon";
	return "Good evening";
}
function Dashboard() {
	const user = useAuthStore((s) => s.user);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-6 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-3xl border border-border bg-card p-8 md:p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-1 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl",
							children: [
								greeting(),
								", ",
								user?.name,
								". ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "What's cooking today?"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/planner",
							className: "gradient-cta inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-5 py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Generate Meal Plan"]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "This Week's Plans"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/planner",
							className: "text-sm text-primary hover:underline",
							children: "View all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mx-6 overflow-x-auto px-6 pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 md:auto-cols-fr",
							children: mockMealPlans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-[280px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs uppercase tracking-wider text-muted-foreground",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealPlanCard, {
									type: p.title.split("·")[1]?.trim() || "Meal",
									meal: p.meal
								})]
							}, p.id))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-display text-xl font-semibold",
						children: "Weekly Budget"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetRing, {
						spent: 68,
						total: 100,
						status: "within"
					})]
				})
			]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) });
//#endregion
export { SplitComponent as component };

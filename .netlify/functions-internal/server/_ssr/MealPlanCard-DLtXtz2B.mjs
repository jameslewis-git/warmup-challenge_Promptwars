import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { o as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MealPlanCard-DLtXtz2B.js
var import_jsx_runtime = require_jsx_runtime();
function MealPlanCard({ type, meal, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-primary",
				children: type
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-lg font-semibold leading-snug text-foreground",
				children: meal.name
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: meal.ingredients.join(", ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between border-t border-border pt-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium text-foreground",
					children: ["$", meal.estimatedCost.toFixed(2)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
						meal.cookTimeMinutes,
						" min"
					]
				})]
			})
		]
	});
}
//#endregion
export { MealPlanCard as t };

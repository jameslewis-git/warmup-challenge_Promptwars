import { r as __toESM } from "../_runtime.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Copy, s as Check, t as X } from "../_libs/lucide-react.mjs";
import { n as ProtectedRoute, t as Navbar } from "./Navbar-PiXBr17_.mjs";
import { a as getSubstitutes, n as cn, r as generateGroceryList, t as LoadingSpinner } from "./LoadingSpinner-pwAGt49T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grocery-C3gVH4I-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useGroceryStore = create((set, get) => ({
	items: [],
	checkedIds: [],
	isLoading: false,
	error: null,
	fetchList: async (mealPlanId) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const items = await generateGroceryList(mealPlanId);
			set({
				items,
				checkedIds: items.filter((i) => i.checked).map((i) => i.id),
				isLoading: false
			});
		} catch (err) {
			set({
				error: err.message,
				isLoading: false
			});
		}
	},
	toggleItem: async (id) => {
		const { checkedIds, items } = get();
		const isChecked = checkedIds.includes(id);
		set({ checkedIds: isChecked ? checkedIds.filter((c) => c !== id) : [...checkedIds, id] });
		set({ items: items.map((i) => i.id === id ? {
			...i,
			checked: !isChecked
		} : i) });
	},
	markAllPurchased: () => set({ checkedIds: get().items.map((i) => i.id) }),
	replaceItem: (id, newName, costDelta) => set({ items: get().items.map((i) => i.id === id ? {
		...i,
		name: newName,
		estimatedCost: Math.max(0, i.estimatedCost + costDelta)
	} : i) })
}));
function GroceryItemRow({ item, checked, onToggle, onSubstitute }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-border hover:bg-secondary/40", checked && "opacity-60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onToggle,
				className: cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors", checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-input/60"),
				"aria-label": checked ? "Uncheck" : "Check",
				children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "h-3 w-3",
					strokeWidth: 3
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm font-medium", checked && "line-through"),
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						item.quantity,
						" ",
						item.unit
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("text-sm font-medium tabular-nums", checked && "line-through"),
				children: ["$", item.estimatedCost.toFixed(2)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onSubstitute,
				className: "rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary",
				children: "Substitute"
			})
		]
	});
}
var CATEGORY_ORDER = [
	"Produce",
	"Dairy",
	"Meat & Seafood",
	"Pantry",
	"Frozen"
];
function GroceryList({ onSubstitute }) {
	const { items, checkedIds, toggleItem } = useGroceryStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: CATEGORY_ORDER.map((category) => ({
			category,
			items: items.filter((i) => i.category === category)
		})).filter((g) => g.items.length > 0).map(({ category, items }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-baseline justify-between border-b border-border pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
				children: category
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted-foreground",
				children: [items.length, " items"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border/50",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroceryItemRow, {
				item,
				checked: checkedIds.includes(item.id),
				onToggle: () => toggleItem(item.id),
				onSubstitute: () => onSubstitute(item)
			}, item.id))
		})] }, category))
	});
}
var reasonStyles = {
	Vegan: "bg-primary/15 text-primary border-primary/30",
	Budget: "bg-warning/15 text-warning border-warning/30",
	"Allergy-Free": "bg-secondary text-foreground border-border"
};
function SubstituteDrawer({ item, open, onClose, onUse }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [subs, setSubs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!open || !item) return;
		setLoading(true);
		(item.substitutes.length ? Promise.resolve(item.substitutes) : getSubstitutes(item.name, "")).then((s) => setSubs(s)).finally(() => setLoading(false));
	}, [open, item]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "pointer-events-none opacity-0"),
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300", open ? "translate-x-0" : "translate-x-full"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-start justify-between border-b border-border px-6 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wider text-muted-foreground",
				children: "Substitutes for"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl font-semibold",
				children: item?.name ?? ""
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto px-6 py-5",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-40 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Finding swaps…" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-background/40 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-semibold",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", reasonStyles[s.reason]),
							children: s.reason
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("rounded-md px-2 py-1 text-xs font-medium tabular-nums", s.costDelta < 0 ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"),
							children: [
								s.costDelta >= 0 ? "+" : "-",
								"$",
								Math.abs(s.costDelta).toFixed(2)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onUse(s),
						className: "mt-3 w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Use This Instead"
					})]
				}, s.name))
			})
		})]
	})] });
}
function GroceryPage() {
	const { items, checkedIds, markAllPurchased, replaceItem } = useGroceryStore();
	const [drawerItem, setDrawerItem] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const total = items.reduce((sum, i) => sum + i.estimatedCost, 0);
	const handleExport = async () => {
		const text = items.map((i) => `- ${i.name} (${i.quantity} ${i.unit}) — $${i.estimatedCost.toFixed(2)}`).join("\n");
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	};
	const handleUseSub = (sub) => {
		if (!drawerItem) return;
		replaceItem(drawerItem.id, sub.name, sub.costDelta);
		setDrawerItem(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-6 py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-8 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: "Grocery List"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric"
							}),
							" · ",
							checkedIds.length,
							"/",
							items.length,
							" purchased"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleExport,
						className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), copied ? "Copied!" : "Export"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroceryList, { onSubstitute: setDrawerItem })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 border-t border-border bg-background/90 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Estimated total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl font-semibold tabular-nums",
						children: ["$", total.toFixed(2)]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: markAllPurchased,
						className: "rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Mark All Purchased"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubstituteDrawer, {
				item: drawerItem,
				open: !!drawerItem,
				onClose: () => setDrawerItem(null),
				onUse: handleUseSub
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroceryPage, {}) });
//#endregion
export { SplitComponent as component };

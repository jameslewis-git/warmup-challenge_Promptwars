import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuthStore } from "./authStore-BRf9fkcX.mjs";
import { _ as useNavigate, g as Navigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as LogOut, n as UtensilsCrossed } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-PiXBr17_.js
var import_jsx_runtime = require_jsx_runtime();
function ProtectedRoute({ children }) {
	if (!useAuthStore((s) => s.isAuthenticated)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/auth" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function Navbar() {
	const { user, isAuthenticated, logout } = useAuthStore();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate({ to: "/auth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold",
						children: "CookPlan"
					})]
				}),
				isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: [
						{
							to: "/dashboard",
							label: "Dashboard"
						},
						{
							to: "/planner",
							label: "Planner"
						},
						{
							to: "/grocery",
							label: "Grocery"
						}
					].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						className: "rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
						activeProps: { className: "bg-secondary text-foreground" },
						children: link.label
					}, link.to))
				}),
				isAuthenticated && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary",
							children: user.name.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-sm font-medium sm:inline",
							children: user.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Logout"]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					className: "rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground",
					children: "Sign in"
				})
			]
		})
	});
}
//#endregion
export { ProtectedRoute as n, Navbar as t };

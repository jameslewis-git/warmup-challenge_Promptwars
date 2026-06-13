import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuthStore } from "./authStore-BRf9fkcX.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UtensilsCrossed } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-wSuywWDH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const login = useAuthStore((s) => s.login);
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const handleAuth = (e) => {
		e.preventDefault();
		login({
			id: "u1",
			name: mode === "signup" ? name || "Alex" : "Alex",
			email: email || "alex@cookplan.app"
		});
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold",
							children: "CookPlan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "AI meal plans that match your budget."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1",
							children: ["login", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMode(m),
								className: `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`,
								children: m === "login" ? "Login" : "Sign Up"
							}, m))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAuth,
							className: "space-y-4",
							children: [
								mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "auth-input",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Your name"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										className: "auth-input",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "you@example.com"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										className: "auth-input",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "gradient-cta w-full rounded-xl px-4 py-2.5 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5",
									children: mode === "login" ? "Sign in" : "Create account"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "or" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleAuth,
							className: "w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
							children: "Continue with Google"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-muted-foreground",
					children: "By continuing you agree to CookPlan's Terms & Privacy."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .auth-input {
          width: 100%;
          background: var(--color-input);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .15s;
        }
        .auth-input:focus { border-color: color-mix(in oklab, var(--color-primary) 60%, transparent); }
      ` })]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { AuthPage as component };

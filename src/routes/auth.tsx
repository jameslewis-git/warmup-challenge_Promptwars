import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · CookPlan" },
      { name: "description", content: "Sign in or create your CookPlan account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Placeholder — TODO: wire to real auth.
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: "u1",
      name: mode === "signup" ? name || "Alex" : "Alex",
      email: email || "alex@cookplan.app",
    });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <h1 className="font-display text-3xl font-semibold">CookPlan</h1>
          <p className="text-sm text-muted-foreground">AI meal plans that match your budget.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === "signup" && (
              <Field label="Name">
                <input
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </Field>
            )}
            <Field label="Email">
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>

            <button
              type="submit"
              className="gradient-cta w-full rounded-xl px-4 py-2.5 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleAuth}
            className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing you agree to CookPlan's Terms & Privacy.
        </p>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

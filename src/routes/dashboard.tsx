import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { MealPlanCard } from "@/components/MealPlanCard";
import { BudgetRing } from "@/components/BudgetRing";
import { useAuthStore } from "@/stores/authStore";
import { mockMealPlans } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · CookPlan" },
      { name: "description", content: "Your weekly meal plans and grocery budget." },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const spent = 68;
  const budget = 100;
  const status = spent / budget < 0.75 ? "within" : spent / budget < 0.95 ? "warning" : "exceeded";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
              <h1 className="mt-1 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">
                {greeting()}, {user?.name}. <span className="text-muted-foreground">What's cooking today?</span>
              </h1>
            </div>
            <Link
              to="/planner"
              className="gradient-cta inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-5 py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4" />
              Generate Meal Plan
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold">This Week's Plans</h2>
            <Link to="/planner" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="-mx-6 overflow-x-auto px-6 pb-2">
            <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 md:auto-cols-fr">
              {mockMealPlans.map((p) => (
                <div key={p.id} className="min-w-[280px]">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{p.title}</p>
                  <MealPlanCard type={p.title.split("·")[1]?.trim() || "Meal"} meal={p.meal} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold">Weekly Budget</h2>
          <BudgetRing spent={spent} total={budget} status={status} />
        </section>
      </main>
    </div>
  );
}

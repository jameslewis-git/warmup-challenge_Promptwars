import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { PreferencesForm } from "@/components/PreferencesForm";
import { MealPlanCard } from "@/components/MealPlanCard";
import { BudgetBadge } from "@/components/BudgetBadge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBanner } from "@/components/ErrorBanner";
import { usePlannerStore } from "@/stores/plannerStore";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Planner · CookPlan" },
      { name: "description", content: "Generate a personalized daily meal plan." },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <Planner />
    </ProtectedRoute>
  ),
});

function Planner() {
  const navigate = useNavigate();
  const { mealPlan, budgetStatus, isLoading, error, generate, clearError } = usePlannerStore();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-semibold">Meal Planner</h1>
          <p className="mt-1 text-muted-foreground">Tell us what you like — we'll plan your day.</p>
        </header>

        {error && (
          <div className="mb-6">
            <ErrorBanner message={error} onDismiss={clearError} />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <aside>
            <PreferencesForm onSubmit={generate} />
          </aside>

          <section>
            {isLoading ? (
              <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-border bg-card/40">
                <LoadingSpinner label="Cooking up your plan…" />
              </div>
            ) : !mealPlan ? (
              <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 text-center">
                <p className="font-display text-lg font-semibold">No plan yet</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Set your preferences and tap <span className="text-primary">Generate Meal Plan</span> to see today's menu.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Today's Plan</p>
                    <p className="font-display text-lg font-semibold">
                      Total: ${mealPlan.totalCost.toFixed(2)}
                    </p>
                  </div>
                  <BudgetBadge status={budgetStatus} />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <MealPlanCard type="Breakfast" meal={mealPlan.breakfast} />
                  <MealPlanCard type="Lunch" meal={mealPlan.lunch} />
                  <MealPlanCard type="Dinner" meal={mealPlan.dinner} />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={generate}
                    className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={() => navigate({ to: "/grocery" })}
                    className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Save & Get Grocery List
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

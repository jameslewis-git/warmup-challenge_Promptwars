import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CookPlan · AI Meal Planning" },
      { name: "description", content: "Personalized weekly meal plans, grocery lists, and budgets — powered by AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Navigate to="/dashboard" />;
}

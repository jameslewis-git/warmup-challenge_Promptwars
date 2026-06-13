import { Clock } from "lucide-react";
import type { Meal } from "@/types";

interface Props {
  type: "Breakfast" | "Lunch" | "Dinner" | string;
  meal: Meal;
  compact?: boolean;
}

export function MealPlanCard({ type, meal, compact }: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
        {type}
      </span>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
        {meal.name}
      </h3>
      {!compact && (
        <p className="mt-2 text-sm text-muted-foreground">
          {meal.ingredients.join(", ")}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="font-medium text-foreground">${meal.estimatedCost.toFixed(2)}</span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {meal.cookTimeMinutes} min
        </span>
      </div>
    </div>
  );
}

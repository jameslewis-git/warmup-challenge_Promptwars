import type { BudgetStatus } from "@/types";

interface Props {
  spent: number;
  total: number;
  status: BudgetStatus;
}

export function BudgetRing({ spent, total, status }: Props) {
  const pct = Math.min(100, Math.round((spent / total) * 100));
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  const color =
    status === "within"
      ? "var(--color-primary)"
      : status === "warning"
        ? "var(--color-warning)"
        : "var(--color-destructive)";

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-border)" strokeWidth="10" />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold">${spent}</span>
          <span className="text-xs text-muted-foreground">of ${total}</span>
        </div>
      </div>
      <div>
        <p className="font-display text-sm font-medium text-muted-foreground">Weekly Budget</p>
        <p className="mt-1 font-display text-xl font-semibold">{pct}% used</p>
        <p className="mt-1 text-xs text-muted-foreground">${total - spent} remaining this week</p>
      </div>
    </div>
  );
}

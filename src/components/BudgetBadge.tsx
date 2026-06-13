import type { BudgetStatus } from "@/types";
import { cn } from "@/lib/utils";

const labels: Record<BudgetStatus, string> = {
  within: "Within Budget",
  warning: "Near Limit",
  exceeded: "Over Budget",
};

const styles: Record<BudgetStatus, string> = {
  within: "bg-primary/15 text-primary border border-primary/30",
  warning: "bg-warning/15 text-warning border border-warning/30",
  exceeded: "bg-destructive/15 text-destructive border border-destructive/30",
};

export function BudgetBadge({ status, className }: { status: BudgetStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        styles[status],
        className
      )}
    >
      <span
        className={cn(
          "mr-2 h-1.5 w-1.5 rounded-full",
          status === "within" && "bg-primary",
          status === "warning" && "bg-warning",
          status === "exceeded" && "bg-destructive"
        )}
      />
      {labels[status]}
    </span>
  );
}

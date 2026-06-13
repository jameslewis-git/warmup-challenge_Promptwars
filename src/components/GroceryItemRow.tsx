import type { GroceryItem } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  item: GroceryItem;
  checked: boolean;
  onToggle: () => void;
  onSubstitute: () => void;
}

export function GroceryItemRow({ item, checked, onToggle, onSubstitute }: Props) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-border hover:bg-secondary/40",
        checked && "opacity-60"
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
          checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-input/60"
        )}
        aria-label={checked ? "Uncheck" : "Check"}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium", checked && "line-through")}>{item.name}</p>
        <p className="text-xs text-muted-foreground">
          {item.quantity} {item.unit}
        </p>
      </div>

      <span className={cn("text-sm font-medium tabular-nums", checked && "line-through")}>
        ${item.estimatedCost.toFixed(2)}
      </span>

      <button
        onClick={onSubstitute}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        Substitute
      </button>
    </div>
  );
}

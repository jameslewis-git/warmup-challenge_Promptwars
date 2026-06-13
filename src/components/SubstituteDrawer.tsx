import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { GroceryItem, Substitute } from "@/types";
import { getSubstitutes } from "@/lib/api";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";

interface Props {
  item: GroceryItem | null;
  open: boolean;
  onClose: () => void;
  onUse: (sub: Substitute) => void;
}

const reasonStyles: Record<Substitute["reason"], string> = {
  Vegan: "bg-primary/15 text-primary border-primary/30",
  Budget: "bg-warning/15 text-warning border-warning/30",
  "Allergy-Free": "bg-secondary text-foreground border-border",
};

export function SubstituteDrawer({ item, open, onClose, onUse }: Props) {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<Substitute[]>([]);

  useEffect(() => {
    if (!open || !item) return;
    setLoading(true);
    const seed = item.substitutes.length ? Promise.resolve(item.substitutes) : getSubstitutes(item.name, "");
    seed
      .then((s) => setSubs(s))
      .finally(() => setLoading(false));
  }, [open, item]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Substitutes for</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{item?.name ?? ""}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <LoadingSpinner label="Finding swaps…" />
            </div>
          ) : (
            <div className="space-y-3">
              {subs.map((s) => (
                <div key={s.name} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-semibold">{s.name}</h3>
                      <span
                        className={cn(
                          "mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                          reasonStyles[s.reason]
                        )}
                      >
                        {s.reason}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "rounded-md px-2 py-1 text-xs font-medium tabular-nums",
                        s.costDelta < 0 ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                      )}
                    >
                      {s.costDelta >= 0 ? "+" : "-"}${Math.abs(s.costDelta).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => onUse(s)}
                    className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Use This Instead
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

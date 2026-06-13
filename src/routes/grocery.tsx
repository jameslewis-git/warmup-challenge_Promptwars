import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { GroceryList } from "@/components/GroceryList";
import { SubstituteDrawer } from "@/components/SubstituteDrawer";
import { useGroceryStore } from "@/stores/groceryStore";
import type { GroceryItem, Substitute } from "@/types";

export const Route = createFileRoute("/grocery")({
  head: () => ({
    meta: [
      { title: "Grocery List · CookPlan" },
      { name: "description", content: "Your week's groceries, sorted and priced." },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <GroceryPage />
    </ProtectedRoute>
  ),
});

function GroceryPage() {
  const { items, checkedIds, markAllPurchased, replaceItem } = useGroceryStore();
  const [drawerItem, setDrawerItem] = useState<GroceryItem | null>(null);
  const [copied, setCopied] = useState(false);

  const total = items.reduce((sum, i) => sum + i.estimatedCost, 0);

  const handleExport = async () => {
    const text = items
      .map((i) => `- ${i.name} (${i.quantity} ${i.unit}) — $${i.estimatedCost.toFixed(2)}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const handleUseSub = (sub: Substitute) => {
    if (!drawerItem) return;
    replaceItem(drawerItem.id, sub.name, sub.costDelta);
    setDrawerItem(null);
  };

  return (
    <div className="min-h-screen pb-28">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Grocery List</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              {" · "}
              {checkedIds.length}/{items.length} purchased
            </p>
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied!" : "Export"}
          </button>
        </header>

        <GroceryList onSubstitute={setDrawerItem} />
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated total</p>
            <p className="font-display text-xl font-semibold tabular-nums">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={markAllPurchased}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Mark All Purchased
          </button>
        </div>
      </div>

      <SubstituteDrawer
        item={drawerItem}
        open={!!drawerItem}
        onClose={() => setDrawerItem(null)}
        onUse={handleUseSub}
      />
    </div>
  );
}

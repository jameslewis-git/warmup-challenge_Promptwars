import { useGroceryStore } from "@/stores/groceryStore";
import type { GroceryCategory, GroceryItem } from "@/types";
import { GroceryItemRow } from "./GroceryItemRow";

const CATEGORY_ORDER: GroceryCategory[] = ["Produce", "Dairy", "Meat & Seafood", "Pantry", "Frozen"];

export function GroceryList({ onSubstitute }: { onSubstitute: (item: GroceryItem) => void }) {
  const { items, checkedIds, toggleItem } = useGroceryStore();

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((i) => i.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-8">
      {grouped.map(({ category, items }) => (
        <section key={category}>
          <div className="mb-2 flex items-baseline justify-between border-b border-border pb-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {category}
            </h2>
            <span className="text-xs text-muted-foreground">{items.length} items</span>
          </div>
          <div className="divide-y divide-border/50">
            {items.map((item) => (
              <GroceryItemRow
                key={item.id}
                item={item}
                checked={checkedIds.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
                onSubstitute={() => onSubstitute(item)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

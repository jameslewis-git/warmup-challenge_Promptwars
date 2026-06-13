import { create } from "zustand";
import type { GroceryItem } from "@/types";
import { mockGroceryItems } from "@/lib/mock-data";

interface GroceryState {
  items: GroceryItem[];
  checkedIds: string[];
  toggleItem: (id: string) => void;
  markAllPurchased: () => void;
  replaceItem: (id: string, newName: string, costDelta: number) => void;
}

export const useGroceryStore = create<GroceryState>((set, get) => ({
  items: mockGroceryItems,
  checkedIds: [],
  toggleItem: (id) => {
    const checked = get().checkedIds;
    set({
      checkedIds: checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id],
    });
  },
  markAllPurchased: () => set({ checkedIds: get().items.map((i) => i.id) }),
  replaceItem: (id, newName, costDelta) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, name: newName, estimatedCost: Math.max(0, i.estimatedCost + costDelta) } : i
      ),
    }),
}));

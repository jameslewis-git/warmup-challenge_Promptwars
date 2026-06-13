import { create } from "zustand";
import type { GroceryItem } from "@/types";
import { generateGroceryList } from "@/lib/api";
import { supabase } from "@/lib/supabase";

interface GroceryState {
  items: GroceryItem[];
  checkedIds: string[];
  isLoading: boolean;
  error: string | null;
  fetchList: (mealPlanId: string) => Promise<void>;
  toggleItem: (id: string) => void;
  markAllPurchased: () => void;
  replaceItem: (id: string, newName: string, costDelta: number) => void;
}

export const useGroceryStore = create<GroceryState>((set, get) => ({
  items: [],
  checkedIds: [],
  isLoading: false,
  error: null,
  fetchList: async (mealPlanId: string) => {
    set({ isLoading: true, error: null });
    try {
      const items = await generateGroceryList(mealPlanId);
      set({ items, checkedIds: items.filter((i: any) => i.checked).map((i: any) => i.id), isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  toggleItem: async (id) => {
    const { checkedIds, items } = get();
    const isChecked = checkedIds.includes(id);
    const newCheckedIds = isChecked ? checkedIds.filter((c) => c !== id) : [...checkedIds, id];
    
    // Optimistic update
    set({ checkedIds: newCheckedIds });

    const newItems = items.map(i => i.id === id ? { ...i, checked: !isChecked } : i);
    set({ items: newItems });
    
    // We would need the grocery list ID to correctly sync with supabase.
    // Assuming the user wants an optimistic update for the local state for now.
  },
  markAllPurchased: () => set({ checkedIds: get().items.map((i) => i.id) }),
  replaceItem: (id, newName, costDelta) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, name: newName, estimatedCost: Math.max(0, i.estimatedCost + costDelta) } : i
      ),
    }),
}));

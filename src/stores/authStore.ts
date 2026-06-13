import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialize: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  initialize: () => {
    const mapUser = (u: any): User | null => 
      u ? { id: u.id, email: u.email, name: u.user_metadata?.display_name || u.email?.split('@')[0] || 'User' } : null;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ user: mapUser(session?.user), isAuthenticated: !!session, isLoading: false });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: mapUser(session?.user), isAuthenticated: !!session, isLoading: false });
    });
  },
  logout: async () => {
    await supabase.auth.signOut();
  },
}));

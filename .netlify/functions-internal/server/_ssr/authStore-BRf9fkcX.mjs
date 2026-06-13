import { t as create } from "../_libs/zustand.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authStore-BRf9fkcX.js
var supabase = createClient("https://ycffkkchwiyxkfnqqefq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmZra2Nod2l5eGtmbnFnZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMjM3MzAsImV4cCI6MjA5Njg5OTczMH0.bJkbnTSb71QPB5P0opBL87JE3hxquyKtSnIRLjz_LuY");
var useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: true,
	initialize: () => {
		const mapUser = (u) => u ? {
			id: u.id,
			email: u.email,
			name: u.user_metadata?.display_name || u.email?.split("@")[0] || "User"
		} : null;
		supabase.auth.getSession().then(({ data: { session } }) => {
			set({
				user: mapUser(session?.user),
				isAuthenticated: !!session,
				isLoading: false
			});
		});
		supabase.auth.onAuthStateChange((_event, session) => {
			set({
				user: mapUser(session?.user),
				isAuthenticated: !!session,
				isLoading: false
			});
		});
	},
	logout: async () => {
		await supabase.auth.signOut();
	}
}));
//#endregion
export { useAuthStore as n, supabase as t };

import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, UtensilsCrossed } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold">CookPlan</span>
        </Link>

        {isAuthenticated && (
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/planner", label: "Planner" },
              { to: "/grocery", label: "Grocery" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
                {user.name.charAt(0)}
              </div>
              <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

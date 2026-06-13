import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "@/stores/authStore";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <>{children}</>;
}

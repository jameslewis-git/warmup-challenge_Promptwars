import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative inline-flex h-5 w-5">
        <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      </span>
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}

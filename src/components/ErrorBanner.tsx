import { X } from "lucide-react";

export function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <p>{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="rounded-md p-0.5 text-destructive/80 transition-colors hover:text-destructive"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

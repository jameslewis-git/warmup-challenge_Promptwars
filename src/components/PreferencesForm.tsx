import { usePlannerStore } from "@/stores/plannerStore";
import { cn } from "@/lib/utils";

const DIETS = ["Vegetarian", "Vegan", "Keto", "Paleo", "Halal", "Gluten-Free"];
const ALLERGIES = ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy"];
const CUISINES = ["Indian", "Mediterranean", "Mexican", "Asian", "Italian"];
const COOK_STOPS = [15, 30, 45, 60];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-border bg-secondary text-muted-foreground hover:border-border hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

export function PreferencesForm({ onSubmit }: { onSubmit: () => void }) {
  const { preferences, toggleArrayPref, setPreferences } = usePlannerStore();
  const stopIdx = Math.max(
    0,
    COOK_STOPS.findIndex((s) => s === preferences.cookTimeMinutes)
  );

  return (
    <div className="space-y-7 rounded-2xl border border-border bg-card p-6">
      <div>
        <h3 className="font-display text-base font-semibold">Dietary Restrictions</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {DIETS.map((d) => (
            <Chip
              key={d}
              label={d}
              active={preferences.dietaryRestrictions.includes(d)}
              onClick={() => toggleArrayPref("dietaryRestrictions", d)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold">Allergies</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALLERGIES.map((a) => (
            <Chip
              key={a}
              label={a}
              active={preferences.allergies.includes(a)}
              onClick={() => toggleArrayPref("allergies", a)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-base font-semibold">Max Cook Time</h3>
          <span className="text-sm text-muted-foreground">
            {preferences.cookTimeMinutes === 60 ? "60+ min" : `${preferences.cookTimeMinutes} min`}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={COOK_STOPS.length - 1}
          step={1}
          value={stopIdx === -1 ? 1 : stopIdx}
          onChange={(e) => setPreferences({ cookTimeMinutes: COOK_STOPS[Number(e.target.value)] })}
          className="mt-3 w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          {COOK_STOPS.map((s) => (
            <span key={s}>{s === 60 ? "60+" : s}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold">Daily Budget</h3>
        <div className="mt-3 flex items-center rounded-xl border border-border bg-input/60 px-3 focus-within:border-primary/50">
          <span className="text-muted-foreground">$</span>
          <input
            type="number"
            min={0}
            value={preferences.budgetUsd}
            placeholder="25"
            onChange={(e) => setPreferences({ budgetUsd: Number(e.target.value) || 0 })}
            className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
          />
          <span className="text-xs text-muted-foreground">/ day</span>
        </div>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold">
          Cuisine <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {CUISINES.map((c) => (
            <Chip
              key={c}
              label={c}
              active={preferences.cuisines.includes(c)}
              onClick={() => toggleArrayPref("cuisines", c)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="gradient-cta w-full rounded-xl px-4 py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
      >
        Generate Meal Plan
      </button>
    </div>
  );
}

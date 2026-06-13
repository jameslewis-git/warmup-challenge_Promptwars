# 🍽️ CookPlan — Cooking To-Do List Micro-App
## Implementation Plan for Claude Code

---

## ✅ Security Architecture Decision

### Do We Need Auth + Supabase?
**YES — both are required.** Here's why:

| Feature | Why Auth is Needed | Why Supabase is Needed |
|---|---|---|
| Meal Plans | Must persist per user across sessions | Store generated plans with user_id FK |
| Grocery Lists | User should not see others' lists | Row Level Security (RLS) enforces isolation |
| Budget Settings | User-specific preference | Stored in `user_profiles` table |
| Substitute Preferences | Dietary restrictions / allergies per user | Stored in `user_profiles` |
| AI API Key | Must NEVER be exposed client-side | Supabase Edge Function secrets |

**Auth method:** Supabase Auth (email+password + optional Google OAuth).  
**No bare JWT rolling** — let Supabase handle sessions.  
**AI calls** go through a **Supabase Edge Function** (Deno) — the Ollama API key lives only in Edge Function secrets, never in the frontend bundle.

---

## 🏗️ Tech Stack

```
Frontend:   React 18 + Vite + TypeScript + TailwindCSS + Zustand
Backend:    Supabase (Auth + PostgreSQL + RLS + Edge Functions)
AI Layer:   Supabase Edge Function → Ollama Cloud API (OpenAI-compatible)
Validation: Zod (shared schema between frontend + edge function)
Hosting:    Frontend → Netlify / Vercel | Supabase → managed cloud
```

---

## 🤖 AI Provider: Ollama Cloud

### API Details
```
Base URL:  https://ollama.com/v1
Endpoint:  POST https://ollama.com/v1/chat/completions
Auth:      Authorization: Bearer <OLLAMA_API_KEY>
Protocol:  OpenAI-compatible (drop-in)
```

### Default Model
```
Default:  llama3.3:latest
```
`llama3.3` is the recommended default — it's free, 70B parameters, strong at structured JSON output, and handles dietary/cooking reasoning well.

### Model Swap Strategy
The model name is stored in a single constant `OLLAMA_MODEL` at the top of each Edge Function. To switch models, change one line. Free models available on Ollama Cloud:

| Model | Speed | JSON Reliability | Best For |
|---|---|---|---|
| `llama3.3:latest` | Medium | ⭐⭐⭐⭐⭐ | Default — best quality |
| `qwen2.5:14b` | Fast | ⭐⭐⭐⭐⭐ | Fastest + great JSON |
| `llama3.1:8b` | Very Fast | ⭐⭐⭐⭐ | Low latency |
| `mistral:latest` | Fast | ⭐⭐⭐⭐ | Good fallback |
| `phi4:latest` | Fast | ⭐⭐⭐⭐ | Lightweight |

### Edge Function AI Call Pattern
```typescript
// Constants at top of each edge function — easy to swap
const OLLAMA_BASE_URL = "https://ollama.com/v1";
const OLLAMA_MODEL = "llama3.3:latest"; // Change this to swap models

const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Deno.env.get("OLLAMA_API_KEY")}`,
  },
  body: JSON.stringify({
    model: OLLAMA_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    format: "json",        // Force JSON output mode
    stream: false,
    temperature: 0.3,      // Low temp = more deterministic JSON
    options: {
      num_predict: 2048    // Max tokens for response
    }
  }),
  signal: AbortSignal.timeout(30000), // 30s timeout
});

if (!response.ok) {
  // Handle Ollama-specific errors
  const err = await response.text();
  if (response.status === 404) throw new Error("Model not found on Ollama Cloud");
  if (response.status === 429) throw new Error("Ollama rate limit hit");
  throw new Error(`Ollama API error: ${response.status}`);
}

const data = await response.json();
const content = data.choices?.[0]?.message?.content;
if (!content) throw new Error("Empty response from Ollama");

// Parse JSON — Ollama with format:"json" should always return valid JSON
let parsed;
try {
  parsed = JSON.parse(content);
} catch {
  // Retry once with stricter prompt
  // ... retry logic here
  throw new Error("AI response malformed after retry");
}
```

### Ollama-Specific Error Handling
```
404 → Model not found → Log model name, return 500 "AI model unavailable"
429 → Rate limit → Return 429 with Retry-After: 60 header
503 → Ollama Cloud down → Return 503 with friendly message
Timeout (30s) → Return 504 with "AI is taking too long, try again"
JSON parse fail → Retry once with stricter prompt → 422 if still fails
```

---

## 📁 Project Structure

```
cookplan/
├── frontend/                            ← Lovable export goes here
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── meal-planner/
│   │   │   │   ├── PreferencesForm.tsx
│   │   │   │   ├── MealPlanCard.tsx
│   │   │   │   ├── MealPlanGrid.tsx
│   │   │   │   └── BudgetBadge.tsx
│   │   │   ├── grocery/
│   │   │   │   ├── GroceryList.tsx
│   │   │   │   ├── GroceryItem.tsx
│   │   │   │   └── SubstituteDrawer.tsx
│   │   │   └── shared/
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── ErrorBanner.tsx
│   │   │       └── ConfirmModal.tsx
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── PlannerPage.tsx
│   │   │   └── GroceryPage.tsx
│   │   ├── store/
│   │   │   ├── authStore.ts
│   │   │   ├── plannerStore.ts
│   │   │   └── groceryStore.ts
│   │   ├── lib/
│   │   │   ├── supabase.ts
│   │   │   ├── api.ts
│   │   │   ├── validation.ts
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   │   ├── useMealPlan.ts
│   │   │   ├── useGroceryList.ts
│   │   │   └── useAuth.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── supabase/
│   ├── functions/
│   │   ├── _shared/
│   │   │   ├── ollama.ts          ← shared Ollama client + constants
│   │   │   ├── auth.ts            ← JWT verification helper
│   │   │   └── rateLimit.ts       ← rate limit checker
│   │   ├── generate-meal-plan/
│   │   │   └── index.ts
│   │   ├── generate-grocery-list/
│   │   │   └── index.ts
│   │   └── get-substitutes/
│   │       └── index.ts
│   ├── migrations/
│   │   ├── 001_create_user_profiles.sql
│   │   ├── 002_create_meal_plans.sql
│   │   ├── 003_create_grocery_lists.sql
│   │   ├── 004_create_rate_limits.sql
│   │   ├── 005_create_rls_policies.sql
│   │   └── 006_seed_substitutes.sql
│   └── config.toml
│
├── .env.example
└── README.md
```

Note the `_shared/` folder — Ollama client code is written once and imported by all 3 edge functions.

---

## 🗄️ Database Schema

### `user_profiles`
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  dietary_restrictions TEXT[],
  allergies TEXT[],
  weekly_budget_usd NUMERIC(10,2),
  preferred_cuisines TEXT[],
  default_cook_time_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `meal_plans`
```sql
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_date DATE NOT NULL,
  breakfast JSONB NOT NULL,
  lunch JSONB NOT NULL,
  dinner JSONB NOT NULL,
  total_estimated_cost NUMERIC(10,2),
  budget_status TEXT CHECK (budget_status IN ('within', 'warning', 'exceeded')),
  ai_model_used TEXT,                    -- stores which Ollama model was used
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `grocery_lists`
```sql
CREATE TABLE grocery_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  total_estimated_cost NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `ingredient_substitutes`
```sql
CREATE TABLE ingredient_substitutes (
  id SERIAL PRIMARY KEY,
  original_ingredient TEXT NOT NULL,
  substitute TEXT NOT NULL,
  reason TEXT,
  cost_delta NUMERIC(5,2)
);
```

### `rate_limits`
```sql
CREATE TABLE rate_limits (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,                  -- 'generate_meal_plan', 'get_substitutes'
  count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, action)
);
```

---

## 🔒 RLS Policies

```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_profiles_self" ON user_profiles
  USING (auth.uid() = id);

ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "meal_plans_self" ON meal_plans
  USING (auth.uid() = user_id);

ALTER TABLE grocery_lists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "grocery_lists_self" ON grocery_lists
  USING (auth.uid() = user_id);

ALTER TABLE ingredient_substitutes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "substitutes_read_all" ON ingredient_substitutes
  FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rate_limits_self" ON rate_limits
  USING (auth.uid() = user_id);
```

---

## ⚡ Edge Functions

### Shared: `_shared/ollama.ts`
```typescript
// Single source of truth for Ollama config
export const OLLAMA_BASE_URL = "https://ollama.com/v1";
export const OLLAMA_MODEL = "llama3.3:latest"; // Swap model here

export async function callOllama(
  systemPrompt: string,
  userPrompt: string,
  retryOnFail = true
): Promise<string> {
  const apiKey = Deno.env.get("OLLAMA_API_KEY");
  if (!apiKey) throw new Error("OLLAMA_API_KEY not set");

  const makeRequest = async () => fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      format: "json",
      stream: false,
      temperature: 0.3,
      options: { num_predict: 2048 }
    }),
    signal: AbortSignal.timeout(30000),
  });

  const res = await makeRequest();

  if (res.status === 429) throw new Error("RATE_LIMITED");
  if (res.status === 404) throw new Error("MODEL_NOT_FOUND");
  if (!res.ok) throw new Error(`OLLAMA_ERROR_${res.status}`);

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("EMPTY_RESPONSE");
  return content;
}
```

---

### 1. `generate-meal-plan`

**Input (Zod-validated):**
```typescript
{
  dietary_restrictions: string[],   // max 20 items, each max 50 chars
  allergies: string[],              // max 20 items, each max 50 chars
  available_time_minutes: number,   // min 5, max 240
  budget_per_day_usd: number,       // min 1, max 999
  preferred_cuisines: string[],     // max 10 items
  plan_date: string                 // valid ISO date, max 1yr future
}
```

**System Prompt Template:**
```
You are a professional meal planner. Respond ONLY with valid JSON, no explanation.
Return a meal plan object with this exact structure:
{
  "breakfast": { "name": string, "ingredients": string[], "estimated_cost": number, "cook_time_minutes": number },
  "lunch": { "name": string, "ingredients": string[], "estimated_cost": number, "cook_time_minutes": number },
  "dinner": { "name": string, "ingredients": string[], "estimated_cost": number, "cook_time_minutes": number }
}
Constraints:
- Total cost MUST be under $[budget]
- Cook time per meal MUST be under [time] minutes
- MUST respect dietary restrictions: [restrictions]
- MUST avoid allergens: [allergies]
- Preferred cuisines: [cuisines]
Do not include any text outside the JSON object.
```

**Budget Logic:**
```
total = breakfast.cost + lunch.cost + dinner.cost
within  → total <= budget * 0.85
warning → total <= budget * 1.10
exceeded → total > budget * 1.10
```
If exceeded: retry with prompt addition: "IMPORTANT: Reduce all costs by at least 20%. Current total $X exceeds $Y budget."

**Output saved to `meal_plans` table with `ai_model_used = OLLAMA_MODEL`**

---

### 2. `generate-grocery-list`

**Input:** `{ meal_plan_id: string }`

**Process:**
1. Fetch meal plan WHERE id = ? AND user_id = auth.uid() (server-side auth check)
2. Extract all ingredients from breakfast/lunch/dinner JSONB
3. Deduplicate + merge quantities (string matching, normalize to lowercase)
4. Categorize using a hardcoded lookup map (no AI needed for this step):
   ```typescript
   const CATEGORY_MAP: Record<string, string> = {
     // Produce
     "tomato": "Produce", "lettuce": "Produce", "onion": "Produce",
     "garlic": "Produce", "spinach": "Produce", "carrot": "Produce",
     // Dairy
     "milk": "Dairy", "cheese": "Dairy", "butter": "Dairy", "yogurt": "Dairy",
     // Meat & Seafood
     "chicken": "Meat & Seafood", "beef": "Meat & Seafood", "salmon": "Meat & Seafood",
     "shrimp": "Meat & Seafood", "turkey": "Meat & Seafood",
     // Pantry
     "rice": "Pantry", "pasta": "Pantry", "flour": "Pantry", "oil": "Pantry",
     "salt": "Pantry", "pepper": "Pantry", "sugar": "Pantry",
     // Default
     // anything unmatched → "Other"
   };
   ```
5. Query `ingredient_substitutes` for each ingredient (attach up to 3)
6. Save to `grocery_lists`, return organized list

---

### 3. `get-substitutes`

**Input (Zod-validated):**
```typescript
{
  ingredient: string,  // max 100 chars, sanitized
  reason: "allergy" | "vegan" | "budget" | "unavailable"
}
```

**Process:**
1. Query `ingredient_substitutes` WHERE original_ingredient ILIKE $1
2. If 3+ results → return immediately (no AI call, $0 cost)
3. If <3 results → call Ollama:
   ```
   System: "Respond ONLY with valid JSON. No extra text."
   User: "Give me 3 substitutes for [ingredient] for reason: [reason].
   Return: {"substitutes": [{"name": string, "reason": string, "cost_delta": number}]}"
   ```
4. Cache new substitutes to `ingredient_substitutes` table
5. Return max 3 substitutes

---

## 🛡️ Security Checklist

### Input Validation & Sanitization
- [ ] All Edge Function inputs validated with Zod before any processing
- [ ] String fields: strip HTML tags, trim whitespace before inserting into prompts
- [ ] Numeric fields clamped to valid ranges
- [ ] Array fields max-length enforced (prevent prompt injection via huge arrays)
- [ ] `plan_date` validated as real ISO date
- [ ] All DB queries use Supabase parameterized client — no string-interpolated SQL

### Authentication & Authorization
- [ ] All Edge Functions require valid Supabase JWT in `Authorization` header
- [ ] `user_id` always extracted from JWT server-side — NEVER from request body
- [ ] RLS enforced at DB level as defense-in-depth
- [ ] `OLLAMA_API_KEY` stored in Supabase Edge Function secrets only
- [ ] Supabase anon key in frontend is fine (RLS protects all data)
- [ ] Service role key only auto-injected in Edge Function runtime

### Rate Limiting
- [ ] Max 10 meal plan generations per user per day
- [ ] Max 50 substitute lookups per user per day
- [ ] Implemented via `rate_limits` table (window resets every 24h)
- [ ] Return 429 with `Retry-After: 86400` header when exceeded

### Frontend Security
- [ ] Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in frontend env
- [ ] AI-generated content sanitized before rendering (treat as untrusted)
- [ ] No `dangerouslySetInnerHTML` anywhere
- [ ] `Content-Security-Policy` header configured on Netlify/Vercel

### Ollama-Specific
- [ ] `OLLAMA_API_KEY` only in Supabase secrets, never in code or .env files committed
- [ ] AI responses always parsed with try/catch — never trusted directly
- [ ] Model name logged to `ai_model_used` column for debugging
- [ ] 30s timeout on all Ollama fetch calls

---

## 🎨 UI/UX Flow

### Page 1: Auth (`/auth`)
- Login / Signup toggle, Email + Password
- Redirect to `/dashboard` on success

### Page 2: Dashboard (`/dashboard`)
- Welcome + user name
- "Generate Today's Meal Plan" CTA
- Past 7 days meal plan cards
- Weekly budget widget

### Page 3: Planner (`/planner`)
- Step 1: Preferences Form (diet chips, allergy chips, time slider, budget input, cuisines)
- Step 2: Meal Plan Results (3 cards + BudgetBadge + Regenerate + Save)

### Page 4: Grocery (`/grocery`)
- Categorized list with checkboxes
- Substitute drawer per item
- Export to clipboard

---

## 🔄 Data Flow

```
PreferencesForm → Zod validate (client) → POST /generate-meal-plan + JWT
  → Edge Function: JWT verify → Zod validate (server) → sanitize
  → rate limit check → build prompt → callOllama()
  → parse JSON → budget check → [retry if exceeded]
  → save to meal_plans → return to frontend

"Get Grocery List" → POST /generate-grocery-list + { meal_plan_id } + JWT
  → Edge Function: JWT verify → fetch meal_plan (auth check in query)
  → extract ingredients → categorize → attach substitutes
  → save to grocery_lists → return

"Substitute" button → POST /get-substitutes + { ingredient, reason } + JWT
  → Edge Function: JWT verify → query DB first
  → if <3 results: callOllama() → cache to DB
  → return max 3 substitutes
```

---

## 📦 Dependencies

### Frontend
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.x",
    "@supabase/supabase-js": "^2.x",
    "zustand": "^4.x",
    "zod": "^3.x",
    "dompurify": "^3.x",
    "@types/dompurify": "^3.x"
  }
}
```

### Edge Functions (Deno)
```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { z } from "https://deno.land/x/zod/mod.ts"
// Ollama: plain fetch — no SDK needed (OpenAI-compatible REST)
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js 20+
- Supabase CLI (`npm install -g supabase`)
- Supabase account (free tier)
- Ollama Cloud account + API key (free at ollama.com)

### 1. Install
```bash
cd "CookPlan Daily"
npm install
```

### 2. Supabase Setup
```bash
supabase login
supabase init
supabase start
supabase db push        # runs all migrations in order
```

### 3. Set Ollama API Key (Edge Function Secret)
```bash
supabase secrets set OLLAMA_API_KEY=your_ollama_api_key_here
```
Get your key at: https://ollama.com/settings/api-keys

### 4. Deploy Edge Functions
```bash
supabase functions deploy generate-meal-plan
supabase functions deploy generate-grocery-list
supabase functions deploy get-substitutes
```

### 5. Frontend Environment
```bash
# Create .env.local in project root
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 6. Run
```bash
npm run dev
# → http://localhost:5173
```

### 7. Swap Ollama Model (optional)
Edit `supabase/functions/_shared/ollama.ts`:
```typescript
export const OLLAMA_MODEL = "qwen2.5:14b"; // change this line only
```
Then redeploy: `supabase functions deploy --no-verify-jwt` (or all 3 functions)

---

## ⚙️ Environment Variables

```bash
# .env.example (commit this)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Supabase Edge Function Secrets (set via CLI, NEVER commit)
OLLAMA_API_KEY=           # from ollama.com/settings/api-keys
                          # Default model: llama3.3:latest (free)
                          # Change OLLAMA_MODEL in _shared/ollama.ts to swap
SUPABASE_SERVICE_ROLE_KEY= # auto-injected by Supabase runtime
```

---

## ⚠️ Edge Cases

| Scenario | Handling |
|---|---|
| Ollama returns invalid JSON | Retry once with stricter prompt; 422 if still fails |
| Ollama model not found (404) | Return 500 "AI model unavailable"; log model name |
| Ollama rate limit (429) | Return 429 with Retry-After: 60 |
| Budget < $2/day | Return warning before AI call: "minimum viable budget is $3/day" |
| Conflicting restrictions | Frontend Zod catches before API call |
| All meals exceed budget after retry | Return `exceeded` status + per-meal swap suggestions |
| No substitute in DB + Ollama fails | Return "no substitute found" gracefully |
| Meal plan deleted mid-grocery generation | 404 from Edge Function |
| Ollama timeout (>30s) | 504 with "AI is taking too long, try again" |
| Prompt injection in dietary field | Sanitize + clamp before inserting into prompt string |

---

## 🗂️ Build Order for Claude Code

1. Supabase migrations (001–006 in order)
2. `_shared/ollama.ts` — Ollama client
3. `_shared/auth.ts` — JWT verify helper
4. `_shared/rateLimit.ts` — rate limit checker
5. Frontend auth flow (authStore + LoginForm + SignupForm + ProtectedRoute)
6. `types/index.ts` — all TypeScript types
7. `lib/validation.ts` — all Zod schemas
8. Edge Function: `generate-meal-plan`
9. Edge Function: `generate-grocery-list`
10. Edge Function: `get-substitutes`
11. `lib/supabase.ts` — Supabase client
12. `lib/api.ts` — typed wrappers replacing Lovable placeholders
13. plannerStore + groceryStore — wired to real API
14. Pages: DashboardPage, PlannerPage, GroceryPage
15. README.md

---

*Hand this file + the Lovable export folder to Claude Code. It has everything needed to build the complete production-ready application with Ollama Cloud as the AI provider.*

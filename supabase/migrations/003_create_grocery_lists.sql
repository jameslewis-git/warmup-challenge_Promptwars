CREATE TABLE grocery_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  total_estimated_cost NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ingredient_substitutes (
  id SERIAL PRIMARY KEY,
  original_ingredient TEXT NOT NULL,
  substitute TEXT NOT NULL,
  reason TEXT,
  cost_delta NUMERIC(5,2)
);

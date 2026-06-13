CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_date DATE NOT NULL,
  breakfast JSONB NOT NULL,
  lunch JSONB NOT NULL,
  dinner JSONB NOT NULL,
  total_estimated_cost NUMERIC(10,2),
  budget_status TEXT CHECK (budget_status IN ('within', 'warning', 'exceeded')),
  ai_model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

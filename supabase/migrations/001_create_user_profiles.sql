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

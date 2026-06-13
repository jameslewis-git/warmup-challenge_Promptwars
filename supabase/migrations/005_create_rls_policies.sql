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

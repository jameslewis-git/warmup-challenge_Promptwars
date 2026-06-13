CREATE TABLE rate_limits (
  user_id UUID REFERENCES auth.users(id),
  action TEXT,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, action)
);

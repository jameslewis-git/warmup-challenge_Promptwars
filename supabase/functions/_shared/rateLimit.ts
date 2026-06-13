import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const checkRateLimit = async (supabase: SupabaseClient, userId: string, action: string, maxCount: number) => {
  const { data, error } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('user_id', userId)
    .eq('action', action)
    .maybeSingle();

  const now = new Date();
  
  if (data) {
    const windowStart = new Date(data.window_start);
    // Reset window if it's older than 24 hours
    if (now.getTime() - windowStart.getTime() > 24 * 60 * 60 * 1000) {
      await supabase.from('rate_limits').update({ count: 1, window_start: now.toISOString() }).eq('user_id', userId).eq('action', action);
    } else {
      if (data.count >= maxCount) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
      await supabase.from('rate_limits').update({ count: data.count + 1 }).eq('user_id', userId).eq('action', action);
    }
  } else {
    await supabase.from('rate_limits').insert({ user_id: userId, action, count: 1, window_start: now.toISOString() });
  }
};

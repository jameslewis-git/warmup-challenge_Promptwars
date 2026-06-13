import { z } from "zod";
import DOMPurify from "dompurify";

const sanitizeString = (val: string) => {
  // DOMPurify only works in browser, for edge functions we might need a regex or simpler clean
  // but since this is used in frontend and maybe edge function (zod handles validation), 
  // we'll safely check if DOMPurify is available.
  if (typeof window !== 'undefined' && DOMPurify) {
    return DOMPurify.sanitize(val).trim();
  }
  return val.replace(/<[^>]*>?/gm, '').trim();
};

export const UserPreferencesSchema = z.object({
  dietary_restrictions: z.array(z.string().transform(sanitizeString).pipe(z.string().max(50))).max(20).default([]),
  allergies: z.array(z.string().transform(sanitizeString).pipe(z.string().max(50))).max(20).default([]),
  available_time_minutes: z.number().min(5).max(240),
  budget_per_day_usd: z.number().min(1).max(999),
  preferred_cuisines: z.array(z.string().transform(sanitizeString).pipe(z.string().max(50))).max(10).default([]),
  plan_date: z.string()
});

export const SubstituteRequestSchema = z.object({
  ingredient: z.string().transform(sanitizeString).pipe(z.string().max(100)),
  reason: z.enum(["allergy", "vegan", "budget", "unavailable"])
});

export const MealPlanRequestSchema = z.object({
  meal_plan_id: z.string().uuid()
});

export type UserPreferencesPayload = z.infer<typeof UserPreferencesSchema>;
export type SubstituteRequestPayload = z.infer<typeof SubstituteRequestSchema>;
export type MealPlanRequestPayload = z.infer<typeof MealPlanRequestSchema>;

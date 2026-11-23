import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { PilotSubmission } from "./pilot";
import { proposedPriceDollars } from "./product";

const pilotConsentVersion = "pilot-v3";
const updatesConsentVersion = "updates-v2";

export async function savePilotSubmission(submission: PilotSubmission): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    console.error("Pilot signup is missing Supabase configuration.");
    return false;
  }

  try {
    const origin = new URL(url);
    const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
    if (origin.protocol !== "https:" && !(origin.protocol === "http:" && isLoopback)) {
      throw new Error("Invalid Supabase URL protocol");
    }

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { error } = await supabase.rpc("register_griplab_pilot", {
      p_email: submission.email,
      p_racket_model: submission.racketModel || null,
      p_grip_size: submission.gripSize,
      p_grip_feedback: submission.gripFeedback || null,
      p_price_interest: submission.priceInterest,
      p_price_shown_cents: proposedPriceDollars * 100,
      p_pilot_consent_version: pilotConsentVersion,
      p_updates_consent_version: submission.updatesConsent ? updatesConsentVersion : null,
    }).abortSignal(AbortSignal.timeout(8_000));

    if (!error) return true;
  } catch {
    // Keep request values, credentials, and upstream response details out of application logs.
  }

  console.error("Pilot signup storage request failed.");
  return false;
}

"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { pilotLimits, pilotSchema, receiptCookie, type PilotState } from "@/lib/pilot";
import { savePilotSubmission } from "@/lib/pilot-storage";

export async function registerPilot(_previous: PilotState, form: FormData): Promise<PilotState> {
  const attempt = randomUUID();
  const email = form.get("email");
  const racketModel = form.get("racketModel") ?? "";
  const gripSize = form.get("gripSize");
  const gripFeedback = form.get("gripFeedback") ?? "";
  const priceInterest = form.get("priceInterest");
  const adultConfirmed = form.get("adultConfirmed") === "on";
  const usBasedConfirmed = form.get("usBasedConfirmed") === "on";
  const pilotConsent = form.get("pilotConsent") === "on";
  const updatesConsent = form.get("updatesConsent") === "on";
  const values = {
    email: displayValue(email, pilotLimits.email),
    racketModel: displayValue(racketModel, pilotLimits.racketModel),
    gripSize: displayValue(gripSize, 12),
    gripFeedback: displayValue(gripFeedback, pilotLimits.gripFeedback),
    priceInterest: displayValue(priceInterest, 12),
    adultConfirmed,
    usBasedConfirmed,
    pilotConsent,
    updatesConsent,
  };

  if (form.get("website")) {
    return { attempt, values, message: "We couldn’t accept this response. Clear any autofilled fields or reload the form and try again." };
  }

  const result = pilotSchema.safeParse({ email, racketModel, gripSize, gripFeedback, priceInterest, adultConfirmed, usBasedConfirmed, pilotConsent, updatesConsent });
  if (!result.success) {
    return { attempt, values, message: "Check the highlighted fields and try again.", errors: z.flattenError(result.error).fieldErrors };
  }

  if (!await savePilotSubmission(result.data)) {
    return { attempt, values, message: "We couldn’t save your response. Your answers are still here. Please try again in a moment." };
  }

  (await cookies()).set(receiptCookie, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/thank-you",
    maxAge: 15 * 60,
  });
  redirect("/thank-you");
}

function displayValue(value: FormDataEntryValue | null, limit: number) {
  return typeof value === "string" ? value.slice(0, limit) : "";
}

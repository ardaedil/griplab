import { z } from "zod";

export const gripSizes = {
  unknown: "I’m not sure",
  L0: "L0 (4 in)",
  L1: "L1 (4 ⅛ in)",
  L2: "L2 (4 ¼ in)",
  L3: "L3 (4 ⅜ in)",
  L4: "L4 (4 ½ in)",
  L5: "L5 (4 ⅝ in)",
  other: "Another size",
} as const;

export const priceResponses = {
  likely: "Likely",
  maybe: "Maybe",
  unlikely: "Unlikely",
  unsure: "I’m not sure",
} as const;

export const pilotLimits = { email: 254, racketModel: 120, gripFeedback: 500 } as const;

const validText = (max: number, label: string) =>
  z.string().trim().max(max, `Use ${max} characters or fewer for ${label}.`)
    .refine((value) => !value.includes("\0"), `Remove unsupported characters from ${label}.`);

export const pilotSchema = z.object({
  email: z.string().trim().toLowerCase().max(pilotLimits.email, "Use 254 characters or fewer for your email.")
    .pipe(z.email({ error: "Enter a valid email address." })),
  racketModel: validText(pilotLimits.racketModel, "your racket model"),
  gripSize: z.enum(Object.keys(gripSizes) as (keyof typeof gripSizes)[], {
    error: "Choose a grip size or select ‘I’m not sure’.",
  }),
  gripFeedback: validText(pilotLimits.gripFeedback, "your grip feedback"),
  priceInterest: z.enum(Object.keys(priceResponses) as (keyof typeof priceResponses)[], {
    error: "Choose how likely you would be to buy at the proposed price.",
  }),
  adultConfirmed: z.literal(true, { error: "Confirm you are at least 18 years old to participate." }),
  usBasedConfirmed: z.literal(true, { error: "Confirm you currently live in the United States to participate." }),
  pilotConsent: z.literal(true, { error: "Give permission for Paltune to contact you about the pilot." }),
  updatesConsent: z.boolean(),
});

export type PilotSubmission = z.infer<typeof pilotSchema>;

export type PilotValues = {
  email: string;
  racketModel: string;
  gripSize: string;
  gripFeedback: string;
  priceInterest: string;
  adultConfirmed: boolean;
  usBasedConfirmed: boolean;
  pilotConsent: boolean;
  updatesConsent: boolean;
};

export type PilotState = {
  attempt?: string;
  message?: string;
  errors?: Partial<Record<keyof PilotValues, string[]>>;
  values: PilotValues;
};

export const initialPilotState: PilotState = {
  values: { email: "", racketModel: "", gripSize: "unknown", gripFeedback: "", priceInterest: "", adultConfirmed: false, usBasedConfirmed: false, pilotConsent: false, updatesConsent: false },
};

export const receiptCookie = "griplab_pilot_received";

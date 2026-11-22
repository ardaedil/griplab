"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { gripSizes, initialPilotState, pilotLimits, priceResponses, type PilotState, type PilotValues } from "@/lib/pilot";
import { proposedPrice } from "@/lib/product";
import { registerPilot } from "./actions";

const fieldLabels: Record<keyof PilotValues, string> = {
  email: "Email address",
  racketModel: "Racket brand and model",
  gripSize: "Grip size",
  gripFeedback: "What would you change about your grip?",
  priceInterest: "Interest at the proposed price",
  pilotConsent: "Pilot contact permission",
  updatesConsent: "Product updates",
};

export function PilotForm() {
  const [state, formAction, pending] = useActionState(registerPilot, initialPilotState, "/pilot");
  const summary = useRef<HTMLDivElement>(null);
  const { values, errors, message, attempt } = state;

  useEffect(() => {
    if (attempt) summary.current?.focus();
  }, [attempt]);

  return (
    <form className="pilot-form" aria-labelledby="form-title" action={formAction} noValidate>
      <h2 id="form-title">Pilot interest form</h2>
      <p className="form-intro">Fields marked optional can be left blank.</p>
      {message && (
        <div className="error-summary" ref={summary} tabIndex={-1} role="region" aria-labelledby="error-title">
          <h3 id="error-title">{message}</h3>
          {errors && (
            <ul>
              {(Object.keys(errors) as (keyof PilotValues)[]).map((name) => (
                <li key={name}><a href={`#${name}`}>{fieldLabels[name]}</a></li>
              ))}
            </ul>
          )}
        </div>
      )}
      <fieldset key={attempt} className="form-fields" disabled={pending} aria-busy={pending} aria-label="Your pilot response">
        <div hidden>
          <label htmlFor="website">Leave this field blank</label>
          <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
        </div>
        <Field name="email" errors={errors}>
          {(attrs) => <input {...attrs} type="email" autoComplete="email" maxLength={pilotLimits.email} defaultValue={values.email} required />}
        </Field>
        <div className="form-row">
          <Field name="racketModel" errors={errors} optional>
            {(attrs) => <input {...attrs} type="text" placeholder="e.g. Wilson Blade 98" maxLength={pilotLimits.racketModel} defaultValue={values.racketModel} />}
          </Field>
          <Field name="gripSize" errors={errors}>
            {(attrs) => (
              <select {...attrs} defaultValue={values.gripSize} required>
                {Object.entries(gripSizes).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            )}
          </Field>
        </div>
        <Field name="gripFeedback" errors={errors} hint="Share what feels off or how you’d like the grip to feel. Leave out contact details." optional>
          {(attrs) => <textarea {...attrs} rows={3} maxLength={pilotLimits.gripFeedback} defaultValue={values.gripFeedback} />}
        </Field>
        <Field name="priceInterest" errors={errors} label={`If it fit your racket, how likely would you be to buy at ${proposedPrice} excluding shipping?`}>
          {(attrs) => (
            <select {...attrs} defaultValue={values.priceInterest} required>
              <option value="">Select an answer</option>
              {Object.entries(priceResponses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          )}
        </Field>
        <div className="form-consent">
          <label className="checkbox-row" htmlFor="pilotConsent">
            <input id="pilotConsent" name="pilotConsent" type="checkbox" required defaultChecked={values.pilotConsent}
              aria-invalid={Boolean(errors?.pilotConsent) || undefined}
              aria-describedby={errors?.pilotConsent ? "pilotConsent-error" : undefined} />
            <span>I agree that GripLab may email me about my pilot response.</span>
          </label>
          <FieldError name="pilotConsent" errors={errors} />
          <label className="checkbox-row" htmlFor="updatesConsent">
            <input id="updatesConsent" name="updatesConsent" type="checkbox" defaultChecked={values.updatesConsent} />
            <span>I’d also like GripLab product updates. <span className="field-optional">Optional</span></span>
          </label>
          <p className="field-hint">Read the <Link href="/privacy">pilot privacy notice</Link> and <Link href="/terms">pilot terms</Link>.</p>
        </div>
        <button type="submit" className="button button-primary form-submit" disabled={pending}>
          {pending ? "Sending your response…" : "Submit pilot interest"}
        </button>
      </fieldset>
      <p className="sr-only" role="status">{pending ? "Sending your response." : ""}</p>
    </form>
  );
}

type FieldAttributes = {
  id: string;
  name: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

function Field({ name, errors, label = fieldLabels[name], hint, optional, children }: {
  name: keyof PilotValues;
  errors: PilotState["errors"];
  label?: string;
  hint?: string;
  optional?: boolean;
  children: (attributes: FieldAttributes) => ReactNode;
}) {
  const invalid = Boolean(errors?.[name]);
  const describedBy = [hint && `${name}-hint`, invalid && `${name}-error`].filter(Boolean).join(" ");

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}{optional && <> <span className="field-optional">Optional</span></>}</label>
      {hint && <p className="field-hint" id={`${name}-hint`}>{hint}</p>}
      {children({ id: name, name, "aria-invalid": invalid || undefined, "aria-describedby": describedBy || undefined })}
      <FieldError name={name} errors={errors} />
    </div>
  );
}

function FieldError({ name, errors }: { name: keyof PilotValues; errors: PilotState["errors"] }) {
  const error = errors?.[name]?.[0];
  return error ? <p className="field-error" id={`${name}-error`}>{error}</p> : null;
}

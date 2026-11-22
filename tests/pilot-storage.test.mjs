import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { openPilotDatabase, registerPilot } from "./support/pilot-db.mjs";

let db;

const sample = {
  p_email: "  Player@Example.test  ",
  p_racket_model: "Demo racket",
  p_grip_size: "L2",
  p_grip_feedback: null,
  p_price_interest: "maybe",
  p_price_shown_cents: 4900,
  p_pilot_consent_version: "pilot-v1",
  p_updates_consent_version: null,
};

before(async () => { db = await openPilotDatabase(); });
after(async () => { await db?.close(); });

test("guest and signed-in roles cannot call the RPC or access stored responses", async () => {
  for (const role of ["anon", "authenticated"]) {
    await assert.rejects(registerPilot(db, sample, role), { code: "42501" });
  }

  for (const role of ["anon", "authenticated", "service_role"]) {
    await assert.rejects(db.transaction(async (tx) => {
      await tx.exec(`set local role ${role}`);
      await tx.exec("select email from griplab_private.pilot_signups");
    }), { code: "42501" });
  }

  const { rows } = await db.query("select relrowsecurity from pg_class where oid = 'griplab_private.pilot_signups'::regclass");
  assert.equal(rows[0].relrowsecurity, true);
});

test("a duplicate preserves the first normalized response and the original consent", async () => {
  await registerPilot(db, sample);
  await registerPilot(db, {
    ...sample, p_email: "player@example.test", p_racket_model: "Another racket", p_updates_consent_version: "updates-v2",
  });

  const { rows } = await db.query("select * from griplab_private.pilot_signups where email = $1", ["player@example.test"]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].racket_model, "Demo racket");
  assert.equal(rows[0].pilot_consent_version, "pilot-v1");
  assert.ok(rows[0].pilot_consent_at);
  assert.equal(rows[0].updates_consent_at, null);
  assert.equal(rows[0].updates_consent_version, null);
});

test("service call enforces constraints and records optional updates separately", async () => {
  const email = "opt-in@example.test";
  await assert.rejects(registerPilot(db, { ...sample, p_email: email, p_pilot_consent_version: null }), { code: "23502" });
  await assert.rejects(registerPilot(db, { ...sample, p_email: email, p_grip_size: "invalid" }), { code: "23514" });
  await assert.rejects(registerPilot(db, { ...sample, p_email: email, p_grip_feedback: "a".repeat(501) }), { code: "23514" });
  await registerPilot(db, { ...sample, p_email: email, p_updates_consent_version: "updates-v1" });
  const { rows } = await db.query("select * from griplab_private.pilot_signups where email = $1", [email]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].pilot_consent_version, "pilot-v1");
  assert.ok(rows[0].pilot_consent_at);
  assert.equal(rows[0].updates_consent_version, "updates-v1");
  assert.ok(rows[0].updates_consent_at);
  assert.equal(rows[0].price_shown_cents, 4900);
});

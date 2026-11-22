import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

const migration = new URL("../../supabase/migrations/20261122000000_create_pilot_signups.sql", import.meta.url);

export const rpcFields = [
  "p_email", "p_racket_model", "p_grip_size", "p_grip_feedback", "p_price_interest",
  "p_price_shown_cents", "p_pilot_consent_version", "p_updates_consent_version",
];

export async function openPilotDatabase() {
  const db = await PGlite.create();
  await db.exec(`
    create role anon;
    create role authenticated;
    create role service_role bypassrls;
    grant usage on schema public to anon, authenticated, service_role;
  `);
  await db.exec(await readFile(migration, "utf8"));
  return db;
}

export function registerPilot(db, values, role = "service_role") {
  const call = `select public.register_griplab_pilot(${rpcFields.map((_, index) => `$${index + 1}`).join(", ")})`;
  return db.transaction(async (tx) => {
    await tx.exec(`set local role ${role}`);
    await tx.query(call, rpcFields.map((field) => values[field]));
  });
}

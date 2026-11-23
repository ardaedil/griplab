# Paltune pilot operating policy — founder decisions (review branch)

Selected November 23, 2026. Public recruitment remains **blocked** pending legal clearance, privacy/retention enforcement, rate-limit enforcement and protected-domain testing.

## Identity and customer contact

- Paltune is an early-stage tennis-grip pilot operated by **Arda Edil individually**, not an LLC.
- The founder approved **ardaedil@gmail.com** as the published pilot contact email during early research.
- No domain-branded inbox or email forwarding has been configured. **Never publish hello@paltune.io until a provider is connected, the mailbox is tested for inbound mail, and someone can reply.**
- Vercel provides DNS, domains and hosting; **Vercel does not host email inboxes**. If desired, configure a separate provider and its MX/SPF/DKIM/DMARC records. Do not add or replace records without confirming the selected provider.
- The form itself does not send automated mail. Optional product-update consent remains separate.

## Eligibility

- Adults aged **18+**, who **currently live in the United States**.
- Signup enforces both eligibility confirmations in browser markup and again in the Next.js server action using Zod.
- No identity documents, birth dates, street addresses or geolocation are collected to verify eligibility. The eligibility checks are self-attestations, not a guarantee that the statements are true.
- The historic internal `griplab_private` Supabase schema and the `register_griplab_pilot` RPC remain unchanged.
- New consent label for the revised pilot notice: `pilot-v4` (product updates consent stays `updates-v2`).

## Approved pilot data retention

- Retain application records for **no longer than 12 months after `created_at`**, unless law requires retaining limited information.
- Allow a verified deletion request to shorten that period.
- **DO NOT open public registration until a purge schedule has been deployed, validated with test data and monitored.** The job is not automatically installed by this review PR.
- Proposed cleanup SQL for a privileged job executing once daily at 03:00 UTC, after schedule approval and test:
  
  `delete from griplab_private.pilot_signups where created_at < (now() - interval '12 months');`

- Recommended implementation: Supabase Cron / `pg_cron`, installed through a reviewed database migration. Confirm extension availability, exact job execution role, least-privilege access, logging, monitoring, and behavior at boundaries; test with synthetic records only. Example docs: https://supabase.com/docs/guides/cron and https://supabase.com/docs/guides/cron/quickstart.

## Privacy requests: manual pilot workflow

1. Receive a request at **ardaedil@gmail.com**. Ask requesters to send from their registered email address; if different, verify their control of the registered address before disclosing or changing anything.
2. Record minimal metadata about the request (date, type, outcome). Do not copy their complete application details into emails or logs.
3. Only an authorized database administrator reviews or changes a record using the **exact normalized signup email**, in Supabase's private table. No public delete endpoint or additional database role grants.
4. For a verified deletion request, locate the exact row, delete it transactionally, verify precisely the intended row was removed, and reply to confirm completion. Do not bulk-delete unrelated records.
5. For optional marketing withdrawal, do not send future product announcements to that address. The current app has no mailing integration; document a compliant suppress-or-delete path before any marketing system is enabled.
6. As a proposed internal goal, acknowledge requests within 7 days and usually complete verified requests within 30 days, subject to applicable laws. These are not guarantees until the process is operationally tested.

## Launch conditions still open

- Complete direct USPTO and common-law brand clearance (PALTUNE / PALMTUNE and related sporting equipment).
- Install and verify real 12-month cleanup job. Use test records; current staging rows are zero.
- Verify privacy request and marketing unsubscribe operations with controlled synthetic examples.
- Move Vercel Preview-only `POST /pilot` abuse threshold beyond log-only, after validating appropriate traffic and legitimate retries. Avoid making production changes without approval.
- Verify unauthenticated access to `https://paltune.io` requires Vercel Authentication. Current custom domain is attached to the brand review branch.
- Review and approve final legal notices. Pilot still accepts no orders or payments; compatibility is unverified.

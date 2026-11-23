# Paltune — Brand Identity v1.0

**Status (November 23, 2026):** Creative direction selected by the founder; legal clearance and public-use approval pending. **Do not treat this file as evidence of trademark ownership or registration.**

## Brand architecture

- **Master brand:** Paltune
- **Visual wordmark:** `paltune.` (lowercase with a full stop)
- **First product / working name:** Paltune Grip
- **First product category:** Customizable, removable tennis racket grip insert; prototype concept under validation
- **Long-term category:** Customized fit for racket and paddle sports; do not advertise padel/pickleball compatibility without separate testing
- **Tagline:** Made to fit you.
- **One-sentence description:** Paltune develops customizable sports grips, starting with a tennis racket grip insert designed around player feedback.
- **Prelaunch subline:** Personalized grips start with better questions. Help shape the first tennis prototype.

## Brand promise and voice

- **Core idea:** Individual fit instead of one-size-fits-all assumptions
- **Personality:** Precise, human, understated, practical, modern
- **Tone:** Clear and confident about the *process*; transparent about what is *not yet proven*
- **Avoid:** AI-generated precision claims, health/injury-prevention claims, measured performance claims, universal racket compatibility, automated customization claims, or guaranteed delivery
- **Approved prelaunch CTA:** Join the pilot
- **Truthful prelaunch qualification:** Prototype in development; physical compatibility unverified; $49 is the proposed starting price excluding shipping; no payment or prototype reservation

## Visual direction

Existing web colors intentionally retained:

| Usage | Name | Hex |
|---|---|---|
| Primary ink | Midnight green | `#19271E` |
| Secondary green | Deep evergreen | `#273E2E` |
| Accent | Electric lime | `#D9F469` |
| Background | Soft paper | `#F9F9F3` |
| Muted surface | Pale moss | `#EDF1E6` |
| Border | Sage line | `#D8DFD3` |

Typography: **Manrope Variable** for brand and body; **IBM Plex Mono** for small technical labels. Prefer simple geometry, generous whitespace, high contrast, and no gratuitous futuristic/AI imagery. The current concept illustration is **not a manufactured prototype**.

The two-bar geometric symbol is a provisional mark pending brand clearance, design review and distinctiveness checks.

## Naming rules

1. In running copy use **Paltune**.
2. In the visual wordmark use **paltune.** with a lowercase p and a period.
3. Refer to the prototype concept as **Paltune Grip**, with descriptive context at first mention (e.g., “Paltune Grip, a customizable tennis racket grip insert in development”).
4. Do not imply Paltune currently manufactures grips for pickleball or padel.
5. Do not replace technical identifiers without a documented migration plan.

## Website first fold

- **Eyebrow:** Paltune Grip · Tennis pilot
- **Headline:** Your racket. Your grip.
- **Lead:** Made to fit you. Paltune Grip is a customizable tennis racket grip insert in development. Tell us what you play with and help shape the first prototype.
- **Primary action:** Join the pilot
- **Research price:** $49 proposed, excludes shipping, no payment collected

## Domains and trademark position

- `paltune.com` was not available in the latest Vercel check.
- **`paltune.io` is registered** in the founder's Vercel account (November 23, 2026; one-year registration for $14.99 base charge, auto-renew OFF; order `01M83ZZZ7Q2JXRT9XB037PTD9J` completed). Older checks of `paltune.co`, `getpaltune.com`, and `paltune.app` were for comparison only.
- Public search revealed unrelated Spanish grocery use of the exact name **Paltune**; **PalmTune** is a similar phonetic candidate to check.
- An official, comprehensive U.S. trademark search for exact and similar marks, state/common-law uses, and related sporting goods is **not complete**. Do not claim Paltune is legally clear. Search directly using https://tmsearch.uspto.gov/ and consult qualified counsel as appropriate.
- **Chosen domain: `paltune.io`.** Added to Vercel project `griplab-staging` with explicit Preview Git branch `brand/paltune-founder-review`; project-domain ownership verified. Automatic root and wildcard ALIAS records exist. At the connection check, Vercel reported `misconfigured=true`; the test environment could not resolve external hostnames, so independent public DNS/HTTPS reachability could not be verified. Wait for DNS/HTTPS and unauthenticated-access checks before relying on the hostname. The project is protected by Vercel Authentication; do not make it public without launch approval.

## Legal and launch gating

- Responsible individual currently identified as **Arda Edil**, operating the project personally rather than through an LLC.
- Before public signup: select a working public contact address, approve privacy notice and pilot terms, define a retention/deletion workflow and update marketing opt-out procedure, enforce age eligibility if adults-only, and add request rate-limiting.
- Before product testing: verify one exact tennis racket-handle profile and establish safe handling/test instructions.
- Before commercial branding: complete trademark clearance; assess possible conflicts, choose a domain, and confirm public launch approval.

## Engineering migration policy

- The GitHub repository remains `ardaedil/griplab`.
- Vercel and Supabase projects remain `griplab-staging`.
- Private SQL schema/function and legacy receipt cookie retain technical `griplab` names.
- This is intentional. Migrate identifiers only when required, after backup and rollback planning.
- Consent notice versions `pilot-v2` and `updates-v2` are drafted in the brand review branch. Do not adopt in live storage until the site copy is legally approved.
- GitHub draft PR #1 holds policy updates; draft PR #2 holds the proposed brand changes. Neither is authorized for public deployment.

## Next decision

**Finish DNS/HTTPS verification, then complete trademark clearance and pilot-launch approvals.** Domain registration does not grant trademark rights. Keep Preview behind Vercel Authentication and do not launch publicly while privacy/terms and technical safeguards are drafts.

# GripLab

GripLab is a prelaunch site for a customizable tennis racket grip insert. The pilot collects self-reported racket setup, grip feedback, and purchase intent at a proposed $49 starting price, excluding shipping. Personalization and prototype review are initially manual. Compatibility requires physical verification of the specific handle profile.

## Local development

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The pages render without Supabase configuration. A valid submission requires the database migration and both server environment variables in `.env.example`.

## Staging and deployment

1. Create a dedicated Supabase project for staging. Apply [the signup migration](supabase/migrations/20261122000000_create_pilot_signups.sql) in its SQL editor as the project database owner, or apply it through your Supabase migration workflow. Keep `public` exposed in the Data API for the server RPC and leave `griplab_private` outside the exposed schemas.
2. Set `SUPABASE_URL` to the staging project URL and `SUPABASE_SECRET_KEY` to a staging secret key. Use `.env.local` for local development and server-only environment settings on your host. [Supabase documents where to find these values.](https://supabase.com/docs/guides/getting-started/api-keys)
3. Deploy to an HTTPS host with Next.js App Router and Node.js support. Use `npm ci` and `npm run build`. For a self-hosted Node process, use `npm start` after building. Keep staging access private. The site is marked `noindex` while the pilot and policy drafts are under review.
4. In staging, submit a synthetic response and check the row in the project SQL editor. Resubmit the same email in a different case with a different updates choice. Verify a single row with the original answer and consent. Verify an unauthenticated Data API call to `register_griplab_pilot` is denied. Delete the staging test rows afterward.

The public form is protected by server-side validation, a request size limit, and a honeypot. If the host provides request throttling, apply it to `POST /pilot` before public traffic and check that normal retries still succeed. Application error logs contain only fixed diagnostic messages. Review request logging, retention, and region settings on the deployment and Supabase projects before collecting real responses.

### Founder review before public launch

- Confirm the responsible entity, contact address, pilot eligibility and terms, data retention, and how people can request access, deletion, or withdrawal. Update the draft privacy and terms pages and revise the consent versions if their wording changes.
- Confirm hosting and data-processing arrangements and the price and shipping assumptions. Establish who can access responses and who follows up on pilot or product-update permission. The app records those choices and sends no email.
- Physically verify specific racket-handle profiles and review prototypes before publishing any compatibility or performance claim. Treat price responses as stated intent and use actual prototype feedback to guide product decisions.

## Privacy-aware pilot measurement

No client-side trackers, advertising scripts, or third-party analytics are installed. The only app cookie is a short-lived receipt flag scoped to `/thank-you`. A duplicate displays the same confirmation as a new response and cannot overwrite existing answers or consent. Use the Supabase SQL editor for aggregate reporting by proposed price:

```sql
select
  price_shown_cents,
  count(*) as unique_responses,
  count(*) filter (where price_interest = 'likely') as likely,
  count(*) filter (where price_interest = 'maybe') as maybe,
  count(*) filter (where price_interest = 'unlikely') as unlikely,
  count(*) filter (where price_interest = 'unsure') as unsure,
  count(*) filter (where updates_consent_at is not null) as update_opt_ins
from griplab_private.pilot_signups
group by price_shown_cents
order by price_shown_cents;
```

The app measures submitted responses. It does not collect page-view counts, so these totals cannot provide a landing-page conversion rate.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

`npm test` runs migration checks in embedded PostgreSQL, then starts the production Next.js build and a local Supabase REST fixture on ports 3400 and 54331. The fixture runs the actual SQL migration in PostgreSQL and simulates one temporary storage failure. Playwright checks saved rows, duplicate consent behavior, failure and retry, keyboard navigation, JavaScript-disabled submission, and desktop and phone layouts. It also runs axe on the landing page and form errors. A hosted Supabase smoke test is part of staging setup.

## Concept illustration

The built-in ImageGen tool produced [the hero illustration](public/grip-concept.webp) as a product concept drawing. The image and its caption represent the proposed insert and have no verified fit dimensions.

<details>
<summary>Image generation prompt</summary>

> Use case: stylized-concept. Asset: square hero concept illustration for GripLab, a prelaunch tennis racket grip insert. Create a bold 2D industrial design illustration, clearly drawn, no photorealism. On a flat pale pistachio chartreuse background (#e2ebc5), draw a dark black-green bare tennis racket handle and black tapered throat entering from the upper-right corner, sweeping diagonally toward lower left. Show one lime green elongated, curved, thin faceted custom grip insert floating parallel just above the dark handle in an exploded view with a small clear air gap. The insert is about the length of the handgrip, following the handle profile, with fine contour hatching. Use deep evergreen fine outlines, restrained offset flat shadows, sparse tiny engineering registration crosshairs, faint dashed construction lines and a very subtle grid. Premium contemporary sports equipment design lab aesthetic, deliberate, clean air around the centered assembly, limited palette of pale chartreuse, vivid lime, and ink green. The insert and handle should dominate about 75% of the frame. No text, no letters, no digits, no labels, no brands, no hands, no photo textures, no arrows. HTML will add the concept caption.

</details>

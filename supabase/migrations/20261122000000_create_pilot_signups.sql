begin;

create schema griplab_private;
revoke all on schema griplab_private from public, anon, authenticated, service_role;

create table griplab_private.pilot_signups (
  email text primary key check (
    email = lower(btrim(email)) and char_length(email) <= 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  racket_model text check (char_length(racket_model) between 1 and 120),
  grip_size text not null check (grip_size in ('unknown', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'other')),
  grip_feedback text check (char_length(grip_feedback) between 1 and 500),
  price_interest text not null check (price_interest in ('likely', 'maybe', 'unlikely', 'unsure')),
  price_shown_cents integer not null check (price_shown_cents > 0),
  created_at timestamptz not null default now(),
  pilot_consent_at timestamptz not null,
  pilot_consent_version text not null check (char_length(pilot_consent_version) between 1 and 40),
  updates_consent_at timestamptz,
  updates_consent_version text check (char_length(updates_consent_version) between 1 and 40),
  check ((updates_consent_at is null) = (updates_consent_version is null))
);

alter table griplab_private.pilot_signups enable row level security;
revoke all on table griplab_private.pilot_signups from public, anon, authenticated, service_role;

create function public.register_griplab_pilot(
  p_email text,
  p_racket_model text,
  p_grip_size text,
  p_grip_feedback text,
  p_price_interest text,
  p_price_shown_cents integer,
  p_pilot_consent_version text,
  p_updates_consent_version text
) returns void
language sql
security definer
set search_path = ''
as $$
  insert into griplab_private.pilot_signups (
    email, racket_model, grip_size, grip_feedback, price_interest, price_shown_cents,
    pilot_consent_at, pilot_consent_version, updates_consent_at, updates_consent_version
  ) values (
    lower(btrim(p_email)), p_racket_model, p_grip_size, p_grip_feedback, p_price_interest, p_price_shown_cents,
    now(), p_pilot_consent_version,
    case when p_updates_consent_version is not null then now() end,
    p_updates_consent_version
  ) on conflict (email) do nothing;
$$;

revoke all on function public.register_griplab_pilot(text, text, text, text, text, integer, text, text)
  from public, anon, authenticated, service_role;
grant usage on schema public to service_role;
grant execute on function public.register_griplab_pilot(text, text, text, text, text, integer, text, text)
  to service_role;

commit;

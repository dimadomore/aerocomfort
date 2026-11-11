-- Lead source and contact clicks (docs/16-lead-tracking.md). Applied to Cloudflare D1.
--   local: wrangler d1 migrations apply aerocomfort-leads --local
--   prod:  wrangler d1 migrations apply aerocomfort-leads --remote
--
-- The Worker keeps working before this is applied: it falls back to the old
-- columns and skips the click counter. So deploy and migrate in either order.

-- Where each request came from (filled by src/lib/journey.ts through the form).
ALTER TABLE leads ADD COLUMN channel      TEXT; -- 'form' | 'agent'
ALTER TABLE leads ADD COLUMN from_page    TEXT; -- page before the form, e.g. /offers
ALTER TABLE leads ADD COLUMN cta          TEXT; -- button pressed there, e.g. offer-card
ALTER TABLE leads ADD COLUMN landing      TEXT; -- first page of the visit
ALTER TABLE leads ADD COLUMN referrer     TEXT; -- outside site that sent the visitor
ALTER TABLE leads ADD COLUMN utm_source   TEXT;
ALTER TABLE leads ADD COLUMN utm_medium   TEXT;
ALTER TABLE leads ADD COLUMN utm_campaign TEXT;
ALTER TABLE leads ADD COLUMN click_id     TEXT; -- which ad click id was present: gclid, fbclid…
ALTER TABLE leads ADD COLUMN journey      TEXT; -- pages seen, "/ > /offers > /contact"

-- Anonymous counter of contact clicks that never reach the form. No IP address,
-- no browser details, no visitor id: one row is one click, nothing more.
CREATE TABLE IF NOT EXISTS events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  at           TEXT NOT NULL,          -- ISO timestamp
  type         TEXT NOT NULL,          -- whatsapp | call | email | quote_click
  page         TEXT,                   -- page the click happened on
  cta          TEXT,                   -- where on the page: hero, sticky-bar, final-cta…
  locale       TEXT,
  device       TEXT,                   -- mobile | desktop
  landing      TEXT,
  referrer     TEXT,
  utm_source   TEXT,
  utm_campaign TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_at ON events (at);

-- Lead storage for the mini-CRM (/leads). Applied to Cloudflare D1.
--   local: wrangler d1 migrations apply aerocomfort-leads --local
--   prod:  wrangler d1 migrations apply aerocomfort-leads --remote
CREATE TABLE IF NOT EXISTS leads (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  at       TEXT    NOT NULL,           -- ISO timestamp
  name     TEXT    NOT NULL,
  phone    TEXT    NOT NULL,
  whatsapp INTEGER NOT NULL DEFAULT 0, -- 0/1
  service  TEXT,
  message  TEXT,
  locale   TEXT,
  page     TEXT,
  ip       TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_at ON leads (at);

-- The customer's email address, required on every request since 2026-11-16.
--   local: wrangler d1 migrations apply aerocomfort-leads --local
--   prod:  wrangler d1 migrations apply aerocomfort-leads --remote
--
-- The Worker keeps working before this is applied: it stores the lead without
-- the email column (worker/index.ts insertLead), and the email still goes out
-- in the notification. Apply it before deploying so nothing is dropped.
ALTER TABLE leads ADD COLUMN email TEXT;

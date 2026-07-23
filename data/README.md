# Leads (local mini-CRM)

The lead form (`/api/lead`) writes every submission here **during local dev**
(`astro dev`). Two formats, same data, written together:

- **`leads.csv`** — open in Excel / Numbers / Google Sheets. Header row + one
  row per lead. Columns: `at, name, phone, whatsapp, service, message, locale, page, ip`.
- **`leads.ndjson`** — one JSON object per line (newline-delimited JSON), handy
  for scripts / re-import.

Both are git-ignored (test data). They appear after the first form submission.

## Viewing & why only local

Open **`/leads`** in the browser (while `npm run dev` runs) for a live table, or
**`/leads.csv`** to download. Both are password-gated (Basic Auth, `LEADS_PASSWORD`).

This file-based table is written only by the **dev server** (Node). In production
the form is handled by the **Cloudflare Worker**, which has no filesystem, so it
writes to **Cloudflare D1** instead (`aerocomfort-leads`, bound as `DB`) — and
`/leads` reads from D1 there. The `/leads` page, CSV, login, and email all behave
identically in dev and prod; only the storage backend differs (file vs D1).

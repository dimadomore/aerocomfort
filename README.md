# Aerocomfort

Website for Aerocomfort — HVAC / air conditioning services in Costa Blanca, Alicante, Spain (installation, repair, maintenance, sales).

- Current (legacy) site: https://aerocomfort.es/ (EN) / https://aerocomfort.es/es (ES), built on Tilda
- This repo: the new AI-built, natively-coded replacement (static, fast, SEO/AEO-first)

## Status

📋 Planning phase (scaffold deployed). All project documentation lives in [`docs/`](docs/):

- [docs/00-brief.md](docs/00-brief.md) — project brief and current-site audit
- [docs/01-interview.md](docs/01-interview.md) — open questions / discovery interview
- [docs/02-questions-for-john.md](docs/02-questions-for-john.md) — questionnaire for the owner

## Stack & deploy

- [Astro](https://astro.build) static site, deployed as a Cloudflare Worker with static assets ([wrangler.jsonc](wrangler.jsonc)).
- CI: [GitHub Actions](.github/workflows/deploy.yml), needs repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
- Push to `main` → production: https://aero.dimadomore.com (temporary domain until switching to aerocomfort.es).
- Push to `dev` → preview version, unique URL printed in the Action log (`*-aerocomfort.dimadomore.workers.dev`).
- The custom domain is attached account-level via the Workers Domains API (not via wrangler routes — the CI token has no zone permissions).

```sh
npm install
npm run dev     # local dev server
npm run build   # build to dist/
```

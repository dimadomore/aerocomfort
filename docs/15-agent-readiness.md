# Agent readiness

What the site offers to AI agents and crawlers, as of Nov 2026. Re-check WebMCP before relying on it: the API is still an origin trial and has already moved from `navigator.modelContext` to `document.modelContext`.

## One set of tools, three channels

`worker/agent-tools.mjs` defines the tools once. All read `/data/business.json`, which is built from the same data as the pages.

| Channel | Who it serves | Where |
|---|---|---|
| WebMCP | Agents in the browser | `src/lib/webmcp.ts`, loaded only if the API exists |
| MCP server | Agents outside the browser | `POST /mcp`, `worker/mcp.mjs`, read-only, no auth |
| Static files | Crawlers and any HTTP client | `.md` page copies, `llms.txt`, JSON, `.well-known/*` |

Tools: `get_business_info`, `list_services`, `get_service`, `check_service_area`, `list_offers`, `search_faq`, `get_contact_options`. Browser only: `open_quote_form`, and the contact form as the declarative tool `request_quote`.

Tool names are a public interface. Don't rename them.

## Rules

- No tool sends a lead. An agent may fill the form, but the person submits it, because it needs their own RGPD consent. Never add `toolautosubmit` or a server-side lead tool without auth and anti-spam.
- Agents repeat what they read, so prices must stay honest. Offer prices include a standard turnkey installation, as on the live aerocomfort.es. What "standard" covers is still to confirm with the owner.
- `scripts/gen-agent-files.mjs` runs after `astro build` and writes the Markdown copies, server card, agent skill and api-catalog. These use `SITE_URL`, so they point at aerocomfort.es.
- Link headers live in both `public/_headers` and `worker/index.ts`. Keep them in sync.

## At cutover

1. Set `SITE_INDEXABLE = true`. Until then robots.txt blocks every crawler.
2. Check AI Crawl Control and bot settings on the aerocomfort.es Cloudflare zone, so AI crawlers aren't blocked there.
3. Register the WebMCP origin trial for aerocomfort.es and paste the token into `WEBMCP_ORIGIN_TRIAL` in `src/config.ts`.
4. Fill opening hours and geo in `src/data/business.yml`, keeping them identical to the Google Business Profile.
5. Verify the site in Search Console and Bing Webmaster Tools. Bing feeds several assistants.

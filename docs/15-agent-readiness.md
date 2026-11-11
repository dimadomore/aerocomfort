# Agent readiness

What the site offers to AI agents and crawlers, as of 11 Nov 2026. Re-check WebMCP before relying on it: the API is still an origin trial and has already moved from `navigator.modelContext` to `document.modelContext`.

## One set of tools, three channels

`worker/agent-tools.mjs` defines the tools once. All read `/data/business.json`, which is built from the same data as the pages.

| Channel | Who it serves | Where |
|---|---|---|
| WebMCP | Agents in the browser | `src/lib/webmcp.ts`, loaded only if the API exists |
| MCP server | Agents outside the browser | `POST /mcp`, `worker/mcp.mjs`, no auth |
| HTTP API | Any agent that can call a URL | `POST /api/lead` with JSON, described in `/openapi.json` |
| Static files | Crawlers and any HTTP client | `.md` page copies, `llms.txt`, JSON, `.well-known/*` |

Read tools: `get_business_info`, `list_services`, `get_service`, `check_service_area`, `list_offers`, `search_faq`, `get_contact_options`. Write tool: `send_quote_request`. Browser only: `open_quote_form`, and the contact form as the declarative tool `request_quote`.

Tool names are a public interface. Don't rename them.

## Rules

- An agent may send a lead for the person it is helping (owner's decision, 11 Nov 2026, replacing the earlier "no tool sends a lead" rule). The safeguards, all in `worker/lead-core.mjs`, apply to the form, the JSON API and the MCP tool alike:
  - `consent` must be true. The tool and the docs tell the agent to ask the person first and to point to the privacy policy. Without it the request is refused with `consent_required`.
  - The phone must be a plausible international number.
  - At most 5 requests per IP address per hour (`LEADS_PER_HOUR`), counted in D1.
  - A request that names its `agent` is stored with the source `agent: <name>`, so it shows as such in the email and in `/leads`.
  - Such a request skips Turnstile, because an agent cannot solve it. If spam arrives through this door, the fix is to drop that exception or lower the limit.
- The endpoint is public and has no sign-in, so it can be abused. Watch `/leads` for junk after launch.
- Agents repeat what they read, so prices must stay honest. Offer prices include a standard turnkey installation, as on the live aerocomfort.es. What "standard" covers is still to confirm with the owner.
- `scripts/gen-agent-files.mjs` runs after `astro build` and writes the Markdown copies, server card, agent skill, api-catalog and `/openapi.json`. These use `SITE_URL`, so they point at aerocomfort.es.
- Link headers live in both `public/_headers` and `worker/index.ts`. Keep them in sync.

## At cutover

1. Set `SITE_INDEXABLE = true`. Until then robots.txt blocks every crawler.
2. Check AI Crawl Control and bot settings on the aerocomfort.es Cloudflare zone, so AI crawlers aren't blocked there.
3. Register the WebMCP origin trial for aerocomfort.es and paste the token into `WEBMCP_ORIGIN_TRIAL` in `src/config.ts`.
4. Fill opening hours and geo in `src/data/business.yml`, keeping them identical to the Google Business Profile.
5. Verify the site in Search Console and Bing Webmaster Tools. Bing feeds several assistants.

## What works before cutover and what does not

Checked 11 Nov 2026. On staging (aero.dimadomore.com) every channel answers, but an agent that follows the rules will not use it: robots.txt disallows everything and every page is `noindex` until `SITE_INDEXABLE` is true. The agent files also name the final domain, so `https://aerocomfort.es/mcp` and `/api/lead` only exist once the domain points at this site. Nothing here needs changing at cutover beyond the list below.

To test by hand on staging, call the staging host directly, for example `POST https://aero.dimadomore.com/mcp`. A `send_quote_request` call there writes a real row and, once the mail secrets are set, sends a real email.

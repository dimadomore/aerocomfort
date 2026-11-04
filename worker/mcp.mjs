/**
 * Remote MCP server at /mcp: the same read-only tools as WebMCP, for agents that
 * aren't running in a browser. Stateless Streamable HTTP, public, no user data.
 * Answers `initialize` so clients on older handshake revisions still connect.
 */
import { TOOLS } from './agent-tools.mjs';

const SUPPORTED = ['2026-07-28', '2025-11-25', '2025-06-18', '2025-03-26'];
const HANDSHAKE_LATEST = '2025-11-25';
const SERVER = { name: 'aerocomfort', title: 'Aerocomfort air conditioning', version: '1.0.0' };
const INSTRUCTIONS =
  'Aerocomfort installs, repairs, services and cleans air conditioning on the Costa Blanca, Spain. ' +
  'Use check_service_area for a town, list_offers for prices and get_contact_options to hand the person a way to get in touch. ' +
  'Offer prices include a standard turnkey installation and are confirmed in a free quote. These tools only read public information; nothing is sent to the business.';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, accept, mcp-protocol-version, mcp-session-id',
  'Access-Control-Max-Age': '86400',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...CORS } });
const ok = (id, result) => json({ jsonrpc: '2.0', id, result });
const fail = (id, code, message, data) =>
  json({ jsonrpc: '2.0', id: id ?? null, error: { code, message, ...(data ? { data } : {}) } });

let cached;
async function loadData(request, env) {
  if (cached) return cached;
  const res = await env.ASSETS.fetch(new Request(new URL('/data/business.json', request.url)));
  if (!res.ok) throw new Error('data unavailable');
  cached = await res.json();
  return cached;
}

const listTools = () =>
  TOOLS.map(({ name, title, description, inputSchema }) => ({
    name,
    title,
    description,
    inputSchema,
    annotations: { readOnlyHint: true, openWorldHint: false },
  }));

/** @param {Request} request @param {{ ASSETS: { fetch: (r: Request) => Promise<Response> } }} env */
export async function handleMcp(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST, OPTIONS', ...CORS } });
  }

  let msg;
  try {
    msg = await request.json();
  } catch {
    return fail(null, -32700, 'Parse error');
  }
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return fail(msg?.id, -32600, 'Invalid request');

  // Notifications get no response body.
  if (msg.id === undefined) return new Response(null, { status: 202, headers: CORS });

  const version = request.headers.get('mcp-protocol-version') ?? msg.params?._meta?.protocolVersion;
  if (version && !SUPPORTED.includes(version) && msg.method !== 'initialize') {
    return fail(msg.id, -32602, 'Unsupported protocol version', { supported: SUPPORTED, requested: version });
  }

  switch (msg.method) {
    case 'initialize': {
      const asked = msg.params?.protocolVersion;
      const protocolVersion = SUPPORTED.includes(asked) && asked !== '2026-07-28' ? asked : HANDSHAKE_LATEST;
      return ok(msg.id, { protocolVersion, capabilities: { tools: {} }, serverInfo: SERVER, instructions: INSTRUCTIONS });
    }
    case 'server/discover':
      return ok(msg.id, { supportedVersions: SUPPORTED, capabilities: { tools: {} }, serverInfo: SERVER, instructions: INSTRUCTIONS });
    case 'ping':
      return ok(msg.id, {});
    case 'tools/list':
      return ok(msg.id, { tools: listTools() });
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === msg.params?.name);
      if (!tool) return fail(msg.id, -32602, `Unknown tool: ${msg.params?.name}`);
      try {
        const result = tool.run(await loadData(request, env), msg.params?.arguments ?? {});
        return ok(msg.id, {
          content: [{ type: 'text', text: JSON.stringify(result) }],
          structuredContent: result,
          isError: Boolean(result?.error),
        });
      } catch {
        return ok(msg.id, {
          content: [{ type: 'text', text: JSON.stringify({ error: 'Temporarily unavailable', code: 'unavailable', retryable: true }) }],
          isError: true,
        });
      }
    }
    default:
      return fail(msg.id, -32601, `Method not found: ${msg.method}`);
  }
}

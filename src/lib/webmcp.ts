import { TOOLS, leadResult } from '../../worker/agent-tools.mjs';

/**
 * WebMCP (document.modelContext): the shared tools, plus one helper that opens the
 * quote form. Loaded only in browsers that expose the API (see WebMcp.astro).
 * `send_quote_request` posts to /api/lead, the same endpoint as the form. The form
 * itself is a separate declarative tool, `request_quote`, on LeadForm.
 */
interface ModelContext {
  registerTool: (tool: Record<string, unknown>) => Promise<void> | void;
}
interface AgentTool {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  write?: boolean;
  run?: (data: unknown, args: unknown) => unknown;
  prepare?: (data: unknown, args: unknown) => { error?: string; body?: Record<string, unknown>; sent?: unknown };
}

async function sendLead(prepared: { body?: Record<string, unknown>; sent?: unknown }) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(prepared.body),
  });
  return leadResult(prepared, await res.json().catch(() => null));
}

let data: Promise<unknown> | undefined;
const loadData = () => (data ??= fetch('/data/business.json').then((r) => r.json()));

export function register(context: ModelContext, locale: string, contactPath: string) {
  for (const tool of TOOLS as AgentTool[]) {
    void context.registerTool({
      name: tool.name,
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.write ? { readOnlyHint: false } : { readOnlyHint: true },
      execute: async (args: Record<string, unknown>) => {
        try {
          const input = { language: locale, ...args };
          if (tool.write && tool.prepare) {
            const prepared = tool.prepare(await loadData(), input);
            return JSON.stringify(prepared.error ? prepared : await sendLead(prepared));
          }
          return JSON.stringify(tool.run?.(await loadData(), input));
        } catch {
          return JSON.stringify({ error: 'Temporarily unavailable', code: 'unavailable', retryable: true });
        }
      },
    });
  }

  void context.registerTool({
    name: 'open_quote_form',
    title: 'Open the quote form',
    description:
      'Open the Aerocomfort quote form, optionally pre-filled. Nothing is sent: the person reviews it, accepts the privacy policy and submits it.',
    inputSchema: {
      type: 'object',
      properties: {
        service: { type: 'string', enum: ['installation', 'repair', 'maintenance', 'cleaning', 'other'], description: 'What the person needs.' },
        unit: { type: 'string', description: 'Brand and model, if they want a specific unit.' },
        message: { type: 'string', description: 'A short note describing the request.' },
      },
    },
    execute: async (args: Record<string, string | undefined>) => {
      const url = new URL(contactPath, location.origin);
      for (const key of ['service', 'unit', 'message']) {
        const value = args[key];
        if (value) url.searchParams.set(key, value);
      }
      location.assign(url);
      return JSON.stringify({ opened: url.href });
    },
  });
}

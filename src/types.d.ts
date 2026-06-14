/// <reference types="astro/client" />

// YAML data files imported as plain objects (validated by zod in src/data/index.ts).
declare module '*.yml' {
  const data: unknown;
  export default data;
}
declare module '*.yaml' {
  const data: unknown;
  export default data;
}

// Self-hosted variable fonts imported for their side effects (CSS only).
declare module '@fontsource-variable/*';

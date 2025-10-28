declare module 'tailwindcss' {
  export interface Config {
    content: string[];
    theme?: Record<string, unknown>;
    plugins?: unknown[];
    [key: string]: unknown;
  }
}

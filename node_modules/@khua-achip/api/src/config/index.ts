export interface Env {
  AI_API_KEY?: string;
  CORS_ORIGIN?: string;
  PORT?: string;
}

export function getConfig(env?: Env) {
  return {
    aiApiKey: env?.AI_API_KEY || process.env.AI_API_KEY || '',
    corsOrigin: env?.CORS_ORIGIN || process.env.CORS_ORIGIN || '*',
    port: Number(env?.PORT || process.env.PORT || 8787)
  };
}

import { cors } from 'hono/cors';

export function corsMiddleware() {
  return cors({
    origin: (origin) => {
      // Allow localhost dev origins and deployed origins
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('.pages.dev') || origin.includes('.workers.dev')) {
        return origin || '*';
      }
      return origin;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 86400,
    credentials: true,
  });
}

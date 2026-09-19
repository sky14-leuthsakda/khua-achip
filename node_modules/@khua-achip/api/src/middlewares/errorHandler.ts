import type { Context } from 'hono';

export function errorHandler(err: Error, c: Context) {
  console.error('[API Error]:', err);
  return c.json(
    {
      success: false,
      error: err.message || 'Internal Server Error',
    },
    500
  );
}

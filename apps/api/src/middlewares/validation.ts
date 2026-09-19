import type { Context, Next } from 'hono';

export function validateJsonBody<T extends Record<string, any>>(requiredKeys: (keyof T)[]) {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      for (const key of requiredKeys) {
        if (body[key] === undefined || body[key] === null || (typeof body[key] === 'string' && body[key].trim() === '')) {
          return c.json(
            {
              success: false,
              error: `Missing or invalid required field: ${String(key)}`,
            },
            400
          );
        }
      }
      c.set('validatedBody', body);
      await next();
    } catch {
      return c.json(
        {
          success: false,
          error: 'Invalid JSON request body',
        },
        400
      );
    }
  };
}

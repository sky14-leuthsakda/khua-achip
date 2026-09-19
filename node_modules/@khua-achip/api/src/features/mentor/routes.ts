import { Hono } from 'hono';
import { getMentorReply } from './service';
import type { Env } from '../../config';

export const mentorRouter = new Hono<{ Bindings: Env }>();

mentorRouter.post('/', async (c) => {
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const message = body?.message;
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return c.json({ success: false, error: 'Message cannot be empty' }, 400);
  }

  const context = body?.context || {};
  const reply = await getMentorReply(message, context, c.env);

  return c.json({ success: true, data: reply });
});

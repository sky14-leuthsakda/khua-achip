import { serve } from '@hono/node-server';
import { app } from './main';
import { getConfig } from './config';

const config = getConfig();
const port = config.port;

console.log(`🚀 Khua Achip API server listening on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port
});

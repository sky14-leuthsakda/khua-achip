import { Hono } from 'hono';
import { corsMiddleware } from './middlewares/cors';
import { errorHandler } from './middlewares/errorHandler';
import { careersRouter } from './features/careers/routes';
import { tutorsRouter } from './features/tutors/routes';
import { centersRouter } from './features/centers/routes';
import { scholarshipsRouter } from './features/scholarships/routes';
import { riasecRouter } from './features/riasec/routes';
import { mentorRouter } from './features/mentor/routes';
import type { Env } from './config';

export const app = new Hono<{ Bindings: Env }>();

// Global Middlewares
app.use('*', corsMiddleware());
app.onError(errorHandler);

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    name: 'Khua Achip API',
    status: 'online',
    version: '1.0.0',
    description: 'Career guidance API for Lao youth'
  });
});

app.get('/api/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Feature Routers
app.route('/api/careers', careersRouter);
app.route('/api/tutors', tutorsRouter);
app.route('/api/centers', centersRouter);
app.route('/api/scholarships', scholarshipsRouter);
app.route('/api/riasec', riasecRouter);
app.route('/api/mentor', mentorRouter);

export default app;

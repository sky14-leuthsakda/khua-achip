import { Hono } from 'hono';
import { scholarshipsService } from './service';

export const scholarshipsRouter = new Hono();

scholarshipsRouter.get('/', async (c) => {
  const scholarships = await scholarshipsService.getAll();
  return c.json({ success: true, data: scholarships });
});

scholarshipsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const scholarship = await scholarshipsService.getById(id);
  if (!scholarship) {
    return c.json({ success: false, error: 'Scholarship not found' }, 404);
  }
  return c.json({ success: true, data: scholarship });
});

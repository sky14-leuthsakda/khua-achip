import { Hono } from 'hono';
import { centersService } from './service';

export const centersRouter = new Hono();

centersRouter.get('/', async (c) => {
  const centers = await centersService.getAll();
  return c.json({ success: true, data: centers });
});

centersRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const center = await centersService.getById(id);
  if (!center) {
    return c.json({ success: false, error: 'Center not found' }, 404);
  }
  return c.json({ success: true, data: center });
});

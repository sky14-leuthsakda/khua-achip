import { Hono } from 'hono';
import { careersService } from './service';

export const careersRouter = new Hono();

careersRouter.get('/', async (c) => {
  const careers = await careersService.getAll();
  return c.json({ success: true, data: careers });
});

careersRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const career = await careersService.getById(id);
  if (!career) {
    return c.json({ success: false, error: 'Career not found' }, 404);
  }
  return c.json({ success: true, data: career });
});

import { Hono } from 'hono';
import { tutorsService } from './service';

export const tutorsRouter = new Hono();

tutorsRouter.get('/', async (c) => {
  const tutors = await tutorsService.getAll();
  return c.json({ success: true, data: tutors });
});

tutorsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const tutor = await tutorsService.getById(id);
  if (!tutor) {
    return c.json({ success: false, error: 'Tutor not found' }, 404);
  }
  return c.json({ success: true, data: tutor });
});

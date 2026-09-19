import { Hono } from 'hono';
import { riasecService } from './service';

export const riasecRouter = new Hono();

riasecRouter.get('/questions', (c) => {
  const questions = riasecService.getQuestions();
  return c.json({ success: true, data: questions });
});

riasecRouter.post('/submit', async (c) => {
  let answers: number[] = [];
  try {
    const body = await c.req.json();
    answers = Array.isArray(body?.answers) ? body.answers : [];
  } catch {
    answers = [];
  }

  const result = riasecService.evaluateAnswers(answers);
  return c.json({ success: true, data: result });
});

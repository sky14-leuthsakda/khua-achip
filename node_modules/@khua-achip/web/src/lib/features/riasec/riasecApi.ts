import { apiFetch } from '../../api/client';
import type { RiasecQuestionItem, RiasecEvaluationResult } from './types';

export async function fetchQuestions(): Promise<RiasecQuestionItem[]> {
  return apiFetch<RiasecQuestionItem[]>('/api/riasec/questions');
}

export async function submitAnswers(answers: number[]): Promise<RiasecEvaluationResult> {
  return apiFetch<RiasecEvaluationResult>('/api/riasec/submit', {
    method: 'POST',
    body: JSON.stringify({ answers })
  });
}

import { apiFetch } from '../../api/client';
import type { MentorResponse } from './types';

export async function sendMentorMessage(
  message: string,
  context?: Record<string, any>
): Promise<MentorResponse> {
  return apiFetch<MentorResponse>('/api/mentor', {
    method: 'POST',
    body: JSON.stringify({ message, context })
  });
}

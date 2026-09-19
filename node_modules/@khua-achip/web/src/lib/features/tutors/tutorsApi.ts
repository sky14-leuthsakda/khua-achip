import { apiFetch } from '../../api/client';
import type { Tutor } from './types';

export async function fetchTutors(): Promise<Tutor[]> {
  return apiFetch<Tutor[]>('/api/tutors');
}

export async function fetchTutorById(id: string): Promise<Tutor> {
  return apiFetch<Tutor>(`/api/tutors/${id}`);
}

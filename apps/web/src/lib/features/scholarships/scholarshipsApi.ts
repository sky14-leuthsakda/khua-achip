import { apiFetch } from '../../api/client';
import type { Scholarship } from './types';

export async function fetchScholarships(): Promise<Scholarship[]> {
  return apiFetch<Scholarship[]>('/api/scholarships');
}

export async function fetchScholarshipById(id: string): Promise<Scholarship> {
  return apiFetch<Scholarship>(`/api/scholarships/${id}`);
}

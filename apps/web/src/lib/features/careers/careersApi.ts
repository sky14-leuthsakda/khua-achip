import { apiFetch } from '../../api/client';
import type { Career } from './types';

export async function fetchCareers(): Promise<Career[]> {
  return apiFetch<Career[]>('/api/careers');
}

export async function fetchCareerById(id: string): Promise<Career> {
  return apiFetch<Career>(`/api/careers/${id}`);
}

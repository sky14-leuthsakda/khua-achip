import { apiFetch } from '../../api/client';
import type { Center } from './types';

export async function fetchCenters(): Promise<Center[]> {
  return apiFetch<Center[]>('/api/centers');
}

export async function fetchCenterById(id: string): Promise<Center> {
  return apiFetch<Center>(`/api/centers/${id}`);
}

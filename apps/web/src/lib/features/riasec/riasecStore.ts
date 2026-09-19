import { writable } from 'svelte/store';
import type { RiasecEvaluationResult } from './types';

export const riasecResultStore = writable<RiasecEvaluationResult | null>(null);

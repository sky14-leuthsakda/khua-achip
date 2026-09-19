import type { Career } from '../careers/types';

export interface RiasecQuestionItem {
  id: number;
  text: string;
  dimension: string;
  dimensionKey: string;
}

export interface DimensionScore {
  key: string;
  name: string;
  score: number;
  color: string;
  description: string;
}

export interface RiasecEvaluationResult {
  primaryDimension: DimensionScore;
  dimensions: DimensionScore[];
  matchedCareers: Career[];
}

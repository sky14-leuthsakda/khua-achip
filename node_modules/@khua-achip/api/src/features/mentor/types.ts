export interface MentorRequest {
  message: string;
  context?: Record<string, any>;
}

export interface SuggestedAction {
  type: 'tutor' | 'roadmap' | 'center' | 'scholarship' | 'career';
  label: string;
  targetId?: string;
  meta?: Record<string, any>;
}

export interface MentorResponse {
  reply: string;
  recommendations?: string[];
  suggestedAction?: SuggestedAction;
}

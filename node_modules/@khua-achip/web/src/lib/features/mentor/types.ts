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

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendations?: string[];
  suggestedAction?: SuggestedAction;
  timestamp: string;
}

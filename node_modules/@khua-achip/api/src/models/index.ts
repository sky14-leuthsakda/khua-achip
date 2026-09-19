export interface Career {
  id: string;
  icon: string;
  title: string;
  tag: string;
  match: number;
  what: string;
  edu: string;
  salary: string;
  demand: string;
  skills: string[];
}

export interface Tutor {
  id: string;
  init: string;
  name: string;
  subj: string;
  years: number;
  rating: number;
  students: number;
  price: string;
  mode: string;
}

export interface Center {
  id: string;
  init: string;
  name: string;
  subj: string;
  rating: number;
  loc: string;
  mode: string;
  price: string;
  grad: string;
}

export interface Scholarship {
  id: string;
  name: string;
  country: string;
  level: string;
  funded: string;
  match: number;
  deadline: string;
}

export interface RiasecDimension {
  key: string;
  name: string;
  score: number;
  color: string;
}

export interface MentorReply {
  reply: string;
  recommendations?: string[];
  suggestedAction?: {
    type: 'tutor' | 'roadmap' | 'center' | 'career';
    label: string;
    targetId?: string;
  };
}

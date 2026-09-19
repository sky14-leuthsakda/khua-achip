export interface RoadmapStep {
  year: string;
  title: string;
  desc: string;
  status: 'done' | 'current' | 'upcoming';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  link?: string;
  status: 'completed' | 'in-progress' | 'archived';
}

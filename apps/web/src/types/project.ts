export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  heroImage?: string | null;
  screenshots: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  pressUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  category: string[];
  highlights?: string[];
};

export interface ProjectCardProps extends Pick<
  Project,
  | 'id'
  | 'title'
  | 'description'
  | 'image'
  | 'heroImage'
  | 'technologies'
  | 'githubUrl'
  | 'liveUrl'
  | 'pressUrl'
> {
  status?: Project['status'];
  featured?: boolean;
}

export type ProjectsFilterState = {
  category: string;
  technology: string;
  status: Project['status'] | 'all';
};

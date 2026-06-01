import type { Project } from '@/types/project';
import projectsData from './projects.json' with { type: 'json' };

// projectsData is statically authored JSON; TS widens its literals (e.g. status)
// and can't narrow to Project[], so we assert once at this trusted data boundary.
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
export const projects: Project[] = projectsData as Project[];

// Utility functions for filtering projects
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category.includes(category));
};

export const getProjectsByTechnology = (technology: string): Project[] => {
  if (technology === 'all') {
    return projects;
  }
  return projects.filter((project) =>
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

export const getProjectsByStatus = (
  status: Project['status'] | 'all'
): Project[] => {
  if (status === 'all') {
    return projects;
  }
  return projects.filter((project) => project.status === status);
};

// Get all unique categories and technologies for filters
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  for (const project of projects) {
    for (const cat of project.category) {
      categories.add(cat);
    }
  }
  return Array.from(categories).sort();
};

export const getAllTechnologies = (): string[] => {
  const technologies = new Set<string>();
  for (const project of projects) {
    for (const tech of project.technologies) {
      technologies.add(tech);
    }
  }
  return Array.from(technologies).sort();
};

import { useState } from 'react';
import { ProjectCard } from '@/components/project-card';
import { SelectFilter } from '@/components/ui/select-filter';
import {
  getAllCategories,
  getAllTechnologies,
  projects,
} from '@/data/projects';
import type { ProjectsFilterState } from '@/types/project';

export function Projects() {
  const [filters, setFilters] = useState<ProjectsFilterState>({
    category: 'all',
    technology: 'all',
    status: 'all',
  });

  const categories = getAllCategories();
  const technologies = getAllTechnologies();

  // Apply filters composably - each filter operates on the previous result
  const filteredProjects = projects
    .filter(
      (project) =>
        filters.category === 'all' ||
        project.category.includes(filters.category)
    )
    .filter(
      (project) =>
        filters.technology === 'all' ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(filters.technology.toLowerCase())
        )
    )
    .filter(
      (project) => filters.status === 'all' || project.status === filters.status
    );

  return (
    <section className="relative mt-36">
      {/* Section Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="mb-3 font-bold text-4xl text-white sm:text-5xl md:text-6xl">
          Projects
        </h2>
        <p className="mx-auto max-w-lg text-white/70 text-xl">
          Here are some projects I've worked on
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        {/* Category Filter */}
        <SelectFilter
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          placeholder="All Categories"
          value={filters.category}
        />

        {/* Technology Filter */}
        <SelectFilter
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, technology: e.target.value }))
          }
          options={technologies.map((tech) => ({
            value: tech,
            label: tech,
          }))}
          placeholder="All Technologies"
          value={filters.technology}
        />

        {/* Status Filter */}
        <SelectFilter
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value as ProjectsFilterState['status'],
            }))
          }
          options={[
            { value: 'completed', label: 'Completed' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'archived', label: 'Archived' },
          ]}
          placeholder="All Status"
          value={filters.status}
        />
      </div>

      {/* All Projects */}
      <div className="mx-auto max-w-4xl space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              description={project.description}
              featured={project.featured}
              githubUrl={project.githubUrl}
              heroImage={project.heroImage}
              id={project.id}
              image={project.image}
              key={project.id}
              liveUrl={project.liveUrl}
              pressUrl={project.pressUrl}
              status={project.status}
              technologies={project.technologies}
              title={project.title}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-white/60">
              No projects found matching the selected filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

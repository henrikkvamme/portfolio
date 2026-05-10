import {
  Link,
  createFileRoute,
  notFound,
  useParams,
} from '@tanstack/react-router';
import { ExternalLink, Github, Newspaper } from 'lucide-react';
import { TechPill } from '@/components/tech-pill';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { getStatusColor, getStatusText } from '@/lib/status-utils';

function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export const Route = createFileRoute('/projects/$id')({
  loader: ({ params }) => {
    const project = getProject(params.id);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) {
      return { meta: [{ title: 'Project Not Found' }] };
    }
    return {
      meta: [
        { title: `${project.title} - Henrik Kvamme` },
        { name: 'description', content: project.description },
        { property: 'og:title', content: project.title },
        { property: 'og:description', content: project.description },
        ...(project.heroImage
          ? [{ property: 'og:image', content: project.heroImage }]
          : []),
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { id } = useParams({ from: '/projects/$id' });
  const project = getProject(id);

  if (!project) {
    throw notFound();
  }

  return (
    <div className="mt-24 min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-8 py-12 lg:px-10">
        <div className="mb-16">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-sm ${getStatusColor(project.status)}`}
            >
              {getStatusText(project.status)}
            </span>
            {project.featured && (
              <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 font-medium text-blue-200 text-sm">
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 className="mb-6 font-bold text-4xl text-white md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mb-8 max-w-3xl text-lg text-white/80 leading-relaxed md:text-xl">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild size="lg" variant="glass">
                <a
                  href={project.liveUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="lg" variant="outline">
                <a
                  href={project.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        {project.heroImage && (
          <div className="mb-16">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                alt={`${project.title} screenshot`}
                className="absolute inset-0 h-full w-full object-cover object-top"
                src={project.heroImage}
              />
            </div>
          </div>
        )}

        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {project.highlights && project.highlights.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 font-bold text-3xl text-white">
                  Key Features
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.highlights.map((highlight) => (
                    <div
                      className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                      key={highlight}
                    >
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-theme-primary" />
                      <p className="text-sm text-white/80">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.screenshots.length > 1 && (
              <section className="mb-12">
                <h2 className="mb-6 font-bold text-3xl text-white">
                  Screenshots
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.screenshots.slice(1).map((screenshot, index) => (
                    <div
                      className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5"
                      key={screenshot}
                    >
                      <img
                        alt={`${project.title} screenshot ${index + 2}`}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        loading="lazy"
                        src={screenshot}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 font-semibold text-white text-xl">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechPill key={tech}>{tech}</TechPill>
                ))}
              </div>
            </section>

            <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 font-semibold text-white text-xl">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.category.map((cat) => (
                  <span
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80"
                    key={cat}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 font-semibold text-white text-xl">
                Project Links
              </h3>
              <div className="space-y-3">
                {project.liveUrl && (
                  <Button
                    asChild
                    className="w-full justify-start"
                    variant="glass"
                  >
                    <a
                      href={project.liveUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <a
                      href={project.githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
                {project.pressUrl && (
                  <Button
                    asChild
                    className="w-full justify-start border-blue-400/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
                    variant="outline"
                  >
                    <a
                      href={project.pressUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Newspaper className="mr-2 h-4 w-4" />
                      Press Coverage
                    </a>
                  </Button>
                )}
              </div>
            </section>

            <div className="mt-8">
              <Button asChild variant="ghost">
                <Link to="/">← Back home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

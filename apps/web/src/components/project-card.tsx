import { Link } from '@tanstack/react-router';
import { ExternalLink, Eye, Github, Newspaper, Star } from 'lucide-react';
import { TechPill } from '@/components/tech-pill';
import { TiltCard } from '@/components/tilt-card';
import { Button } from '@/components/ui/button';
import { getStatusStyles, getStatusText } from '@/lib/status-utils';
import type { ProjectCardProps } from '@/types/project';

export function ProjectCard({
  id,
  title,
  description,
  image,
  heroImage,
  technologies,
  githubUrl,
  liveUrl,
  pressUrl,
  status = 'completed',
  featured = false,
}: ProjectCardProps) {
  return (
    <TiltCard
      className={`p-3 sm:p-4 ${featured ? 'ring-1 ring-blue-400/30' : ''}`}
      colSpan={1}
      tiltIntensity="weak"
    >
      <div className="flex flex-col gap-3 sm:gap-3">
        {/* Hero Image */}
        {heroImage && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:aspect-[16/9]">
            <Link to="/projects/$id" params={{ id }}>
              <img
                alt={`${title} screenshot`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform hover:scale-105"
                loading="lazy"
                src={heroImage}
              />
            </Link>
            {featured && (
              <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                <Star className="h-3 w-3" fill="currentColor" />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {/* Fallback Project Icon (only shown if no hero image) */}
          {!heroImage && (
            <div className="flex-shrink-0 self-center sm:self-start">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/20 to-theme-primary/20 sm:h-16 sm:w-16">
                {image ? (
                  <img
                    alt={title}
                    className="h-full w-full rounded-lg object-cover"
                    height={96}
                    loading="lazy"
                    src={image}
                    width={96}
                  />
                ) : (
                  <div className="text-2xl">🚀</div>
                )}
                {featured && (
                  <div className="-top-2 -right-2 absolute flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <Star className="h-3 w-3" fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <div className="flex flex-col">
                <h3 className="text-center font-bold text-base text-white sm:text-left sm:text-lg">
                  {title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getStatusStyles(status)}`}
                  >
                    {getStatusText(status)}
                  </span>
                  {featured && (
                    <span className="inline-flex items-center rounded-full bg-blue-500/20 px-2 py-1 font-medium text-blue-200 text-xs">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-center gap-1.5 sm:ml-3 sm:justify-end">
                <Button asChild size="sm" variant="glass">
                  <Link to="/projects/$id" params={{ id }}>
                    <Eye className="h-3 w-3" />
                    <span className="xs:inline hidden sm:inline">Details</span>
                  </Link>
                </Button>
                {githubUrl && (
                  <Button asChild size="sm" variant="outline">
                    <a
                      aria-label={`View ${title} on GitHub`}
                      href={githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Github className="h-3 w-3" />
                      <span className="xs:inline hidden">GitHub</span>
                    </a>
                  </Button>
                )}
                {liveUrl && (
                  <Button
                    asChild
                    className="border-blue-400/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
                    size="sm"
                    variant="outline"
                  >
                    <a
                      aria-label={`View ${title} live demo`}
                      href={liveUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="xs:inline hidden">Live</span>
                    </a>
                  </Button>
                )}
                {pressUrl && (
                  <Button
                    asChild
                    className="border-purple-400/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20"
                    size="sm"
                    variant="outline"
                  >
                    <a
                      aria-label={`View ${title} press coverage`}
                      href={pressUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Newspaper className="h-3 w-3" />
                      <span className="xs:inline hidden">Press</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <p className="mb-2 text-center text-white/80 text-xs leading-relaxed sm:text-left sm:text-sm">
              {description}
            </p>

            {/* Technology Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {technologies.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

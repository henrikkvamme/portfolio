'use client';

import { useRef } from 'react';
import { TiltCard } from '@/components/tilt-card';

type TechStackCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

type Technology = {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'mobile' | 'ai';
  color: string;
};

const technologies: Technology[] = [
  // Frontend
  {
    name: 'React',
    icon: '⚛️',
    category: 'frontend',
    color: 'from-theme-primary/60 to-theme-primary/80',
  },
  {
    name: 'Next.js',
    icon: '▲',
    category: 'frontend',
    color: 'from-theme-dark/60 to-theme-secondary/80',
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    category: 'frontend',
    color: 'from-theme-primary/50 to-blue-500/60',
  },
  {
    name: 'TailwindCSS',
    icon: '🎨',
    category: 'frontend',
    color: 'from-theme-secondary/60 to-theme-primary/70',
  },
  {
    name: 'HTMX',
    icon: '🔥',
    category: 'frontend',
    color: 'from-orange-400/60 to-theme-secondary/70',
  },
  {
    name: 'Framer Motion',
    icon: '🎭',
    category: 'frontend',
    color: 'from-theme-primary/70 to-pink-500/60',
  },
  {
    name: 'shadcn/ui',
    icon: '🎪',
    category: 'frontend',
    color: 'from-theme-primary/60 to-theme-secondary/80',
  },

  // Backend
  {
    name: 'Node.js',
    icon: '🟢',
    category: 'backend',
    color: 'from-green-400/60 to-theme-primary/60',
  },
  {
    name: 'Rust',
    icon: '🦀',
    category: 'backend',
    color: 'from-orange-600/60 to-theme-secondary/70',
  },
  {
    name: 'Go',
    icon: '🐹',
    category: 'backend',
    color: 'from-cyan-400/60 to-theme-primary/60',
  },
  {
    name: 'Python',
    icon: '🐍',
    category: 'backend',
    color: 'from-yellow-400/60 to-theme-primary/60',
  },
  {
    name: 'Flask',
    icon: '🌶️',
    category: 'backend',
    color: 'from-red-400/60 to-theme-secondary/70',
  },
  {
    name: 'Hono',
    icon: '🔥',
    category: 'backend',
    color: 'from-orange-400/60 to-theme-primary/70',
  },
  {
    name: 'tRPC',
    icon: '🔗',
    category: 'backend',
    color: 'from-blue-400/60 to-theme-secondary/70',
  },
  {
    name: 'gRPC',
    icon: '📡',
    category: 'backend',
    color: 'from-green-500/60 to-theme-primary/60',
  },
  {
    name: 'Protobuf',
    icon: '📦',
    category: 'backend',
    color: 'from-gray-500/60 to-theme-dark/70',
  },
  {
    name: 'Tokio',
    icon: '⚡',
    category: 'backend',
    color: 'from-yellow-400/60 to-theme-secondary/70',
  },
  {
    name: 'Django',
    icon: '🎸',
    category: 'backend',
    color: 'from-green-500/60 to-theme-dark/70',
  },
  {
    name: 'oRPC',
    icon: '🔌',
    category: 'backend',
    color: 'from-blue-400/60 to-theme-primary/70',
  },

  // Database
  {
    name: 'PostgreSQL',
    icon: '🐘',
    category: 'database',
    color: 'from-blue-600/60 to-theme-primary/70',
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    category: 'database',
    color: 'from-green-500/60 to-theme-secondary/70',
  },
  {
    name: 'Prisma',
    icon: '▲',
    category: 'database',
    color: 'from-theme-primary/60 to-theme-secondary/80',
  },
  {
    name: 'Drizzle',
    icon: '💧',
    category: 'database',
    color: 'from-cyan-400/60 to-theme-primary/60',
  },
  {
    name: 'pgvector',
    icon: '🧭',
    category: 'database',
    color: 'from-blue-600/60 to-theme-secondary/70',
  },
  {
    name: 'BigQuery',
    icon: '📊',
    category: 'database',
    color: 'from-blue-500/60 to-theme-primary/70',
  },

  // Mobile
  {
    name: 'Flutter',
    icon: '🐦',
    category: 'mobile',
    color: 'from-blue-400/60 to-theme-primary/70',
  },
  {
    name: 'Dart',
    icon: '🎯',
    category: 'mobile',
    color: 'from-cyan-400/60 to-theme-secondary/70',
  },

  // Tools
  {
    name: 'Docker',
    icon: '🐳',
    category: 'tools',
    color: 'from-blue-500/60 to-theme-primary/70',
  },
  {
    name: 'Puppeteer',
    icon: '🎭',
    category: 'tools',
    color: 'from-green-400/60 to-theme-secondary/70',
  },
  {
    name: 'NextAuth.js',
    icon: '🔐',
    category: 'tools',
    color: 'from-theme-primary/70 to-pink-600/60',
  },
  {
    name: 'jsPDF',
    icon: '📄',
    category: 'tools',
    color: 'from-red-400/60 to-theme-primary/60',
  },
  {
    name: 'Figma',
    icon: '🎨',
    category: 'tools',
    color: 'from-theme-primary/60 to-pink-500/60',
  },
  {
    name: 'Bun',
    icon: '🥟',
    category: 'tools',
    color: 'from-orange-400/60 to-theme-secondary/70',
  },
  {
    name: 'Turbo',
    icon: '⚡',
    category: 'tools',
    color: 'from-blue-400/60 to-theme-primary/70',
  },
  {
    name: 'GCP',
    icon: '☁️',
    category: 'tools',
    color: 'from-blue-500/60 to-theme-secondary/70',
  },
  {
    name: 'GitHub Actions',
    icon: '⚙️',
    category: 'tools',
    color: 'from-gray-500/60 to-theme-dark/70',
  },

  // AI/ML
  {
    name: 'AI/ML',
    icon: '🤖',
    category: 'ai',
    color: 'from-theme-primary/70 to-pink-600/60',
  },
  {
    name: 'yt-dlp',
    icon: '📺',
    category: 'tools',
    color: 'from-red-500/60 to-theme-primary/60',
  },
];

export function TechStackCard({
  colSpan = 2,
  rowSpan = 1,
}: TechStackCardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
  };

  return (
    <TiltCard
      className="flex h-full flex-col p-6"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-1 font-semibold text-lg text-white">Tech Stack</h3>
          <p className="text-sm text-white/60">Technologies I work with</p>
        </div>
        <div className="flex gap-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white"
            onClick={scrollLeft}
            type="button"
          >
            ←
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white"
            onClick={scrollRight}
            type="button"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div
          className="scrollbar-hide flex gap-3 overflow-x-auto pb-2"
          onWheel={handleWheel}
          ref={scrollContainerRef}
        >
          {technologies.map((tech) => (
            <div
              className="group flex min-w-[80px] flex-shrink-0 flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              key={tech.name}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-lg ${tech.color} bg-opacity-20 transition-transform duration-300 group-hover:scale-110`}
              >
                {tech.icon}
              </div>
              <span className="text-center font-medium text-white/80 text-xs leading-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-white/10 border-t pt-3">
        <div className="flex gap-1">
          {[...new Set(technologies.map((t) => t.category))].map((category) => (
            <div
              className="h-1.5 w-1.5 rounded-full bg-white/30"
              key={category}
            />
          ))}
        </div>
        <span className="text-white/40 text-xs">
          Use scroll wheel or arrows
        </span>
      </div>
    </TiltCard>
  );
}

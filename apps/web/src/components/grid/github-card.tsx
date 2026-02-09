import { Github } from 'lucide-react';
import { TiltCard } from '@/components/tilt-card';

type GithubCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function GithubCard({ colSpan = 1, rowSpan = 1 }: GithubCardProps) {
  return (
    <TiltCard
      className="p-6"
      clickable={true}
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
    >
      <a
        className="flex h-full flex-col items-center justify-center text-center transition-colors hover:text-white/90"
        href="https://github.com/henrikkvamme"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Github className="mb-4 h-12 w-12 text-white" />
        <h3 className="mb-2 font-semibold text-lg text-white">GitHub</h3>
        <p className="text-sm text-white/60">
          Check out my open source projects
        </p>
      </a>
    </TiltCard>
  );
}

import { Trophy } from 'lucide-react';
import { TiltCard } from '@/components/tilt-card';

type AwardsCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

type Award = {
  medal: string;
  title: string;
  meta: string;
  detail: string;
};

const awards: Award[] = [
  {
    medal: '🥇',
    title: 'BUILDARENA @ TECHARENA',
    meta: 'Sweden · 2026 · 1st place',
    detail:
      'Hackathon at Scandinavia’s biggest tech event. Built Windshear with an international team.',
  },
  {
    medal: '🥇',
    title: 'StartIT × Tripletex',
    meta: 'NTNU · 2026 · 1st place',
    detail: 'Case competition on AI agents for accounting insights.',
  },
  {
    medal: '🥉',
    title: 'Delta Competition',
    meta: 'Zagreb · 2026 · Finalist',
    detail:
      'Applied mathematics competition focused on AI — solving real-world problems through mathematical innovation.',
  },
];

export function AwardsCard({ colSpan = 2, rowSpan = 1 }: AwardsCardProps) {
  return (
    <TiltCard
      className="p-6"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <div className="mb-5 flex items-center gap-3">
        <Trophy className="h-10 w-10 text-amber-400" />
        <div>
          <h3 className="font-semibold text-lg text-white">Recent Wins</h3>
          <p className="text-sm text-white/70">2026 competitions</p>
        </div>
      </div>

      <ul className="space-y-3">
        {awards.map((award) => (
          <li
            className="rounded-lg border border-white/10 bg-white/5 p-3"
            key={award.title}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">{award.medal}</span>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm text-white">
                  {award.title}
                </h4>
                <p className="text-amber-200/80 text-xs">{award.meta}</p>
                <p className="mt-1 text-white/60 text-xs leading-relaxed">
                  {award.detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </TiltCard>
  );
}

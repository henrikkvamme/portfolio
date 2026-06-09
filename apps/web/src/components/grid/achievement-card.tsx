import { TiltCard } from '@/components/tilt-card';

type AchievementCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function AchievementCard({
  colSpan = 2,
  rowSpan = 1,
}: AchievementCardProps) {
  return (
    <TiltCard
      className="p-8"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <h3 className="mb-2 font-semibold text-sm text-white/70">Background</h3>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="mb-3 text-5xl">🚀</div>
        </div>
        <div className="flex-1">
          <h2 className="mb-2 font-bold text-white text-xl tracking-tight">
            Programming Journey
          </h2>
          <p className="text-white/80 leading-relaxed">
            Programming since age 10 and competing nationally, most recently 1st
            place at BUILDARENA @ TECHARENA (Sweden) and StartIT x Tripletex
            (NTNU) in 2026. From maritime tech to AI accounting platforms,
            focused on shipping real products fast.
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

import { GraduationCap } from 'lucide-react';
import { TiltCard } from '@/components/tilt-card';

type EducationCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function EducationCard({
  colSpan = 1,
  rowSpan = 1,
}: EducationCardProps) {
  return (
    <TiltCard
      className="p-6"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap className="h-10 w-10 text-sky-400" />
            <div>
              <h3 className="font-semibold text-lg text-white">Education</h3>
              <p className="text-sm text-white/70">Computer Science</p>
            </div>
          </div>

          <div className="mb-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm text-white">
                Tsinghua University
              </h4>
              <p className="text-white/60 text-xs">
                Beijing, China · Sep 2025 – Jan 2026
              </p>
              <p className="mt-1 text-white/60 text-xs leading-relaxed">
                Exchange semester in CS — ML, Big Data, Distributed Databases,
                Chinese.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-white">NTNU</h4>
              <p className="text-white/60 text-xs">
                Trondheim, Norway · Aug 2023 – Present
              </p>
              <p className="mt-1 text-white/60 text-xs leading-relaxed">
                B.Sc. Computer Science — Data Structures & Algorithms, OS,
                Database, OOP.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-sky-400/20 bg-sky-500/10 p-3">
          <h4 className="mb-1 font-medium text-sky-200 text-sm">Focus</h4>
          <p className="text-sky-300/80 text-xs">
            Algorithms · Distributed systems · ML
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

import Image from 'next/image';
import { TiltCard } from '@/components/tilt-card';

type ProfileCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function ProfileCard({ colSpan = 1, rowSpan = 1 }: ProfileCardProps) {
  return (
    <TiltCard
      className="flex h-full flex-col items-center justify-center p-6 text-center"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <div className="mb-4">
        <Image
          alt="Henrik Kvamme"
          className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
          height={80}
          priority
          src="/images/profile.jpg"
          width={80}
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg text-white sm:text-xl">
          Henrik Kvamme
        </h3>
        <p className="text-sm text-white/70">Software Developer</p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="text-white/60 text-xs">
            Open to projects & consulting
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

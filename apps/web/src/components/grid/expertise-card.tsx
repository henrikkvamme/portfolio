import { TiltCard } from '@/components/tilt-card';

type ExpertiseCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function ExpertiseCard({
  colSpan = 3,
  rowSpan = 1,
}: ExpertiseCardProps) {
  return (
    <TiltCard
      className="p-8 lg:p-10"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <h3 className="mb-2 font-semibold text-sm text-white/70">
        Let's grab a coffee
      </h3>
      <h2 className="mb-4 font-bold text-2xl text-white tracking-tight sm:text-3xl lg:text-4xl">
        Full-Stack Developer
      </h2>
      <p className="mb-8 max-w-2xl text-white/80 leading-relaxed">
        Computer Science student at NTNU with a competitive programming
        background and hands-on startup experience across modern stacks.
        Currently at OptoScale — always up to chat about side projects,
        consulting, or anything interesting. Coffee's on me.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-1 font-medium text-sm text-white">Frontend</h4>
          <p className="text-white/60 text-xs">React, Next.js, TypeScript</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-1 font-medium text-sm text-white">Backend</h4>
          <p className="text-white/60 text-xs">Rust, Node.js, gRPC</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-1 font-medium text-sm text-white">Modern Tech</h4>
          <p className="text-white/60 text-xs">AI/ML, Web Scraping</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-1 font-medium text-sm text-white">Mobile & More</h4>
          <p className="text-white/60 text-xs">Flutter, PostgreSQL</p>
        </div>
      </div>
    </TiltCard>
  );
}

import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { TiltCard } from '@/components/tilt-card';
import { Button } from '@/components/ui/button';

type ContactCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function ContactCard({ colSpan = 1, rowSpan = 1 }: ContactCardProps) {
  return (
    <TiltCard
      className="flex h-full flex-col justify-center p-8 lg:p-10"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="subtle"
    >
      <div className="text-center">
        <div className="mb-4">
          <MessageCircle className="mx-auto h-12 w-12 text-white/80" />
        </div>
        <h3 className="mb-2 font-semibold text-sm text-white/70">Contact</h3>
        <h2 className="mb-4 font-bold text-white text-xl tracking-tight">
          Get In Touch
        </h2>
        <p className="mb-6 text-sm text-white/80 leading-relaxed">
          Available for part-time work, full-time work in the summer, and
          interesting projects.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full" size="sm" variant="glass">
            <a href="mailto:henrik.halvorsen.kvamme@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
          <Button
            asChild
            className="w-full border-blue-400/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
            size="sm"
            variant="glass"
          >
            <a
              href="https://linkedin.com/in/henrik-kvamme"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button
            asChild
            className="w-full border-gray-400/30 bg-gray-500/10 text-gray-200 hover:bg-gray-500/20"
            size="sm"
            variant="glass"
          >
            <a
              href="https://github.com/henrikkvamme"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </TiltCard>
  );
}

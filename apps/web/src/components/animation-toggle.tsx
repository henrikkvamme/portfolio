import { Zap } from 'lucide-react';
import { useAnimation } from '@/contexts/animation-context';
import CustomSwitch from './custom-switch';

type AnimationToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export default function AnimationToggle({
  className = '',
  showLabel = true,
}: AnimationToggleProps) {
  const { isAnimationEnabled, toggleAnimation } = useAnimation();

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-sm text-white ring-offset-background backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      onClick={toggleAnimation}
      type="button"
    >
      <Zap className="mr-2 h-4 w-4" />
      {showLabel && <span>Animation</span>}
      <CustomSwitch
        checked={isAnimationEnabled}
        className="ml-2"
        onCheckedChange={toggleAnimation}
      />
    </button>
  );
}

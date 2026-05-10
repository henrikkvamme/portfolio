import { useHydrated } from '@tanstack/react-router';
import { motion } from 'motion/react';
import type * as React from 'react';
import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  clickable?: boolean;
  hoverBrightness?: boolean;
  tiltIntensity?: 'none' | 'weak' | 'subtle' | 'normal' | 'strong';
}

export function TiltCard({
  children,
  className,
  tiltMaxAngleX,
  tiltMaxAngleY,
  colSpan = 1,
  rowSpan = 1,
  clickable = false,
  hoverBrightness = false,
  tiltIntensity = 'normal',
  ...props
}: TiltCardProps) {
  // Determine tilt angles based on intensity
  const getTiltAngles = () => {
    if (tiltMaxAngleX !== undefined && tiltMaxAngleY !== undefined) {
      return { x: tiltMaxAngleX, y: tiltMaxAngleY };
    }

    switch (tiltIntensity) {
      case 'none':
        return { x: 0, y: 0 };
      case 'weak':
        return { x: 1, y: 1 };
      case 'subtle':
        return { x: 2, y: 2 };
      case 'normal':
        return { x: 3, y: 3 };
      case 'strong':
        return { x: 5, y: 5 };
      default:
        return { x: 3, y: 3 };
    }
  };

  const { x: tiltX, y: tiltY } = getTiltAngles();
  const hydrated = useHydrated();
  const tiltEnabled = hydrated && (tiltX > 0 || tiltY > 0);

  const SINGLE_COL = 1;
  const DOUBLE_COL = 2;
  const TRIPLE_COL = 3;
  const SINGLE_ROW = 1;
  const DOUBLE_ROW = 2;

  const gridClasses = cn(
    'flex p-px',
    colSpan === SINGLE_COL && 'lg:col-span-1',
    colSpan === DOUBLE_COL && 'lg:col-span-2',
    colSpan === TRIPLE_COL && 'lg:col-span-3',
    rowSpan === SINGLE_ROW && 'min-h-fit',
    rowSpan === DOUBLE_ROW && 'lg:row-span-2 lg:min-h-0'
  );

  const cardClasses = cn(
    'glass-card h-full w-full overflow-hidden transition-all duration-300',
    hoverBrightness && 'hover:bg-white/5',
    clickable && 'cursor-pointer hover:bg-white/5',
    className
  );

  return (
    <motion.div
      className={gridClasses}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-50px' }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {hydrated ? (
        <Tilt
          className="w-full"
          tiltEnable={tiltEnabled}
          tiltMaxAngleX={tiltX}
          tiltMaxAngleY={tiltY}
        >
          <div className={cardClasses} {...props}>
            {children}
          </div>
        </Tilt>
      ) : (
        <div className={cn('w-full', cardClasses)} {...props}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

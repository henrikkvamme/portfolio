import { AnimatePresence, type MotionProps, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type WordRotateProps = {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
};

export function WordRotate({
  words,
  duration = 5000,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="py-4">
      <AnimatePresence mode="wait">
        <motion.h1
          className={cn(className)}
          key={words[index]}
          {...motionProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

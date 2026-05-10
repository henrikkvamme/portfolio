import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AnimationContextType = {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('animationEnabled');
    if (stored !== null) {
      setIsAnimationEnabled(JSON.parse(stored));
    }
  }, []);

  const toggleAnimation = () => {
    setIsAnimationEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem('animationEnabled', JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <AnimationContext.Provider value={{ isAnimationEnabled, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

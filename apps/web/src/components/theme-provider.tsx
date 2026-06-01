import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore storage errors
  }
  return fallback;
}

function resolve(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    if (typeof window === 'undefined') {
      return 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStoredTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolve(theme)
  );

  useEffect(() => {
    const root = document.documentElement;
    const next = resolve(theme);
    setResolvedTheme(next);
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme, storageKey]);

  useEffect(() => {
    if (theme !== 'system') {
      return undefined;
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setResolvedTheme(resolve('system'));
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme: setThemeState }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { useTheme } from '@/components/theme-provider';

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  const style: React.CSSProperties & Record<`--${string}`, string> = {
    '--normal-bg': 'var(--popover)',
    '--normal-text': 'var(--popover-foreground)',
    '--normal-border': 'var(--border)',
  };

  return (
    <Sonner
      className="toaster group"
      style={style}
      theme={resolvedTheme}
      {...props}
    />
  );
};

export { Toaster };

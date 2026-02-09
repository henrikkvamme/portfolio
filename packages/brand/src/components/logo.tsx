import clsx from 'clsx';
import type React from 'react';
import type { LogoProps } from '../types';

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  alt = 'Henrik Kvamme Logo',
  onClick,
  href,
  target = '_self',
  className,
}) => {
  // Size mappings based on original implementation
  const sizeClasses = {
    sm: {
      container: 'gap-2',
      image: 'h-5 w-5 sm:h-6 sm:w-6',
      text: 'text-sm sm:text-base',
    },
    md: {
      container: 'gap-2',
      image: 'h-7 w-7 sm:h-8 sm:w-8',
      text: 'text-lg sm:text-xl',
    },
    lg: {
      container: 'gap-3',
      image: 'h-10 w-10 sm:h-12 sm:w-12',
      text: 'text-xl sm:text-2xl',
    },
    xl: {
      container: 'gap-4',
      image: 'h-12 w-12 sm:h-16 sm:w-16',
      text: 'text-2xl sm:text-3xl',
    },
  };

  const currentSize = sizeClasses[size];
  const logoSrc =
    'https://raw.githubusercontent.com/henrikkvamme/portfolio/main/apps/web/public/images/logo.png';

  const logoContent = (
    <>
      {/* Logo image */}
      <div className="relative">
        {/* biome-ignore lint/performance/noImgElement: Using img for external CDN logo */}
        <img
          alt={alt}
          className={clsx('m-1 object-contain', currentSize.image)}
          height={64}
          src={logoSrc}
          width={64}
        />
      </div>

      {/* Name text */}
      {showText && (
        <div className={clsx('tracking-wide', currentSize.text)}>
          <span className="font-geist-mono font-medium">Henrik Kvamme</span>
        </div>
      )}
    </>
  );

  const baseClasses = clsx(
    'flex items-center',
    currentSize.container,
    className
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a
        className={clsx(baseClasses, 'no-underline')}
        href={href}
        onClick={onClick}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        target={target}
      >
        {logoContent}
      </a>
    );
  }

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button
        className={clsx(
          baseClasses,
          'cursor-pointer border-none bg-transparent'
        )}
        onClick={onClick}
        type="button"
      >
        {logoContent}
      </button>
    );
  }

  // Otherwise render as div
  return <div className={baseClasses}>{logoContent}</div>;
};

export default Logo;

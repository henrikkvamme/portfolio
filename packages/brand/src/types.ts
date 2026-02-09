export type BaseComponentProps = {
  /**
   * Additional CSS class names to apply to the component
   */
  className?: string;
};

export interface LogoProps extends BaseComponentProps {
  /**
   * Size of the logo (affects both image and text)
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether to show the text next to the logo
   * @default true
   */
  showText?: boolean;

  /**
   * Custom alt text for the logo image
   * @default 'Henrik Kvamme Logo'
   */
  alt?: string;

  /**
   * Click handler for the logo
   */
  onClick?: () => void;

  /**
   * Whether the logo should be a link (wraps in anchor tag)
   */
  href?: string;

  /**
   * Target for the link (only used when href is provided)
   * @default '_self'
   */
  target?: string;
}

export type FooterLink = {
  /**
   * The text to display for the link
   */
  label: string;

  /**
   * The URL the link points to
   */
  href: string;

  /**
   * Whether to open link in new tab
   * @default false
   */
  external?: boolean;
};

export interface FooterProps extends BaseComponentProps {
  /**
   * The tagline/description text
   * @default 'Full-Stack Developer & AI Engineer'
   */
  tagline?: string;

  /**
   * Array of links to display in the footer
   */
  links?: FooterLink[];

  /**
   * Whether to show the copyright text
   * @default true
   */
  showCopyright?: boolean;

  /**
   * Custom copyright text (will use current year automatically)
   */
  copyrightText?: string;

  /**
   * Custom copyright holder name
   * @default 'Henrik Kvamme'
   */
  copyrightHolder?: string;

  /**
   * Theme for the footer styling
   * @default 'dark'
   */
  theme?: 'light' | 'dark';

  /**
   * URL to Henrik Kvamme's main website (for linking from other sites)
   * @default 'https://henrikkvamme.no'
   */
  websiteUrl?: string;

  /**
   * Whether to show a link to the main website
   * @default false
   */
  showWebsiteLink?: boolean;
}

export type Theme = 'light' | 'dark' | 'auto';

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
};

/**
 * Default social links for Henrik Kvamme (for use on main portfolio website)
 */
export const DEFAULT_SOCIAL_LINKS: FooterLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/henrikkvamme',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/henrik-kvamme',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/henrikhalvorsenkvamme/',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:henrik.halvorsen.kvamme@gmail.com',
    external: false,
  },
];

/**
 * Minimal social links for external websites (linking back to main portfolio)
 */
export const EXTERNAL_SOCIAL_LINKS: FooterLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/henrikkvamme',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/henrik-kvamme',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:henrik.halvorsen.kvamme@gmail.com',
    external: false,
  },
];

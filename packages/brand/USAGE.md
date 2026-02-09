# Henrik Kvamme Brand Package Usage

This package provides reusable brand components for Henrik Kvamme projects.

## Installation

```bash
bun add @henrikkvamme/brand
# or
npm install @henrikkvamme/brand
```

## Footer Component

The Footer component supports both light and dark themes and can be used across different websites to maintain brand consistency.

### Basic Usage (Dark Theme)

```tsx
import { Footer } from '@henrikkvamme/brand';

function App() {
  return (
    <div>
      {/* Your content */}
      <Footer theme="dark" />
    </div>
  );
}
```

### Light Theme

```tsx
import { Footer } from '@henrikkvamme/brand';

function App() {
  return (
    <div>
      {/* Your content */}
      <Footer theme="light" />
    </div>
  );
}
```

### For External Websites (Links back to portfolio)

```tsx
import { Footer, EXTERNAL_SOCIAL_LINKS } from '@henrikkvamme/brand';

function App() {
  return (
    <div>
      {/* Your content */}
      <Footer
        theme="light"
        links={EXTERNAL_SOCIAL_LINKS}
        showWebsiteLink={true}
        websiteUrl="https://henrikkvamme.no"
        className="mt-16"
      />
    </div>
  );
}
```

### Custom Configuration

```tsx
import { Footer } from '@henrikkvamme/brand';

const customLinks = [
  { label: 'GitHub', href: 'https://github.com/henrikkvamme', external: true },
  { label: 'Email', href: 'mailto:henrik.halvorsen.kvamme@gmail.com', external: false }
];

function App() {
  return (
    <Footer
      theme="dark"
      title="Henrik Kvamme"
      tagline="Full-Stack Developer & AI Engineer"
      links={customLinks}
      showWebsiteLink={true}
      websiteUrl="https://henrikkvamme.no"
      showCopyright={true}
      copyrightHolder="Henrik Kvamme"
    />
  );
}
```

## Logo Component

The Logo component uses a GitHub-hosted image that works across all environments.

```tsx
import { Logo } from '@henrikkvamme/brand';

function Header() {
  return (
    <header>
      <Logo 
        size="md" 
        showText={true} 
        href="/" 
        className="text-white"
      />
    </header>
  );
}
```

**Note:** The logo image is hosted on GitHub for universal compatibility and doesn't require local assets.

## Available Props

### Footer Props

- `theme?: 'light' | 'dark'` - Theme styling (default: 'dark')
- `title?: string` - Main title (default: 'Henrik Kvamme')
- `tagline?: string` - Subtitle text (default: 'Full-Stack Developer & AI Engineer')
- `links?: FooterLink[]` - Social/contact links
- `showWebsiteLink?: boolean` - Show link to main website (default: false)
- `websiteUrl?: string` - URL for website link (default: 'https://henrikkvamme.no')
- `showCopyright?: boolean` - Show copyright text (default: true)
- `copyrightHolder?: string` - Copyright holder name (default: 'Henrik Kvamme')
- `className?: string` - Additional CSS classes

### Logo Props

- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Logo size (default: 'md')
- `showText?: boolean` - Show name text (default: true)
- `href?: string` - Make logo a link
- `onClick?: () => void` - Click handler
- `className?: string` - Additional CSS classes

## Link Sets

- `DEFAULT_SOCIAL_LINKS` - Complete social links (for main portfolio)
- `EXTERNAL_SOCIAL_LINKS` - Minimal links (for external websites)

## Themes

### Light Theme
- Clean gray/white styling
- Perfect for professional websites
- Blue accent for links

### Dark Theme  
- Dark with backdrop blur effects
- Perfect for portfolio/creative sites
- White/blue accents
# @henrikkvamme/brand

[![npm version](https://badge.fury.io/js/@henrikkvamme%2Fbrand.svg)](https://www.npmjs.com/package/@henrikkvamme/brand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Reusable brand elements for Henrik Kvamme projects - logo, footer, and theme components with full dark/light mode support.

## Features

- 🎨 **Theme-aware components** - Automatic dark/light mode support
- 🔤 **Geist Mono font** - Consistent typography using Google Fonts
- 📱 **Responsive design** - Mobile-first responsive components
- 🎯 **TypeScript support** - Full type definitions included
- 🪶 **Lightweight** - Minimal dependencies and optimized bundle
- ♿ **Accessible** - Built with accessibility best practices

## Installation

```bash
npm install @henrikkvamme/brand
# or
yarn add @henrikkvamme/brand
# or
bun add @henrikkvamme/brand
```

## Quick Start

```jsx
import { Logo, Footer } from '@henrikkvamme/brand';

function App() {
  return (
    <div>
      <header>
        <Logo />
      </header>
      
      <main>
        {/* Your content */}
      </main>
      
      <Footer />
    </div>
  );
}
```

## Components

### Logo

A responsive logo component with Henrik's brand identity, featuring automatic theme switching and Geist Mono typography.

#### Basic Usage

```jsx
import { Logo } from '@henrikkvamme/brand';

<Logo />
```

#### Advanced Usage

```jsx
<Logo 
  size="lg"
  showText={true}
  href="/"
  target="_self"
  onClick={() => console.log('Logo clicked')}
  className="custom-logo"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the logo |
| `showText` | `boolean` | `true` | Whether to show "Henrik Kvamme" text |
| `alt` | `string` | `'Henrik Kvamme Logo'` | Alt text for the logo image |
| `onClick` | `() => void` | - | Click handler |
| `href` | `string` | - | Makes logo a link |
| `target` | `string` | `'_self'` | Link target |
| `className` | `string` | - | Additional CSS classes |

#### Size Examples

```jsx
<Logo size="sm" />   {/* Small: 20-24px */}
<Logo size="md" />   {/* Medium: 28-32px (default) */}
<Logo size="lg" />   {/* Large: 40-48px */}
<Logo size="xl" />   {/* Extra Large: 48-64px */}
```

### Footer

A flexible footer component with customizable links and automatic copyright year.

#### Basic Usage

```jsx
import { Footer } from '@henrikkvamme/brand';

<Footer />
```

#### Advanced Usage

```jsx
import { Footer, DEFAULT_SOCIAL_LINKS } from '@henrikkvamme/brand';

const customLinks = [
  { label: 'Blog', href: '/blog', external: false },
  { label: 'Portfolio', href: '/portfolio', external: false },
  ...DEFAULT_SOCIAL_LINKS
];

<Footer 
  title="My Company"
  tagline="Building amazing software"
  links={customLinks}
  showCopyright={true}
  copyrightHolder="My Company Inc."
  className="custom-footer"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Henrik Kvamme'` | Footer title |
| `tagline` | `string` | `'Full-Stack Developer & AI Engineer'` | Subtitle text |
| `links` | `FooterLink[]` | `DEFAULT_SOCIAL_LINKS` | Array of footer links |
| `showCopyright` | `boolean` | `true` | Show copyright text |
| `copyrightText` | `string` | - | Custom copyright text |
| `copyrightHolder` | `string` | `'Henrik Kvamme'` | Copyright holder name |
| `className` | `string` | - | Additional CSS classes |

#### FooterLink Type

```typescript
interface FooterLink {
  label: string;      // Display text
  href: string;       // URL
  external?: boolean; // Opens in new tab if true
}
```

## Theming

The package includes a comprehensive theming system that automatically adapts to your preferred color scheme.

### Theme Detection

The components automatically detect and respond to:
- CSS class `.dark` on any parent element
- `data-theme="dark"` attribute
- System preference (`prefers-color-scheme: dark`)

### CSS Custom Properties

The package defines these CSS custom properties that you can override:

```css
:root {
  /* Brand colors */
  --hk-primary: #804bf2;      /* Vibrant purple */
  --hk-secondary: #4a2b8c;    /* Darker purple */
  --hk-accent: #231640;       /* Darkest purple */
  
  /* Light theme */
  --hk-background: #ffffff;
  --hk-foreground: #000000;
  --hk-text-primary: #000000;
  --hk-text-secondary: rgba(0, 0, 0, 0.6);
  --hk-text-muted: rgba(0, 0, 0, 0.4);
}

[data-theme="dark"], .dark {
  /* Dark theme */
  --hk-background: #000000;
  --hk-foreground: #ffffff;
  --hk-text-primary: #ffffff;
  --hk-text-secondary: rgba(255, 255, 255, 0.6);
  --hk-text-muted: rgba(255, 255, 255, 0.4);
}
```

### Custom Theming

You can override the theme by defining these variables in your CSS:

```css
.my-custom-theme {
  --hk-primary: #ff6b6b;
  --hk-secondary: #4ecdc4;
  --hk-text-primary: #2c3e50;
}
```

### Tailwind CSS Integration

If you're using Tailwind CSS, the components work seamlessly with Tailwind's dark mode:

```jsx
<div className="dark">
  <Logo />
  <Footer />
</div>
```

## Styling

### CSS Classes

The components use these CSS classes that you can style:

#### Logo
- `.hk-logo` - Logo container
- `.hk-logo-image` - Logo image
- `.hk-logo-text` - Logo text
- `.hk-font-mono` - Geist Mono font class

#### Footer
- `.hk-footer` - Footer container
- `.hk-footer-container` - Inner container
- `.hk-footer-content` - Content wrapper
- `.hk-footer-brand` - Brand section
- `.hk-footer-links` - Links container
- `.hk-footer-link` - Individual link
- `.hk-footer-copyright` - Copyright text

### Glass Morphism

The package includes a glass morphism utility class:

```jsx
<div className="hk-glass">
  <Logo />
</div>
```

## TypeScript

Full TypeScript support is included. Import types like this:

```typescript
import { LogoProps, FooterProps, FooterLink } from '@henrikkvamme/brand';
```

## Examples

### Next.js Integration

```jsx
// pages/_app.js or app/layout.js
import '@henrikkvamme/brand/dist/index.css';

// components/Header.jsx
import { Logo } from '@henrikkvamme/brand';

export default function Header() {
  return (
    <header className="p-4">
      <Logo 
        href="/"
        size="md"
        showText={true}
      />
    </header>
  );
}
```

### Custom Footer Links

```jsx
import { Footer } from '@henrikkvamme/brand';

const links = [
  { label: 'Home', href: '/', external: false },
  { label: 'About', href: '/about', external: false },
  { label: 'Contact', href: '/contact', external: false },
  { label: 'GitHub', href: 'https://github.com/henrikkvamme', external: true },
];

<Footer 
  title="Henrik Kvamme"
  tagline="Full-Stack Developer & AI Engineer"
  links={links}
/>
```

### Dark Mode Toggle

```jsx
import { useState } from 'react';
import { Logo, Footer } from '@henrikkvamme/brand';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Theme
      </button>
      <Logo />
      <Footer />
    </div>
  );
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome 70+

## Contributing

Contributions are welcome! Please read the contributing guidelines and submit pull requests to the [repository](https://github.com/henrikkvamme/portfolio).

## License

MIT © [Henrik Kvamme](https://henrikkvamme.dev)

## Support

- 📧 Email: [henrik.halvorsen.kvamme@gmail.com](mailto:henrik.halvorsen.kvamme@gmail.com)
- 🐙 GitHub: [Issues](https://github.com/henrikkvamme/portfolio/issues)
- 🌐 Website: [henrikkvamme.dev](https://henrikkvamme.dev)

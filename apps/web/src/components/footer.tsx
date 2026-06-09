import {
  Footer as BrandFooter,
  DEFAULT_SOCIAL_LINKS,
} from '@henrikkvamme/brand';

export function Footer() {
  return (
    <BrandFooter
      className="mt-20"
      links={DEFAULT_SOCIAL_LINKS}
      tagline="AI Engineer & Full-Stack Developer"
      theme="dark"
    />
  );
}

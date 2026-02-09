'use client';

import {
  ArrowLeft,
  Briefcase,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  Menu,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAVBAR_HEIGHT_OFFSET = 120;
const SCROLL_ANIMATION_DELAY = 300;
const SCROLL_THRESHOLD = 50;

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useAnimation } from '@/contexts/animation-context';
import AnimationToggle from './animation-toggle';
import Logo from './logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAnimationEnabled, toggleAnimation } = useAnimation();
  const pathname = usePathname();

  // Check if we're on a specific project page (not the projects list)
  const isProjectPage =
    pathname?.startsWith('/projects/') && pathname !== '/projects';

  // Smooth scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    // Wait for animations and layout to settle
    const tryScroll = () => {
      const element = document.getElementById(sectionId);
      const mainElement = document.querySelector('main');

      if (element && mainElement) {
        // Force layout recalculation
        element.getBoundingClientRect();

        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - NAVBAR_HEIGHT_OFFSET;

        mainElement.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        // Fallback to regular browser scrolling
        const fallbackElement = document.getElementById(sectionId);
        if (fallbackElement) {
          fallbackElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add delay to ensure animations have loaded and positioned elements correctly
    setTimeout(tryScroll, SCROLL_ANIMATION_DELAY);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Find the main element that contains the scrollable content
      const mainElement = document.querySelector('main');
      if (mainElement) {
        const scrolled = mainElement.scrollTop > SCROLL_THRESHOLD;
        setIsScrolled(scrolled);
      }
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      // Check initial scroll position
      handleScroll();
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header
      className={`mx-auto w-full px-6 transition-all duration-300 lg:px-8 ${
        isScrolled
          ? 'max-w-6xl py-4 md:px-12 lg:px-6 lg:py-8'
          : 'max-w-7xl py-4 lg:py-8'
      }`}
    >
      <div
        className={`glass-navbar w-full py-2 backdrop-blur-sm transition-all duration-300 ${
          isScrolled
            ? 'border-white/20 border-b px-2 sm:px-4 lg:px-5'
            : 'border-transparent border-b px-3 lg:px-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {isProjectPage ? (
            <Link
              className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              href="/#projects"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Projects</span>
            </Link>
          ) : (
            <Link href="/">
              <Logo />
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
            <AnimationToggle />

            <Button onClick={() => scrollToSection('work')} variant="glass">
              <Briefcase className="mr-2 h-4 w-4" />
              Work
            </Button>

            <Button onClick={() => scrollToSection('projects')} variant="glass">
              <FolderOpen className="mr-2 h-4 w-4" />
              Projects
            </Button>

            <Button asChild variant="glass">
              <a href="mailto:henrik.halvorsen.kvamme@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>

            <Button asChild size="icon" variant="glass">
              <a
                aria-label="GitHub"
                href="https://github.com/henrikkvamme"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild size="icon" variant="glass">
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com/in/henrik-kvamme"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Open menu" size="icon" variant="glass">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border border-white/20 bg-black/90 backdrop-blur-sm"
              >
                {isProjectPage && (
                  <DropdownMenuItem asChild>
                    <Link
                      className="flex items-center text-white hover:text-white/80"
                      href="/#projects"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Projects
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4" />
                    Animation
                  </div>
                  <Switch
                    checked={isAnimationEnabled}
                    className="data-[state=checked]:bg-white/20 data-[state=unchecked]:bg-white/10"
                    onCheckedChange={toggleAnimation}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    className="flex items-center text-white hover:text-white/80"
                    href="https://github.com/henrikkvamme"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    className="flex items-center text-white hover:text-white/80"
                    href="https://linkedin.com/in/henrik-kvamme"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-white hover:text-white/80"
                  onClick={() => scrollToSection('work')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Work
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-white hover:text-white/80"
                  onClick={() => scrollToSection('projects')}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Projects
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    className="flex items-center text-white hover:text-white/80"
                    href="mailto:henrik@henrikkvamme.dev"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Navigation component with theme-aware styling and layout
 * Features fixed positioning with scroll-based background changes
 * Includes brutal border system with layered shadows and effects
 * Integrates theme transition animations for navigation elements
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { NavigationLogo } from './NavigationLogo';
import { NavigationMenu } from './NavigationMenu';
import { NavigationCTA } from './NavigationCTA';
import { MobileMenu } from './MobileMenu';
import { MobileMenuToggle } from './MobileMenuToggle';

export interface NavigationProps {
  className?: string;
  children?: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({
  className = '',
  children,
}) => {
  const { currentTheme, isTransitioning, getThemeClass } = useTheme();
  const { scrollY, scrollProgress } = useScrollProgress({ throttleMs: 16 });

  const [isScrolled, setIsScrolled] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll-based background changes
  useEffect(() => {
    const scrollThreshold = 50;
    const maxOpacity = currentTheme === 'extreme-brutalist' ? 0.95 : 0.9;

    setIsScrolled(scrollY > scrollThreshold);

    // Calculate background opacity based on scroll position
    const opacity = Math.min(scrollY / 200, maxOpacity);
    setBackgroundOpacity(opacity);
  }, [scrollY, currentTheme]);

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Generate theme-aware CSS classes
  const navigationClasses = [
    'navigation',
    getThemeClass('navigation'),
    isScrolled && 'navigation--scrolled',
    isTransitioning && 'navigation--transitioning',
    isMobileMenuOpen && 'navigation--mobile-menu-open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Dynamic styles based on theme and scroll
  const navigationStyles = {
    '--nav-bg-opacity': backgroundOpacity,
    '--nav-scroll-progress': scrollProgress,
    '--nav-border-width': currentTheme === 'extreme-brutalist' ? '8px' : '2px',
    '--nav-border-radius': currentTheme === 'extreme-brutalist' ? '0px' : '8px',
    '--nav-shadow':
      currentTheme === 'extreme-brutalist'
        ? '8px 8px 0 var(--color-accent), 16px 16px 0 var(--color-secondary)'
        : '0 10px 30px rgba(0, 0, 0, 0.2)',
  } as React.CSSProperties;

  return (
    <>
      <nav
        className={navigationClasses}
        style={navigationStyles}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Background overlay with scroll-based opacity */}
        <div className="navigation__background" />

        {/* Border effects for brutal styling */}
        <div className="navigation__border-effects">
          <div className="navigation__border-top" />
          <div className="navigation__border-bottom" />
          <div className="navigation__border-accent" />
        </div>

        {/* Main navigation container */}
        <div className="navigation__container">
          {/* Logo */}
          <NavigationLogo />

          {/* Desktop Menu */}
          <div className="navigation__desktop-menu">
            <NavigationMenu />
          </div>

          {/* Desktop CTA */}
          <div className="navigation__desktop-cta">
            <NavigationCTA />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="navigation__mobile-toggle">
            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              onToggle={handleMobileMenuToggle}
            />
          </div>

          {/* Custom children if provided */}
          {children}
        </div>

        {/* Theme transition indicator */}
        {isTransitioning && (
          <div className="navigation__transition-indicator" />
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
    </>
  );
};

/**
 * ScrollThemeProvider - Integrates scroll-based theme detection with theme context
 * Combines useThemeTransition, ThemeDetector, and smooth transitions
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ThemeType } from '@/types/theme';
import { useThemeTransition } from '@/hooks/useThemeTransition';
import { ThemeDetector, ThemeSection } from './ThemeDetector';

export interface ScrollThemeProviderProps {
  children: React.ReactNode;
  sections?: ThemeSection[];
  transitionDuration?: number;
  scrollThreshold?: number;
  onThemeChange?: (theme: ThemeType) => void;
  className?: string;
}

const DEFAULT_SECTIONS: ThemeSection[] = [
  { id: 'navigation', theme: 'extreme-brutalist' },
  { id: 'hero', theme: 'extreme-brutalist' },
  { id: 'social-proof', theme: 'refined-brutalist' },
  { id: 'results', theme: 'refined-brutalist' },
  { id: 'footer', theme: 'refined-brutalist' },
];

export const ScrollThemeProvider: React.FC<ScrollThemeProviderProps> = ({
  children,
  sections = DEFAULT_SECTIONS,
  transitionDuration = 600,
  scrollThreshold = 0.4,
  onThemeChange,
  className = '',
}) => {
  const [currentSection, setCurrentSection] = useState<string>('');

  // Use the theme transition hook with custom configuration
  const {
    currentTheme,
    targetTheme,
    isTransitioning,
    transitionProgress,
    scrollProgress,
  } = useThemeTransition({
    thresholds: [
      { progress: 0, theme: 'extreme-brutalist' },
      { progress: scrollThreshold, theme: 'refined-brutalist' },
    ],
    transitionDuration,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  });

  // Handle theme changes from intersection observer
  const handleThemeChange = useCallback(
    (theme: ThemeType, sectionId: string) => {
      setCurrentSection(sectionId);
      onThemeChange?.(theme);
    },
    [onThemeChange]
  );

  // Apply theme classes to document root
  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove(
      'theme-extreme-brutalist',
      'theme-refined-brutalist',
      'theme-transitioning'
    );

    // Add current theme class
    root.classList.add(`theme-${currentTheme}`);

    // Add transitioning class if in transition
    if (isTransitioning) {
      root.classList.add('theme-transitioning');
    }

    // Set CSS custom properties for transition progress
    root.style.setProperty(
      '--transition-progress',
      transitionProgress.toString()
    );
    root.style.setProperty('--scroll-progress', scrollProgress.toString());
    root.style.setProperty(
      '--theme-transition-duration',
      `${transitionDuration}ms`
    );

    return () => {
      // Cleanup on unmount
      root.classList.remove(
        'theme-extreme-brutalist',
        'theme-refined-brutalist',
        'theme-transitioning'
      );
      root.style.removeProperty('--transition-progress');
      root.style.removeProperty('--scroll-progress');
    };
  }, [
    currentTheme,
    isTransitioning,
    transitionProgress,
    scrollProgress,
    transitionDuration,
  ]);

  return (
    <div
      className={`scroll-theme-provider ${className}`}
      data-current-theme={currentTheme}
      data-target-theme={targetTheme}
      data-is-transitioning={isTransitioning}
      data-current-section={currentSection}
    >
      <ThemeDetector
        sections={sections}
        onThemeChange={handleThemeChange}
        rootMargin="-20% 0px -20% 0px"
        threshold={[0, 0.25, 0.5, 0.75, 1]}
      >
        {children}
      </ThemeDetector>

      {/* Theme transition progress indicator */}
      {isTransitioning && (
        <div
          className="theme-transition-progress"
          style={
            {
              '--transition-progress': transitionProgress,
            } as React.CSSProperties
          }
        />
      )}

      {/* Debug panel in development */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px',
            fontSize: '11px',
            fontFamily: 'monospace',
            borderRadius: '4px',
            zIndex: 9999,
            pointerEvents: 'none',
            minWidth: '200px',
          }}
        >
          <div>
            <strong>Theme Debug</strong>
          </div>
          <div>Current: {currentTheme}</div>
          <div>Target: {targetTheme}</div>
          <div>Section: {currentSection}</div>
          <div>Transitioning: {isTransitioning ? 'Yes' : 'No'}</div>
          <div>Progress: {(transitionProgress * 100).toFixed(1)}%</div>
          <div>Scroll: {(scrollProgress * 100).toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
};

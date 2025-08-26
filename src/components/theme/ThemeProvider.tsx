/**
 * ThemeProvider component with theme switching logic and transition states
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { ThemeType, ThemeConfig } from '@/types/theme';
import { themeConfiguration } from '@/data/theme-config';
import { getInitialTheme, setStoredTheme } from '@/utils/theme-persistence';

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    // Use provided initial theme or get from storage/fallback
    return initialTheme || getInitialTheme('extreme-brutalist');
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Get current theme configuration
  const config: ThemeConfig = useMemo(() => {
    return currentTheme === 'extreme-brutalist'
      ? themeConfiguration.extreme
      : themeConfiguration.refined;
  }, [currentTheme]);

  // Theme switching function with transition handling
  const setTheme = useCallback(
    (newTheme: ThemeType) => {
      if (newTheme === currentTheme || isTransitioning) {
        return;
      }

      setIsTransitioning(true);
      setTransitionProgress(0);

      // Animate transition progress
      const startTime = Date.now();
      const duration = 600; // 600ms transition duration

      const animateTransition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setTransitionProgress(progress);

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        } else {
          // Transition complete
          setCurrentTheme(newTheme);
          setIsTransitioning(false);
          setTransitionProgress(0);

          // Persist theme to localStorage
          setStoredTheme(newTheme);
        }
      };

      requestAnimationFrame(animateTransition);
    },
    [currentTheme, isTransitioning]
  );

  // Apply CSS custom properties for theme
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const themeConfig = config;

    // Set CSS custom properties
    root.style.setProperty('--theme-bg', themeConfig.colors.bg);
    root.style.setProperty('--theme-text', themeConfig.colors.text);
    root.style.setProperty('--theme-primary', themeConfig.colors.primary);
    root.style.setProperty('--theme-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--theme-accent', themeConfig.colors.accent);
    root.style.setProperty('--theme-highlight', themeConfig.colors.highlight);
    root.style.setProperty('--theme-success', themeConfig.colors.success);

    root.style.setProperty(
      '--theme-font-primary',
      themeConfig.typography.primary
    );
    root.style.setProperty('--theme-font-code', themeConfig.typography.code);

    root.style.setProperty('--theme-border-width', themeConfig.borders.width);
    root.style.setProperty('--theme-border-style', themeConfig.borders.style);
    root.style.setProperty('--theme-border-radius', themeConfig.borders.radius);

    root.style.setProperty(
      '--theme-animation-duration',
      themeConfig.animations.duration
    );
    root.style.setProperty(
      '--theme-animation-easing',
      themeConfig.animations.easing
    );

    // Set shadow variables
    if (themeConfig.shadows.brutal) {
      root.style.setProperty(
        '--theme-shadow-brutal',
        themeConfig.shadows.brutal
      );
    }
    if (themeConfig.shadows.subtle) {
      root.style.setProperty(
        '--theme-shadow-subtle',
        themeConfig.shadows.subtle
      );
    }
    if (themeConfig.shadows.double) {
      root.style.setProperty(
        '--theme-shadow-double',
        themeConfig.shadows.double
      );
    }
    if (themeConfig.shadows.triple) {
      root.style.setProperty(
        '--theme-shadow-triple',
        themeConfig.shadows.triple
      );
    }
    if (themeConfig.shadows.elevated) {
      root.style.setProperty(
        '--theme-shadow-elevated',
        themeConfig.shadows.elevated
      );
    }
    if (themeConfig.shadows.glow) {
      root.style.setProperty('--theme-shadow-glow', themeConfig.shadows.glow);
    }

    // Add theme class to body
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add(`theme-${currentTheme}`);

    // Add transition class during transitions
    if (isTransitioning) {
      document.body.classList.add('theme-transitioning');
    } else {
      document.body.classList.remove('theme-transitioning');
    }
  }, [config, currentTheme, isTransitioning]);

  // Context value
  const contextValue = useMemo(
    () => ({
      currentTheme,
      isTransitioning,
      transitionProgress,
      setTheme,
      config,
    }),
    [currentTheme, isTransitioning, transitionProgress, setTheme, config]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

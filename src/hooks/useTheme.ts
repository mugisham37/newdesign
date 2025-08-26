/**
 * useTheme hook for accessing current theme state and configuration
 * Provides easy access to theme context with additional utilities
 */

'use client';

import { useContext, useMemo, useCallback } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { ThemeType, ThemeConfig } from '@/types/theme';

export interface UseThemeReturn {
  // Core theme state
  currentTheme: ThemeType;
  isTransitioning: boolean;
  transitionProgress: number;
  config: ThemeConfig;
  setTheme: (theme: ThemeType) => void;

  // Utility functions
  isExtreme: boolean;
  isRefined: boolean;
  toggleTheme: () => void;

  // CSS utilities
  getThemeClass: (baseClass?: string) => string;
  getThemeStyles: () => React.CSSProperties;

  // Color utilities
  colors: ThemeConfig['colors'];
  typography: ThemeConfig['typography'];
  borders: ThemeConfig['borders'];
  shadows: ThemeConfig['shadows'];
  animations: ThemeConfig['animations'];
}

/**
 * Hook to access theme context with additional utilities
 */
export const useTheme = (): UseThemeReturn => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const {
    currentTheme,
    isTransitioning,
    transitionProgress,
    config,
    setTheme,
  } = context;

  // Computed values
  const isExtreme = currentTheme === 'extreme-brutalist';
  const isRefined = currentTheme === 'refined-brutalist';

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    const newTheme: ThemeType = isExtreme
      ? 'refined-brutalist'
      : 'extreme-brutalist';
    setTheme(newTheme);
  }, [isExtreme, setTheme]);

  // Generate theme-aware CSS class names
  const getThemeClass = useCallback(
    (baseClass?: string): string => {
      const themeClass = `theme-${currentTheme}`;
      const transitionClass = isTransitioning ? 'theme-transitioning' : '';

      if (baseClass) {
        return `${baseClass} ${baseClass}--${currentTheme} ${themeClass} ${transitionClass}`.trim();
      }

      return `${themeClass} ${transitionClass}`.trim();
    },
    [currentTheme, isTransitioning]
  );

  // Generate theme-aware inline styles
  const getThemeStyles = useCallback((): React.CSSProperties => {
    return {
      '--theme-bg': config.colors.bg,
      '--theme-text': config.colors.text,
      '--theme-primary': config.colors.primary,
      '--theme-secondary': config.colors.secondary,
      '--theme-accent': config.colors.accent,
      '--theme-highlight': config.colors.highlight,
      '--theme-success': config.colors.success,
      '--theme-font-primary': config.typography.primary,
      '--theme-font-code': config.typography.code,
      '--theme-border-width': config.borders.width,
      '--theme-border-style': config.borders.style,
      '--theme-border-radius': config.borders.radius,
      '--theme-animation-duration': config.animations.duration,
      '--theme-animation-easing': config.animations.easing,
      '--theme-shadow-brutal': config.shadows.brutal || '',
      '--theme-shadow-subtle': config.shadows.subtle || '',
      '--theme-transition-progress': transitionProgress.toString(),
    } as React.CSSProperties;
  }, [config, transitionProgress]);

  // Destructured config for easy access
  const { colors, typography, borders, shadows, animations } = config;

  return useMemo(
    () => ({
      // Core theme state
      currentTheme,
      isTransitioning,
      transitionProgress,
      config,
      setTheme,

      // Utility functions
      isExtreme,
      isRefined,
      toggleTheme,

      // CSS utilities
      getThemeClass,
      getThemeStyles,

      // Config shortcuts
      colors,
      typography,
      borders,
      shadows,
      animations,
    }),
    [
      currentTheme,
      isTransitioning,
      transitionProgress,
      config,
      setTheme,
      isExtreme,
      isRefined,
      getThemeClass,
      getThemeStyles,
      toggleTheme,
      colors,
      typography,
      borders,
      shadows,
      animations,
    ]
  );
};

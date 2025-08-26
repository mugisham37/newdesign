/**
 * Theme-aware CSS-in-JS utilities for dynamic styling
 * Provides utilities for creating theme-aware styles and CSS variables
 */

import { ThemeType, ThemeConfig } from '@/types/theme';
import { themeConfiguration } from '@/data/theme-config';

export type StyleValue = string | number | undefined;
export type StyleObject = Record<string, StyleValue>;
export type ThemeStyleFunction<T = StyleObject> = (
  config: ThemeConfig,
  theme: ThemeType
) => T;

/**
 * Create theme-aware styles based on current theme configuration
 */
export function createThemeStyles<T = StyleObject>(
  styleFunction: ThemeStyleFunction<T>,
  theme: ThemeType = 'extreme-brutalist'
): T {
  const config =
    theme === 'extreme-brutalist'
      ? themeConfiguration.extreme
      : themeConfiguration.refined;

  return styleFunction(config, theme);
}

/**
 * Generate CSS custom properties object from theme configuration
 */
export function createThemeVariables(
  config: ThemeConfig,
  prefix: string = '--theme'
): Record<string, string> {
  const variables: Record<string, string> = {};

  // Color variables
  Object.entries(config.colors).forEach(([key, value]) => {
    variables[`${prefix}-${key}`] = value;
  });

  // Typography variables
  variables[`${prefix}-font-primary`] = config.typography.primary;
  variables[`${prefix}-font-code`] = config.typography.code;

  Object.entries(config.typography.sizes).forEach(([key, value]) => {
    variables[`${prefix}-text-${key}`] = value;
  });

  // Border variables
  variables[`${prefix}-border-width`] = config.borders.width;
  variables[`${prefix}-border-style`] = config.borders.style;
  variables[`${prefix}-border-radius`] = config.borders.radius;

  // Shadow variables
  Object.entries(config.shadows).forEach(([key, value]) => {
    if (value) {
      variables[`${prefix}-shadow-${key}`] = value;
    }
  });

  // Animation variables
  Object.entries(config.animations).forEach(([key, value]) => {
    if (value) {
      variables[`${prefix}-animation-${key}`] = value;
    }
  });

  return variables;
}

/**
 * Create responsive theme styles with breakpoints
 */
export interface ResponsiveThemeStyles {
  mobile: StyleObject;
  tablet: StyleObject;
  desktop: StyleObject;
}

export function createResponsiveThemeStyles(
  styleFunction: ThemeStyleFunction<ResponsiveThemeStyles>,
  theme: ThemeType = 'extreme-brutalist'
): ResponsiveThemeStyles {
  return createThemeStyles(styleFunction, theme);
}

/**
 * Utility functions for common theme-aware style patterns
 */
export const themeStyleUtils = {
  /**
   * Create brutal border style
   */
  brutalBorder: (config: ThemeConfig, color?: string): StyleObject => ({
    border: `${config.borders.width} ${config.borders.style} ${color || config.colors.text}`,
    borderRadius: config.borders.radius,
  }),

  /**
   * Create brutal shadow effect
   */
  brutalShadow: (
    config: ThemeConfig,
    shadowType: keyof ThemeConfig['shadows'] = 'brutal'
  ): StyleObject => ({
    boxShadow: config.shadows[shadowType] || config.shadows.brutal || 'none',
  }),

  /**
   * Create theme-aware text styles
   */
  themeText: (
    config: ThemeConfig,
    size: keyof ThemeConfig['typography']['sizes'] = 'base'
  ): StyleObject => ({
    fontFamily: config.typography.primary,
    fontSize: config.typography.sizes[size],
    color: config.colors.text,
  }),

  /**
   * Create theme-aware code text styles
   */
  themeCodeText: (
    config: ThemeConfig,
    size: keyof ThemeConfig['typography']['sizes'] = 'base'
  ): StyleObject => ({
    fontFamily: config.typography.code,
    fontSize: config.typography.sizes[size],
    color: config.colors.text,
  }),

  /**
   * Create theme-aware background styles
   */
  themeBackground: (
    config: ThemeConfig,
    variant: 'primary' | 'secondary' | 'accent' = 'primary'
  ): StyleObject => {
    const colorMap = {
      primary: config.colors.bg,
      secondary: config.colors.secondary,
      accent: config.colors.accent,
    };

    return {
      backgroundColor: colorMap[variant],
      color: variant === 'accent' ? config.colors.bg : config.colors.text,
    };
  },

  /**
   * Create theme-aware button styles
   */
  themeButton: (
    config: ThemeConfig,
    variant: 'primary' | 'secondary' | 'ghost' = 'primary'
  ): StyleObject => {
    const baseStyles: StyleObject = {
      fontFamily: config.typography.primary,
      fontSize: config.typography.sizes.base,
      border: `${config.borders.width} ${config.borders.style} ${config.colors.text}`,
      borderRadius: config.borders.radius,
      transition: `all ${config.animations.duration} ${config.animations.easing}`,
      cursor: 'pointer',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: config.colors.accent,
          color: config.colors.bg,
          boxShadow: config.shadows.brutal || config.shadows.subtle || 'none',
        };

      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: config.colors.bg,
          color: config.colors.text,
          boxShadow: config.shadows.subtle || 'none',
        };

      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: config.colors.text,
        };

      default:
        return baseStyles;
    }
  },

  /**
   * Create theme-aware card styles
   */
  themeCard: (config: ThemeConfig, elevated: boolean = false): StyleObject => ({
    backgroundColor: config.colors.bg,
    color: config.colors.text,
    border: `${config.borders.width} ${config.borders.style} ${config.colors.text}`,
    borderRadius: config.borders.radius,
    boxShadow: elevated
      ? config.shadows.elevated ||
        config.shadows.brutal ||
        config.shadows.subtle ||
        'none'
      : config.shadows.subtle || 'none',
  }),

  /**
   * Create theme-aware input styles
   */
  themeInput: (config: ThemeConfig): StyleObject => ({
    fontFamily: config.typography.primary,
    fontSize: config.typography.sizes.base,
    backgroundColor: config.colors.bg,
    color: config.colors.text,
    border: `${config.borders.width} ${config.borders.style} ${config.colors.text}`,
    borderRadius: config.borders.radius,
    transition: `all ${config.animations.duration} ${config.animations.easing}`,
  }),
};

/**
 * Create theme-aware animation styles
 */
export function createThemeAnimation(
  config: ThemeConfig,
  animationType: keyof ThemeConfig['animations'],
  customProperties?: StyleObject
): StyleObject {
  const animation = config.animations[animationType];

  if (!animation) {
    return customProperties || {};
  }

  return {
    animation,
    ...customProperties,
  };
}

/**
 * Merge multiple theme style objects
 */
export function mergeThemeStyles(
  ...styles: (StyleObject | undefined)[]
): StyleObject {
  return styles.reduce<StyleObject>((merged, style) => {
    if (!style) return merged;
    return { ...merged, ...style };
  }, {});
}

/**
 * Create conditional theme styles
 */
export function conditionalThemeStyles(
  condition: boolean,
  trueStyles: StyleObject,
  falseStyles: StyleObject = {}
): StyleObject {
  return condition ? trueStyles : falseStyles;
}

/**
 * Create theme-aware CSS string for styled-components or similar
 */
export function createThemeCSS(
  styleFunction: ThemeStyleFunction<string>,
  theme: ThemeType = 'extreme-brutalist'
): string {
  return createThemeStyles(styleFunction, theme);
}

/**
 * Helper to convert style object to CSS custom properties
 */
export function stylesToCSSProperties(
  styles: StyleObject
): React.CSSProperties {
  const cssProperties: React.CSSProperties = {};

  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined) {
      // Convert camelCase to kebab-case for CSS properties
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      (cssProperties as any)[cssKey] = value;
    }
  });

  return cssProperties;
}

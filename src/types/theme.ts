/**
 * Theme system type definitions for the brutalist portfolio
 */

export type ThemeType = 'extreme-brutalist' | 'refined-brutalist';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  success: string;
  bg: string;
  text: string;
}

export interface ThemeTypography {
  primary: string;
  code: string;
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
}

export interface ThemeBorders {
  width: string;
  style: string;
  radius: string;
}

export interface ThemeShadows {
  brutal?: string;
  subtle?: string;
  double?: string;
  triple?: string;
  elevated?: string;
  glow?: string;
}

export interface ThemeAnimations {
  duration: string;
  easing: string;
  glitch?: string;
  pulse?: string;
  smooth?: string;
  float?: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  typography: ThemeTypography;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  animations: ThemeAnimations;
}

export interface ThemeConfiguration {
  extreme: ThemeConfig;
  refined: ThemeConfig;
}

export interface ThemeContextType {
  currentTheme: ThemeType;
  isTransitioning: boolean;
  transitionProgress: number;
  setTheme: (theme: ThemeType) => void;
  config: ThemeConfig;
}

export interface UseThemeTransitionOptions {
  thresholds: Array<{
    progress: number;
    theme: ThemeType;
  }>;
  transitionDuration: number;
  easing: string;
}

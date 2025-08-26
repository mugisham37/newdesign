/**
 * Theme persistence utilities with SSR compatibility
 */

import { ThemeType } from '@/types/theme';

const THEME_STORAGE_KEY = 'brutalist-portfolio-theme';

/**
 * Get theme from localStorage with SSR safety
 */
export const getStoredTheme = (): ThemeType | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (
      stored &&
      (stored === 'extreme-brutalist' || stored === 'refined-brutalist')
    ) {
      return stored as ThemeType;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  return null;
};

/**
 * Store theme in localStorage
 */
export const setStoredTheme = (theme: ThemeType): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
};

/**
 * Remove theme from localStorage
 */
export const removeStoredTheme = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to remove theme from localStorage:', error);
  }
};

/**
 * Get initial theme with fallback
 */
export const getInitialTheme = (
  fallback: ThemeType = 'extreme-brutalist'
): ThemeType => {
  const stored = getStoredTheme();
  return stored || fallback;
};

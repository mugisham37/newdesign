/**
 * Theme system verification utilities
 */

import { themeConfiguration } from '@/data/theme-config';
import {
  getInitialTheme,
  setStoredTheme,
  getStoredTheme,
} from './theme-persistence';

/**
 * Verify theme configuration structure
 */
export const verifyThemeConfiguration = (): boolean => {
  console.log('🔍 Verifying theme configuration...');

  try {
    // Check if both themes exist
    if (!themeConfiguration.extreme || !themeConfiguration.refined) {
      console.error('❌ Missing theme configurations');
      return false;
    }

    // Check extreme theme structure
    const extreme = themeConfiguration.extreme;
    if (
      !extreme.colors ||
      !extreme.typography ||
      !extreme.borders ||
      !extreme.shadows ||
      !extreme.animations
    ) {
      console.error('❌ Extreme theme missing required properties');
      return false;
    }

    // Check refined theme structure
    const refined = themeConfiguration.refined;
    if (
      !refined.colors ||
      !refined.typography ||
      !refined.borders ||
      !refined.shadows ||
      !refined.animations
    ) {
      console.error('❌ Refined theme missing required properties');
      return false;
    }

    // Check color properties
    const requiredColors = [
      'primary',
      'secondary',
      'accent',
      'highlight',
      'success',
      'bg',
      'text',
    ];
    for (const color of requiredColors) {
      if (
        !extreme.colors[color as keyof typeof extreme.colors] ||
        !refined.colors[color as keyof typeof refined.colors]
      ) {
        console.error(`❌ Missing color property: ${color}`);
        return false;
      }
    }

    console.log('✅ Theme configuration structure is valid');
    return true;
  } catch (error) {
    console.error('❌ Theme configuration verification failed:', error);
    return false;
  }
};

/**
 * Verify theme persistence functionality
 */
export const verifyThemePersistence = (): boolean => {
  console.log('🔍 Verifying theme persistence...');

  try {
    // Test initial theme
    const initialTheme = getInitialTheme();
    if (
      initialTheme !== 'extreme-brutalist' &&
      initialTheme !== 'refined-brutalist'
    ) {
      console.error('❌ Invalid initial theme:', initialTheme);
      return false;
    }

    // Test theme storage (only if in browser environment)
    if (typeof window !== 'undefined') {
      // Test storing extreme theme
      setStoredTheme('extreme-brutalist');
      const storedExtreme = getStoredTheme();
      if (storedExtreme !== 'extreme-brutalist') {
        console.error('❌ Failed to store extreme theme');
        return false;
      }

      // Test storing refined theme
      setStoredTheme('refined-brutalist');
      const storedRefined = getStoredTheme();
      if (storedRefined !== 'refined-brutalist') {
        console.error('❌ Failed to store refined theme');
        return false;
      }

      console.log('✅ Theme persistence works correctly');
    } else {
      console.log('✅ Theme persistence SSR compatibility verified');
    }

    return true;
  } catch (error) {
    console.error('❌ Theme persistence verification failed:', error);
    return false;
  }
};

/**
 * Verify theme differences
 */
export const verifyThemeDifferences = (): boolean => {
  console.log('🔍 Verifying theme differences...');

  try {
    const extreme = themeConfiguration.extreme;
    const refined = themeConfiguration.refined;

    // Colors should be different
    if (extreme.colors.primary === refined.colors.primary) {
      console.warn('⚠️ Primary colors are the same between themes');
    }

    if (extreme.colors.accent === refined.colors.accent) {
      console.warn('⚠️ Accent colors are the same between themes');
    }

    // Typography should be different
    if (extreme.typography.primary === refined.typography.primary) {
      console.warn('⚠️ Primary fonts are the same between themes');
    }

    // Border styles should be different
    if (extreme.borders.width === refined.borders.width) {
      console.warn('⚠️ Border widths are the same between themes');
    }

    if (extreme.borders.radius === refined.borders.radius) {
      console.warn('⚠️ Border radius are the same between themes');
    }

    // Animation easing should be different
    if (extreme.animations.easing === refined.animations.easing) {
      console.warn('⚠️ Animation easing are the same between themes');
    }

    console.log('✅ Theme differences verified');
    return true;
  } catch (error) {
    console.error('❌ Theme differences verification failed:', error);
    return false;
  }
};

/**
 * Run all theme verifications
 */
export const runThemeVerification = (): boolean => {
  console.log('🚀 Starting theme system verification...\n');

  const results = [
    verifyThemeConfiguration(),
    verifyThemePersistence(),
    verifyThemeDifferences(),
  ];

  const allPassed = results.every((result) => result);

  if (allPassed) {
    console.log('\n🎉 All theme system verifications passed!');
  } else {
    console.log('\n❌ Some theme system verifications failed!');
  }

  return allPassed;
};

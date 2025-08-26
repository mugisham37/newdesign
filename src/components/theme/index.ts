/**
 * Barrel export for theme components and utilities
 */

// Core theme components
export { ThemeProvider } from './ThemeProvider';
export {
  ThemeRenderer,
  ConditionalThemeRenderer,
  ThemeWrapper,
  withThemeRenderer,
} from './ThemeRenderer';

// Higher-order components
export {
  withTheme,
  withThemeColors,
  withThemeConfig,
  withThemeUtils,
  createThemedComponent,
} from './withTheme';

// Type exports
export type {
  ThemeRenderProps,
  ThemeRendererProps,
  ConditionalThemeRendererProps,
  ThemeWrapperProps,
} from './ThemeRenderer';

export type {
  WithThemeProps,
  WithThemeOptions,
  WithThemeColorsProps,
  WithThemeConfigProps,
  WithThemeUtilsProps,
} from './withTheme';

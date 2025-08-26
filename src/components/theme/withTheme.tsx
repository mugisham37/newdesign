/**
 * withTheme Higher-Order Component for automatic theme injection
 * Provides theme context as props to wrapped components
 */

'use client';

import React from 'react';
import { useTheme, UseThemeReturn } from '@/hooks/useTheme';

export interface WithThemeProps {
  theme: UseThemeReturn;
}

export interface WithThemeOptions {
  // Whether to forward the theme prop even if component already has theme context
  forwardTheme?: boolean;
  // Custom display name for the wrapped component
  displayName?: string;
  // Whether to memoize the wrapped component
  memo?: boolean;
}

/**
 * Higher-Order Component that injects theme context as props
 */
export function withTheme<P extends object>(
  WrappedComponent: React.ComponentType<P & WithThemeProps>,
  options: WithThemeOptions = {}
) {
  const { forwardTheme = true, displayName, memo = false } = options;

  const WithThemeComponent = React.forwardRef<any, P>((props, ref) => {
    const themeContext = useTheme();

    const enhancedProps = {
      ...props,
      ...(forwardTheme && { theme: themeContext }),
      ref,
    } as P & WithThemeProps & { ref: any };

    return <WrappedComponent {...enhancedProps} />;
  });

  // Set display name for debugging
  const componentName =
    displayName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  WithThemeComponent.displayName = `withTheme(${componentName})`;

  // Optionally memoize the component
  return memo ? React.memo(WithThemeComponent) : WithThemeComponent;
}

/**
 * Specialized HOC for components that only need specific theme properties
 */
export interface WithThemeColorsProps {
  colors: UseThemeReturn['colors'];
}

export function withThemeColors<P extends object>(
  WrappedComponent: React.ComponentType<P & WithThemeColorsProps>,
  options: Omit<WithThemeOptions, 'forwardTheme'> = {}
) {
  const WithThemeColorsComponent = React.forwardRef<any, P>((props, ref) => {
    const { colors } = useTheme();

    const enhancedProps = {
      ...props,
      colors,
      ref,
    } as P & WithThemeColorsProps & { ref: any };

    return <WrappedComponent {...enhancedProps} />;
  });

  const componentName =
    options.displayName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  WithThemeColorsComponent.displayName = `withThemeColors(${componentName})`;

  return options.memo
    ? React.memo(WithThemeColorsComponent)
    : WithThemeColorsComponent;
}

/**
 * Specialized HOC for components that only need theme configuration
 */
export interface WithThemeConfigProps {
  config: UseThemeReturn['config'];
  currentTheme: UseThemeReturn['currentTheme'];
}

export function withThemeConfig<P extends object>(
  WrappedComponent: React.ComponentType<P & WithThemeConfigProps>,
  options: Omit<WithThemeOptions, 'forwardTheme'> = {}
) {
  const WithThemeConfigComponent = React.forwardRef<any, P>((props, ref) => {
    const { config, currentTheme } = useTheme();

    const enhancedProps = {
      ...props,
      config,
      currentTheme,
      ref,
    } as P & WithThemeConfigProps & { ref: any };

    return <WrappedComponent {...enhancedProps} />;
  });

  const componentName =
    options.displayName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  WithThemeConfigComponent.displayName = `withThemeConfig(${componentName})`;

  return options.memo
    ? React.memo(WithThemeConfigComponent)
    : WithThemeConfigComponent;
}

/**
 * Specialized HOC for components that need theme utilities
 */
export interface WithThemeUtilsProps {
  getThemeClass: UseThemeReturn['getThemeClass'];
  getThemeStyles: UseThemeReturn['getThemeStyles'];
  isExtreme: UseThemeReturn['isExtreme'];
  isRefined: UseThemeReturn['isRefined'];
  toggleTheme: UseThemeReturn['toggleTheme'];
}

export function withThemeUtils<P extends object>(
  WrappedComponent: React.ComponentType<P & WithThemeUtilsProps>,
  options: Omit<WithThemeOptions, 'forwardTheme'> = {}
) {
  const WithThemeUtilsComponent = React.forwardRef<any, P>((props, ref) => {
    const { getThemeClass, getThemeStyles, isExtreme, isRefined, toggleTheme } =
      useTheme();

    const enhancedProps = {
      ...props,
      getThemeClass,
      getThemeStyles,
      isExtreme,
      isRefined,
      toggleTheme,
      ref,
    } as P & WithThemeUtilsProps & { ref: any };

    return <WrappedComponent {...enhancedProps} />;
  });

  const componentName =
    options.displayName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  WithThemeUtilsComponent.displayName = `withThemeUtils(${componentName})`;

  return options.memo
    ? React.memo(WithThemeUtilsComponent)
    : WithThemeUtilsComponent;
}

/**
 * Utility function to create a themed version of a component with default props
 */
export function createThemedComponent<P extends object>(
  WrappedComponent: React.ComponentType<P & WithThemeProps>,
  defaultProps?: Partial<P>,
  options: WithThemeOptions = {}
) {
  const ThemedComponent = withTheme(WrappedComponent, options);

  if (defaultProps) {
    // Create a wrapper component that applies default props
    const ComponentWithDefaults = (props: P) => {
      const mergedProps = { ...defaultProps, ...props } as any;
      return <ThemedComponent {...mergedProps} />;
    };

    ComponentWithDefaults.displayName = `ThemedComponent(${WrappedComponent.displayName || WrappedComponent.name})`;

    return options.memo
      ? React.memo(ComponentWithDefaults)
      : ComponentWithDefaults;
  }

  return ThemedComponent;
}

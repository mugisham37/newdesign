/**
 * ThemeRenderer render props component for theme-dependent rendering
 * Provides flexible theme-aware rendering patterns
 */

'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeType, ThemeConfig } from '@/types/theme';

export interface ThemeRenderProps {
  theme: ThemeType;
  config: ThemeConfig;
  isExtreme: boolean;
  isRefined: boolean;
  isTransitioning: boolean;
  transitionProgress: number;
  getThemeClass: (baseClass?: string) => string;
  getThemeStyles: () => React.CSSProperties;
}

export interface ThemeRendererProps {
  children: (props: ThemeRenderProps) => React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Render props component that provides theme context to children
 */
export const ThemeRenderer: React.FC<ThemeRendererProps> = ({
  children,
  fallback = null,
}) => {
  const {
    currentTheme,
    config,
    isExtreme,
    isRefined,
    isTransitioning,
    transitionProgress,
    getThemeClass,
    getThemeStyles,
  } = useTheme();

  try {
    return (
      <>
        {children({
          theme: currentTheme,
          config,
          isExtreme,
          isRefined,
          isTransitioning,
          transitionProgress,
          getThemeClass,
          getThemeStyles,
        })}
      </>
    );
  } catch (error) {
    console.error('ThemeRenderer error:', error);
    return <>{fallback}</>;
  }
};

/**
 * Conditional theme renderer - renders different content based on theme
 */
export interface ConditionalThemeRendererProps {
  extreme?: React.ReactNode;
  refined?: React.ReactNode;
  both?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ConditionalThemeRenderer: React.FC<
  ConditionalThemeRendererProps
> = ({ extreme, refined, both, fallback = null }) => {
  const { isExtreme, isRefined } = useTheme();

  // If both is provided, always render it
  if (both) {
    return <>{both}</>;
  }

  // Render based on current theme
  if (isExtreme && extreme) {
    return <>{extreme}</>;
  }

  if (isRefined && refined) {
    return <>{refined}</>;
  }

  // Fallback if no matching content
  return <>{fallback}</>;
};

/**
 * Theme-aware wrapper component that applies theme classes and styles
 */
export interface ThemeWrapperProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  baseClass?: string;
  className?: string;
  style?: React.CSSProperties;
  applyThemeStyles?: boolean;
  [key: string]: any; // Allow any additional props to be passed through
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  children,
  as: Component = 'div',
  baseClass,
  className = '',
  style = {},
  applyThemeStyles = true,
  ...restProps
}) => {
  const { getThemeClass, getThemeStyles } = useTheme();

  const combinedClassName = `${getThemeClass(baseClass)} ${className}`.trim();
  const combinedStyle = applyThemeStyles
    ? { ...getThemeStyles(), ...style }
    : style;

  return React.createElement(
    Component,
    {
      className: combinedClassName,
      style: combinedStyle,
      ...restProps,
    },
    children
  );
};

/**
 * Higher-order component version of ThemeRenderer for class components
 */
export const withThemeRenderer = <P extends object>(
  Component: React.ComponentType<P & ThemeRenderProps>
) => {
  const WrappedComponent = (props: P) => (
    <ThemeRenderer>
      {(themeProps) => <Component {...props} {...themeProps} />}
    </ThemeRenderer>
  );

  WrappedComponent.displayName = `withThemeRenderer(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

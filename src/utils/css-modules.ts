// CSS Modules Utilities for Brutalist Portfolio

import clsx, { ClassValue } from 'clsx';

/**
 * Type for CSS Modules styles object
 */
export type StylesModule = Record<string, string>;

/**
 * Theme types for component styling
 */
export type ThemeType = 'extreme-brutalist' | 'refined-brutalist';

/**
 * Utility function to combine CSS module classes with conditional logic
 * Similar to clsx but optimized for CSS modules usage
 */
export function cn(...classes: ClassValue[]): string {
  return clsx(classes);
}

/**
 * Create theme-aware class names for CSS modules
 * @param styles - CSS modules styles object
 * @param baseClass - Base class name
 * @param theme - Current theme
 * @param modifiers - Additional modifiers
 */
export function createThemeClass(
  styles: StylesModule,
  baseClass: string,
  theme?: ThemeType,
  modifiers?: Record<string, boolean>
): string {
  const classes = [styles[baseClass]];

  // Add theme-specific class if theme is provided
  if (theme) {
    const themeClass = `${baseClass}--${theme}`;
    if (styles[themeClass]) {
      classes.push(styles[themeClass]);
    }
  }

  // Add modifier classes
  if (modifiers) {
    Object.entries(modifiers).forEach(([modifier, condition]) => {
      if (condition) {
        const modifierClass = `${baseClass}--${modifier}`;
        if (styles[modifierClass]) {
          classes.push(styles[modifierClass]);
        }
      }
    });
  }

  return cn(classes);
}

/**
 * Create state-aware class names for CSS modules
 * @param styles - CSS modules styles object
 * @param baseClass - Base class name
 * @param states - State conditions
 */
export function createStateClass(
  styles: StylesModule,
  baseClass: string,
  states?: Record<string, boolean>
): string {
  const classes = [styles[baseClass]];

  if (states) {
    Object.entries(states).forEach(([state, condition]) => {
      if (condition) {
        const stateClass = `${baseClass}Is${state.charAt(0).toUpperCase() + state.slice(1)}`;
        if (styles[stateClass]) {
          classes.push(styles[stateClass]);
        }
      }
    });
  }

  return cn(classes);
}

/**
 * Create variant class names for CSS modules
 * @param styles - CSS modules styles object
 * @param baseClass - Base class name
 * @param variant - Variant name
 * @param size - Size variant
 */
export function createVariantClass(
  styles: StylesModule,
  baseClass: string,
  variant?: string,
  size?: string
): string {
  const classes = [styles[baseClass]];

  if (variant) {
    const variantClass = `${baseClass}--${variant}`;
    if (styles[variantClass]) {
      classes.push(styles[variantClass]);
    }
  }

  if (size) {
    const sizeClass = `${baseClass}--${size}`;
    if (styles[sizeClass]) {
      classes.push(styles[sizeClass]);
    }
  }

  return cn(classes);
}

/**
 * Utility to combine multiple CSS module class creation functions
 * @param styles - CSS modules styles object
 * @param baseClass - Base class name
 * @param options - Configuration options
 */
export function createModuleClass(
  styles: StylesModule,
  baseClass: string,
  options?: {
    theme?: ThemeType;
    variant?: string;
    size?: string;
    modifiers?: Record<string, boolean>;
    states?: Record<string, boolean>;
    additional?: ClassValue[];
  }
): string {
  const {
    theme,
    variant,
    size,
    modifiers,
    states,
    additional = [],
  } = options || {};

  const classes = [styles[baseClass]];

  // Add theme class
  if (theme) {
    const themeClass = `${baseClass}--${theme}`;
    if (styles[themeClass]) {
      classes.push(styles[themeClass]);
    }
  }

  // Add variant class
  if (variant) {
    const variantClass = `${baseClass}--${variant}`;
    if (styles[variantClass]) {
      classes.push(styles[variantClass]);
    }
  }

  // Add size class
  if (size) {
    const sizeClass = `${baseClass}--${size}`;
    if (styles[sizeClass]) {
      classes.push(styles[sizeClass]);
    }
  }

  // Add modifier classes
  if (modifiers) {
    Object.entries(modifiers).forEach(([modifier, condition]) => {
      if (condition) {
        const modifierClass = `${baseClass}--${modifier}`;
        if (styles[modifierClass]) {
          classes.push(styles[modifierClass]);
        }
      }
    });
  }

  // Add state classes
  if (states) {
    Object.entries(states).forEach(([state, condition]) => {
      if (condition) {
        const stateClass = `${baseClass}Is${state.charAt(0).toUpperCase() + state.slice(1)}`;
        if (styles[stateClass]) {
          classes.push(styles[stateClass]);
        }
      }
    });
  }

  return cn([...classes, ...additional]);
}

/**
 * Utility to get all available classes from a CSS module
 * Useful for debugging and development
 */
export function getAvailableClasses(styles: StylesModule): string[] {
  return Object.keys(styles);
}

/**
 * Utility to check if a class exists in CSS module
 */
export function hasClass(styles: StylesModule, className: string): boolean {
  return className in styles;
}

/**
 * Utility to create responsive class names
 * @param styles - CSS modules styles object
 * @param baseClass - Base class name
 * @param breakpoints - Breakpoint-specific classes
 */
export function createResponsiveClass(
  styles: StylesModule,
  baseClass: string,
  breakpoints?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  }
): string {
  const classes = [styles[baseClass]];

  if (breakpoints) {
    Object.entries(breakpoints).forEach(([breakpoint, modifier]) => {
      const responsiveClass = `${baseClass}--${breakpoint}-${modifier}`;
      if (styles[responsiveClass]) {
        classes.push(styles[responsiveClass]);
      }
    });
  }

  return cn(classes);
}

/**
 * Type-safe CSS modules class creator with IntelliSense support
 */
export function createTypedClass<T extends StylesModule>(styles: T) {
  return {
    /**
     * Get a single class from the styles module
     */
    get: (className: keyof T): string => styles[className] || '',

    /**
     * Combine multiple classes from the styles module
     */
    combine: (...classNames: (keyof T)[]): string =>
      cn(classNames.map((name) => styles[name]).filter(Boolean)),

    /**
     * Create conditional classes
     */
    conditional: (conditions: Partial<Record<keyof T, boolean>>): string =>
      cn(
        Object.entries(conditions)
          .filter(([, condition]) => condition)
          .map(([className]) => styles[className as keyof T])
          .filter(Boolean)
      ),

    /**
     * Create theme-aware classes
     */
    themed: (
      baseClass: keyof T,
      theme: ThemeType,
      additionalClasses?: (keyof T)[]
    ): string => {
      const classes = [styles[baseClass]].filter(Boolean);
      const themeClass = `${String(baseClass)}--${theme}` as keyof T;

      if (styles[themeClass]) {
        classes.push(styles[themeClass]);
      }

      if (additionalClasses) {
        classes.push(
          ...additionalClasses.map((name) => styles[name]).filter(Boolean)
        );
      }

      return cn(classes);
    },
  };
}

/**
 * Animation class utilities for CSS modules
 */
export const animationClasses = {
  entrance: [
    'animate-slide-in-brutal',
    'animate-slide-in-top',
    'animate-slide-in-bottom',
    'animate-scale-in-brutal',
    'animate-fade-in-brutal',
  ],

  hover: [
    'animate-hover-glow',
    'animate-hover-shimmer',
    'animate-hover-strike',
  ],

  continuous: [
    'animate-brutal-pulse',
    'animate-gentle-float',
    'animate-brutal-float',
    'animate-terminal-pulse',
  ],

  effects: [
    'animate-brutal-glitch',
    'animate-text-glitch',
    'animate-intense-glitch',
  ],
};

/**
 * Utility to add animation classes based on conditions
 */
export function addAnimationClass(
  baseClasses: string,
  animations: {
    entrance?: boolean;
    hover?: boolean;
    continuous?: boolean;
    effects?: boolean;
  }
): string {
  const classes = [baseClasses];

  if (animations.entrance) {
    classes.push('animate-fade-in-brutal');
  }

  if (animations.hover) {
    classes.push('animate-hover-glow');
  }

  if (animations.continuous) {
    classes.push('animate-gentle-float');
  }

  if (animations.effects) {
    classes.push('animate-brutal-glitch');
  }

  return cn(classes);
}

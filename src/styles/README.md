# CSS Architecture Documentation

## Overview

This document outlines the comprehensive CSS architecture for the Brutalist Portfolio Next.js application, featuring a dual-theme system with extensive animation support and component-scoped styling.

## Directory Structure

```
src/styles/
├── themes/
│   ├── theme-variables.css      # Complete theme variable system
│   └── theme-transitions.css    # Theme transition animations
├── animations/
│   └── brutalist-keyframes.css  # Animation keyframes library
├── components/
│   ├── navigation.module.css    # Navigation component styles
│   ├── hero.module.css          # Hero section styles
│   └── [component].module.css   # Other component styles
├── utilities/
│   └── [utility].css            # Utility classes
├── css-modules.config.js        # CSS Modules configuration
└── README.md                    # This documentation
```

## Theme System

### Dual Theme Architecture

The application features two distinct themes that transition based on scroll position:

1. **Extreme Brutalist Theme** (`extreme-brutalist`)
   - Harsh geometric borders (8px solid)
   - High contrast black/white/yellow colors
   - Aggressive animations and effects
   - Terminal-inspired typography (Space Mono, JetBrains Mono)
   - Multiple layered shadows

2. **Refined Brutalist Theme** (`refined-brutalist`)
   - Softer geometric elements (2px borders)
   - Professional color palette (cyan, purple accents)
   - Smoother animations
   - Business-appropriate styling (Inter font)
   - Subtle shadows and gradients

### Theme Variables

All theme values are defined using CSS custom properties in `theme-variables.css`:

```css
:root[data-theme='extreme-brutalist'] {
  --color-primary: #000000;
  --color-accent: #ffff00;
  --border-width: 8px;
  --shadow-brutal: 8px 8px 0 var(--color-secondary);
  /* ... */
}

:root[data-theme='refined-brutalist'] {
  --color-primary: #1a1a1a;
  --color-accent: #8b5cf6;
  --border-width: 2px;
  --shadow-brutal: 4px 4px 12px rgba(0, 0, 0, 0.3);
  /* ... */
}
```

### Theme Transitions

Smooth transitions between themes are handled by `theme-transitions.css`:

- 600ms transition duration
- Cubic-bezier easing for smooth visual flow
- Staggered animations for multiple elements
- Performance optimizations using transform and opacity

## Animation System

### Keyframe Library

The `brutalist-keyframes.css` file contains a comprehensive library of animations:

#### Glitch Effects

- `brutalGlitch` - Basic glitch animation
- `textGlitch` - Text-specific glitch with shadows
- `intenseGlitch` - Complex glitch with skew and filters

#### Movement Effects

- `gentleFloat` - Subtle floating animation
- `brutalFloat` - More aggressive floating
- `aggressiveShake` - Intense shake effect

#### Entrance Animations

- `slideInBrutal` - Slide in with skew
- `scaleInBrutal` - Scale in with rotation
- `fadeInBrutal` - Fade in with blur

#### Interactive Effects

- `hoverGlow` - Glow effect on hover
- `hoverShimmer` - Shimmer animation
- `buttonPress` - Button press feedback

### Animation Classes

Pre-defined animation classes for easy application:

```css
.animate-brutal-glitch {
  animation: brutalGlitch 0.3s ease-out;
}
.animate-gentle-float {
  animation: gentleFloat 6s ease-in-out infinite;
}
.animate-hover-glow {
  animation: hoverGlow 0.3s ease-out forwards;
}
```

## CSS Modules

### Configuration

CSS Modules are configured in `next.config.js` with:

- Development: `[name]__[local]--[hash:base64:5]`
- Production: `[hash:base64:8]`
- camelCase export convention

### Naming Conventions

#### Component Structure

```css
/* Component root */
.component {
  /* base styles */
}

/* Variants */
.component--primary {
  /* primary variant */
}
.component--secondary {
  /* secondary variant */
}

/* Sizes */
.component--small {
  /* small size */
}
.component--large {
  /* large size */
}

/* States */
.componentIsLoading {
  /* loading state */
}
.componentIsDisabled {
  /* disabled state */
}

/* Theme variants */
.component--extremeBrutalist {
  /* extreme theme */
}
.component--refinedBrutalist {
  /* refined theme */
}
```

#### Usage in React

```tsx
import styles from './Component.module.css';
import { createModuleClass } from '@/utils/css-modules';

const Component = ({ variant, size, isLoading, theme }) => (
  <div
    className={createModuleClass(styles, 'component', {
      variant,
      size,
      states: { loading: isLoading },
      theme,
    })}
  >
    Content
  </div>
);
```

### Utility Functions

The `css-modules.ts` utility file provides helper functions:

- `createModuleClass()` - Comprehensive class creation
- `createThemeClass()` - Theme-aware classes
- `createStateClass()` - State-based classes
- `createVariantClass()` - Variant classes
- `createTypedClass()` - Type-safe class creation

## Global Styles

### Reset and Base Styles

The `globals.css` file includes:

- CSS reset using box-sizing: border-box
- Base typography using theme variables
- Form element styling
- Accessibility features
- Print styles

### Typography Scale

Consistent typography scale using CSS custom properties:

```css
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
/* ... up to 9xl */
```

### Spacing Scale

Consistent spacing using CSS custom properties:

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-4: 1rem; /* 16px */
/* ... up to 96 */
```

## Component Styling

### Navigation Component

Features in `navigation.module.css`:

- Fixed positioning with backdrop blur
- Theme-aware logo with layered effects
- Menu items with badges and indicators
- Mobile hamburger menu with animations
- Hover effects and transitions

### Hero Component

Features in `hero.module.css`:

- Grid layout with responsive behavior
- Typewriter text effects
- Animated metrics cards
- Portrait with scan effects
- Floating badges and live code display
- Background particle systems

## Responsive Design

### Breakpoints

Standard breakpoints used throughout:

- Mobile: max-width: 480px
- Tablet: max-width: 768px
- Desktop: max-width: 1024px
- Large: max-width: 1200px

### Mobile-First Approach

All components use mobile-first responsive design:

```css
/* Mobile styles (default) */
.component {
  /* mobile styles */
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    /* tablet styles */
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    /* desktop styles */
  }
}
```

## Accessibility

### Reduced Motion

Respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Styles

Consistent focus styles for keyboard navigation:

```css
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### High Contrast

Support for high contrast mode:

```css
@media (prefers-contrast: high) {
  :root {
    --border-width: var(--border-width-4);
  }
}
```

## Performance Optimizations

### CSS Containment

Components use CSS containment for better performance:

```css
.contain-layout {
  contain: layout style paint;
}
```

### GPU Acceleration

Animations use transform and opacity for GPU acceleration:

```css
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Tree Shaking

CSS Modules enable automatic tree shaking of unused styles in production builds.

## Best Practices

1. **Use CSS Custom Properties** for theme-aware styling
2. **Keep Selectors Flat** - avoid deep nesting
3. **Use CSS Modules** for component-scoped styles
4. **Compose Classes** using utility functions
5. **Test Responsiveness** across all breakpoints
6. **Optimize Animations** for performance
7. **Support Accessibility** features
8. **Document Complex Styles** with comments
9. **Use Consistent Naming** conventions
10. **Validate CSS** in both themes

## Development Workflow

1. Create component CSS module file
2. Define base component styles
3. Add theme variants using CSS custom properties
4. Implement responsive behavior
5. Add animations and interactions
6. Test in both themes
7. Verify accessibility compliance
8. Optimize for performance

## Maintenance

- Regularly audit unused CSS classes
- Update theme variables consistently
- Test theme transitions thoroughly
- Monitor animation performance
- Keep documentation updated
- Review responsive behavior on new devices

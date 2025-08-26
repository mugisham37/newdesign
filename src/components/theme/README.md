# Theme System Documentation

## Overview

The theme system provides a sophisticated dual-theme architecture for the brutalist portfolio, featuring seamless transitions between **Extreme Brutalist** and **Refined Brutalist** themes.

## Architecture

### Core Components

1. **ThemeProvider** - Main provider component that manages theme state and transitions
2. **ThemeContext** - React context for theme state management
3. **Theme Configuration** - Complete theme definitions with colors, typography, borders, shadows, and animations
4. **Theme Persistence** - SSR-compatible localStorage integration for theme persistence

### Theme Types

- **Extreme Brutalist**: Aggressive, raw aesthetic with harsh borders, high contrast, and terminal-inspired typography
- **Refined Brutalist**: Professional, polished brutalist design with softer edges and business-appropriate styling

## Usage

### Basic Setup

```tsx
import { ThemeProvider } from '@/components/theme';

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

### Using Theme in Components

```tsx
import { useTheme } from '@/components/theme';

const MyComponent = () => {
  const { currentTheme, config, setTheme, isTransitioning } = useTheme();

  return (
    <div
      style={{
        backgroundColor: config.colors.bg,
        color: config.colors.text,
        border: `${config.borders.width} ${config.borders.style} ${config.colors.text}`,
        borderRadius: config.borders.radius,
        boxShadow: config.shadows.brutal || config.shadows.subtle,
      }}
    >
      <h1>Current theme: {currentTheme}</h1>
      <button onClick={() => setTheme('refined-brutalist')}>
        Switch to Refined
      </button>
    </div>
  );
};
```

## Theme Configuration

### Extreme Brutalist Theme

```typescript
{
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#ffff00',
    highlight: '#00ffff',
    success: '#00ff00',
    bg: '#ffffff',
    text: '#000000',
  },
  typography: {
    primary: 'Space Mono, monospace',
    code: 'JetBrains Mono, monospace',
  },
  borders: {
    width: '8px',
    style: 'solid',
    radius: '0px',
  },
  shadows: {
    brutal: '8px 8px 0 #000000',
    double: '8px 8px 0 #ffff00, 16px 16px 0 #ffffff',
    triple: '8px 8px 0 #ffff00, 16px 16px 0 #ffffff, 24px 24px 0 #000000',
  },
  animations: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}
```

### Refined Brutalist Theme

```typescript
{
  colors: {
    primary: '#1a1a1a',
    secondary: '#f5f5f5',
    accent: '#8b5cf6',
    highlight: '#06b6d4',
    success: '#10b981',
    bg: '#f5f5f5',
    text: '#1a1a1a',
  },
  typography: {
    primary: 'Inter, sans-serif',
    code: 'JetBrains Mono, monospace',
  },
  borders: {
    width: '2px',
    style: 'solid',
    radius: '8px',
  },
  shadows: {
    subtle: '4px 4px 12px rgba(0, 0, 0, 0.3)',
    elevated: '0 10px 30px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
  animations: {
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
```

## Features

### Theme Switching with Transitions

- **Smooth Transitions**: 600ms duration with cubic-bezier easing
- **Transition States**: `isTransitioning` and `transitionProgress` tracking
- **CSS Custom Properties**: Automatic CSS variable updates
- **Body Classes**: Automatic theme class application

### SSR Compatibility

- **Server-Side Safe**: No hydration mismatches
- **Progressive Enhancement**: Works without JavaScript
- **Fallback Themes**: Graceful degradation

### Performance Optimizations

- **CSS Custom Properties**: Efficient theme switching
- **Memoized Configurations**: Optimized re-renders
- **Transition Management**: Prevents rapid theme switching

## API Reference

### useTheme Hook

```typescript
interface ThemeContextType {
  currentTheme: 'extreme-brutalist' | 'refined-brutalist';
  isTransitioning: boolean;
  transitionProgress: number; // 0-1
  setTheme: (theme: ThemeType) => void;
  config: ThemeConfig;
}
```

### Theme Persistence Utils

```typescript
// Get stored theme (SSR-safe)
const theme = getStoredTheme(); // ThemeType | null

// Store theme
setStoredTheme('extreme-brutalist');

// Get initial theme with fallback
const initial = getInitialTheme('extreme-brutalist');
```

## CSS Integration

The theme system automatically sets CSS custom properties:

```css
:root {
  --theme-bg: /* current background color */ --theme-text:
    /* current text color */
    --theme-primary: /* current primary color */
    --theme-accent: /* current accent color */
    --theme-border-width: /* current border width */
    --theme-border-radius: /* current border radius */
    --theme-shadow-brutal: /* current brutal shadow */ /* ... and more */;
}
```

Use in your CSS:

```css
.my-component {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  border: var(--theme-border-width) solid var(--theme-text);
  border-radius: var(--theme-border-radius);
  box-shadow: var(--theme-shadow-brutal);
  transition: all var(--theme-transition-duration)
    var(--theme-transition-easing);
}
```

## Testing

The theme system includes verification utilities:

```typescript
import { runThemeVerification } from '@/utils/theme-verification';

// Run all theme system tests
const success = runThemeVerification();
```

## Requirements Satisfied

This implementation satisfies the following requirements:

- **1.1**: Dual-theme architecture with seamless transitions
- **1.2**: Theme switching logic with transition states
- **1.3**: Theme persistence with SSR compatibility
- **TypeScript**: Complete type safety throughout
- **Performance**: Optimized transitions and state management
- **Accessibility**: Respects reduced motion preferences

## Future Enhancements

- Scroll-based theme detection (Task 5)
- Theme-aware component utilities (Task 6)
- Advanced transition animations
- Theme customization API

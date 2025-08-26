# Theme-Aware Component Utilities

This directory contains comprehensive theme-aware utilities for the brutalist portfolio application. These utilities provide flexible ways to create components that respond to theme changes and access theme configuration.

## Overview

The theme system supports two themes:

- **Extreme Brutalist**: Raw, aggressive, terminal-inspired design
- **Refined Brutalist**: Professional, polished, business-appropriate design

## Core Utilities

### 1. useTheme Hook

The primary hook for accessing theme context with additional utilities.

```tsx
import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const {
    currentTheme, // 'extreme-brutalist' | 'refined-brutalist'
    isExtreme, // boolean
    isRefined, // boolean
    colors, // Theme colors object
    typography, // Typography configuration
    borders, // Border configuration
    shadows, // Shadow configuration
    animations, // Animation configuration
    getThemeClass, // Function to generate theme-aware classes
    getThemeStyles, // Function to generate theme-aware styles
    toggleTheme, // Function to toggle between themes
    setTheme, // Function to set specific theme
  } = useTheme();

  return (
    <div className={getThemeClass('my-component')} style={getThemeStyles()}>
      <p>Current theme: {currentTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

### 2. ThemeRenderer (Render Props)

Provides theme context through render props pattern.

```tsx
import { ThemeRenderer } from '@/components/theme';

const MyComponent = () => (
  <ThemeRenderer>
    {({ theme, config, isExtreme, getThemeClass }) => (
      <div className={getThemeClass('render-props-example')}>
        <h3>Current theme: {theme}</h3>
        <p>Primary font: {config.typography.primary}</p>
        {isExtreme ? (
          <span style={{ color: config.colors.accent }}>EXTREME MODE!</span>
        ) : (
          <span style={{ color: config.colors.highlight }}>Refined Mode</span>
        )}
      </div>
    )}
  </ThemeRenderer>
);
```

### 3. ConditionalThemeRenderer

Renders different content based on the current theme.

```tsx
import { ConditionalThemeRenderer } from '@/components/theme';

const MyComponent = () => (
  <ConditionalThemeRenderer
    extreme={
      <div className="extreme-design">
        <strong>EXTREME BRUTALIST DESIGN</strong>
      </div>
    }
    refined={
      <div className="refined-design">
        <strong>Professional Design</strong>
      </div>
    }
    fallback={<div>Loading theme...</div>}
  />
);
```

### 4. ThemeWrapper

Automatically applies theme classes and styles to any element.

```tsx
import { ThemeWrapper } from '@/components/theme';

const MyComponent = () => (
  <ThemeWrapper
    as="section"
    baseClass="my-section"
    className="additional-classes"
    applyThemeStyles={true}
  >
    <h2>This section has automatic theme styling</h2>
    <ThemeWrapper as="button" baseClass="theme-button">
      Themed Button
    </ThemeWrapper>
  </ThemeWrapper>
);
```

### 5. Higher-Order Components (HOCs)

#### withTheme

Injects complete theme context as props.

```tsx
import { withTheme, WithThemeProps } from '@/components/theme';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps & WithThemeProps> = ({
  title,
  theme,
}) => (
  <div className={theme.getThemeClass('my-component')}>
    <h2>{title}</h2>
    <p>Current theme: {theme.currentTheme}</p>
  </div>
);

export default withTheme(MyComponent);
```

#### withThemeColors

Injects only theme colors as props.

```tsx
import { withThemeColors, WithThemeColorsProps } from '@/components/theme';

const ColorPalette: React.FC<WithThemeColorsProps> = ({ colors }) => (
  <div>
    {Object.entries(colors).map(([name, color]) => (
      <div
        key={name}
        style={{ backgroundColor: color, width: 50, height: 50 }}
        title={`${name}: ${color}`}
      />
    ))}
  </div>
);

export default withThemeColors(ColorPalette);
```

#### withThemeUtils

Injects theme utility functions as props.

```tsx
import { withThemeUtils, WithThemeUtilsProps } from '@/components/theme';

const ThemeToggler: React.FC<WithThemeUtilsProps> = ({
  isExtreme,
  toggleTheme,
  getThemeClass,
}) => (
  <button className={getThemeClass('theme-toggler')} onClick={toggleTheme}>
    Switch to {isExtreme ? 'Refined' : 'Extreme'} Theme
  </button>
);

export default withThemeUtils(ThemeToggler);
```

## CSS-in-JS Utilities

### Theme Style Functions

```tsx
import { createThemeStyles, themeStyleUtils } from '@/utils/theme-styles';

const MyComponent = () => {
  const { currentTheme } = useTheme();

  // Create theme-aware styles
  const buttonStyles = createThemeStyles(
    (config) => themeStyleUtils.themeButton(config, 'primary'),
    currentTheme
  );

  const cardStyles = createThemeStyles(
    (config) => ({
      ...themeStyleUtils.themeCard(config, true),
      padding: '1rem',
      margin: '0.5rem',
    }),
    currentTheme
  );

  return (
    <div style={cardStyles}>
      <button style={buttonStyles}>Themed Button</button>
    </div>
  );
};
```

### Available Style Utilities

- `themeStyleUtils.brutalBorder(config, color?)` - Creates brutal border styles
- `themeStyleUtils.brutalShadow(config, shadowType?)` - Creates shadow effects
- `themeStyleUtils.themeText(config, size?)` - Creates text styles
- `themeStyleUtils.themeCodeText(config, size?)` - Creates code text styles
- `themeStyleUtils.themeBackground(config, variant?)` - Creates background styles
- `themeStyleUtils.themeButton(config, variant?)` - Creates button styles
- `themeStyleUtils.themeCard(config, elevated?)` - Creates card styles
- `themeStyleUtils.themeInput(config)` - Creates input styles

### CSS Custom Properties

```tsx
import { createThemeVariables } from '@/utils/theme-styles';

const MyComponent = () => {
  const { config } = useTheme();

  // Generate CSS custom properties
  const cssVariables = createThemeVariables(config, '--my-theme');

  return (
    <div style={cssVariables}>
      <p style={{ color: 'var(--my-theme-accent)' }}>
        This uses CSS custom properties
      </p>
    </div>
  );
};
```

## Best Practices

### 1. Choose the Right Utility

- Use `useTheme` for simple theme access in functional components
- Use `ThemeRenderer` when you need render props pattern
- Use `ConditionalThemeRenderer` for theme-specific content
- Use `ThemeWrapper` for automatic theme styling
- Use HOCs for reusable components that need theme injection

### 2. Performance Considerations

- HOCs are memoized by default when `memo: true` option is used
- Theme transitions are optimized with requestAnimationFrame
- CSS custom properties are used for efficient style updates

### 3. Accessibility

- Theme changes maintain focus states
- Color contrast is maintained across themes
- Reduced motion preferences are respected

### 4. Testing

```tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/components/theme';

const renderWithTheme = (component, theme = 'extreme-brutalist') => {
  return render(
    <ThemeProvider initialTheme={theme}>{component}</ThemeProvider>
  );
};

test('component renders with theme', () => {
  renderWithTheme(<MyComponent />);
  // Test theme-specific behavior
});
```

## Migration Guide

If you have existing components that need theme support:

1. **Simple theme access**: Add `useTheme` hook
2. **Props injection**: Wrap with appropriate HOC
3. **Conditional rendering**: Use `ConditionalThemeRenderer`
4. **Automatic styling**: Wrap with `ThemeWrapper`

## Examples

See `ThemeUtilsDemo.tsx` for comprehensive examples of all utilities in action.

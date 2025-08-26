# NavigationLogo Component

A sophisticated logo component with layered brutal effects, hover animations, and theme-aware styling.

## Features

### ✅ Multiple Shadow Layers

- 4 layered shadow effects that create depth
- Theme-aware shadow colors and positioning
- Animated shadow transformations on hover

### ✅ Hover Animations

- Transform, scale, and rotation effects
- Shimmer animation that sweeps across the logo
- Glow effects with theme-appropriate colors
- Strike-through animation effect
- Character-by-character text animations

### ✅ Glitch Effects

- Random glitch triggers every 3 seconds (10% chance)
- Hover-triggered glitch effects in extreme theme
- Red and blue color separation effects
- Intense glitch with skew and filter effects

### ✅ Border Animations

- Multiple border layers with different styles
- Rotating border animation on hover
- Accent border that appears on interaction
- Corner brackets that animate in on hover

### ✅ Status Indicator

- Pulsing dot with ping animation
- Terminal-style cursor animation
- Customizable status text
- Theme-aware styling and colors

### ✅ Theme Awareness

- **Extreme Brutalist**: Harsh borders, aggressive animations, glitch effects
- **Refined Brutalist**: Softer shadows, smoother animations, professional styling
- Automatic theme detection and adaptation
- Smooth transitions between themes

### ✅ Brutal Effects

- Scan line animation
- Noise overlay texture
- Corner bracket indicators
- Terminal-style elements

## Props

```typescript
interface NavigationLogoProps {
  href?: string; // Link destination (default: '/')
  text?: string; // Logo text (default: 'DEV.BRUTAL')
  showStatus?: boolean; // Show status indicator (default: true)
  statusText?: string; // Status text (default: 'ONLINE')
  className?: string; // Additional CSS classes
  onClick?: () => void; // Click handler (overrides href)
}
```

## Usage

### Basic Usage

```tsx
import { NavigationLogo } from '@/components/sections/Navigation';

<NavigationLogo />;
```

### Custom Text

```tsx
<NavigationLogo text="CUSTOM.DEV" />
```

### Without Status

```tsx
<NavigationLogo showStatus={false} />
```

### Custom Status

```tsx
<NavigationLogo statusText="LIVE" />
```

### With Click Handler

```tsx
<NavigationLogo onClick={() => console.log('Clicked!')} href="" />
```

## Styling

The component uses CSS Modules for styling with the following key classes:

- `.navigationLogo` - Base logo container
- `.navigationLogoShadowLayers` - Shadow layer container
- `.navigationLogoGlitchOverlay` - Glitch effect overlay
- `.navigationLogoStatus` - Status indicator container
- `.navigationLogoBrutalEffects` - Additional brutal effects

## Animations

### Hover Effects

- Logo scales and translates on hover
- Shadow layers extend further
- Shimmer effect sweeps across
- Glow effect appears
- Strike animation plays
- Corner brackets appear

### Glitch Effects

- Random glitch triggers (extreme theme only)
- Hover-triggered glitch effects
- Color separation with red/blue channels
- Transform and filter animations

### Status Indicator

- Continuous pulse animation
- Ping effect for attention
- Blinking cursor animation

## Theme Behavior

### Extreme Brutalist Theme

- 8px solid borders
- Multiple layered shadows
- Aggressive animations
- Glitch effects enabled
- Scan lines and noise overlay
- Terminal-style elements

### Refined Brutalist Theme

- 2px borders with rounded corners
- Subtle shadows with blur
- Smooth animations
- Glitch effects disabled
- Professional styling
- Backdrop blur effects

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Reduced motion preferences respected
- High contrast mode support
- Screen reader compatible

## Performance

- CSS animations use transform and opacity for GPU acceleration
- Intersection Observer for efficient scroll detection
- Optimized re-renders with React.memo patterns
- Minimal DOM manipulation

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties support required
- Animation support for optimal experience
- Graceful degradation for older browsers

## Testing

The component includes:

- TypeScript type checking
- Basic functionality tests
- Visual regression testing capability
- Theme switching tests
- Accessibility testing

Visit `/theme-demo` to see the component in action with theme transitions.

# Scroll-Based Theme Detection System

This system provides smooth theme transitions based on scroll position and section visibility. It consists of several interconnected components and hooks that work together to create a seamless user experience.

## Components

### ScrollThemeProvider

The main provider component that orchestrates theme detection and transitions.

```tsx
import { ScrollThemeProvider } from '@/components/theme/ScrollThemeProvider';

<ScrollThemeProvider
  transitionDuration={600}
  scrollThreshold={0.4}
  onThemeChange={(theme) => console.log('Theme changed to:', theme)}
>
  <YourApp />
</ScrollThemeProvider>;
```

### ThemeDetector

Uses Intersection Observer to detect which sections are visible and determine the appropriate theme.

```tsx
import { ThemeDetector } from '@/components/theme/ThemeDetector';

const sections = [
  { id: 'hero', theme: 'extreme-brutalist' },
  { id: 'about', theme: 'refined-brutalist' },
];

<ThemeDetector
  sections={sections}
  onThemeChange={(theme, sectionId) => {
    console.log(`Theme changed to ${theme} due to section ${sectionId}`);
  }}
>
  <YourContent />
</ThemeDetector>;
```

## Hooks

### useScrollProgress

Tracks scroll position with performance optimization.

```tsx
import { useScrollProgress } from '@/hooks/useScrollProgress';

const { scrollY, scrollProgress, isScrolling } = useScrollProgress({
  throttleMs: 16, // Throttle updates to 60fps
  includeScrollDirection: true,
});
```

### useThemeTransition

Manages theme transitions with hysteresis to prevent rapid switching.

```tsx
import { useThemeTransition } from '@/hooks/useThemeTransition';

const { currentTheme, targetTheme, isTransitioning, transitionProgress } =
  useThemeTransition({
    thresholds: [
      { progress: 0, theme: 'extreme-brutalist' },
      { progress: 0.4, theme: 'refined-brutalist' },
    ],
    transitionDuration: 600,
  });
```

### useIntersectionObserver

Detects element visibility for animations and theme detection.

```tsx
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ref = useRef<HTMLDivElement>(null);
const { isIntersecting, intersectionRatio } = useIntersectionObserver(ref, {
  threshold: 0.5,
  rootMargin: '-20% 0px',
  triggerOnce: true,
});
```

## Usage

### 1. Mark sections with theme attributes

```tsx
<section data-theme-section="hero" className="min-h-screen">
  <h1>Hero Section</h1>
</section>

<section data-theme-section="about" className="min-h-screen">
  <h2>About Section</h2>
</section>
```

### 2. Apply theme transition classes

```tsx
<div className="theme-transition-all">
  Content that transitions smoothly between themes
</div>

<button className="theme-transition-colors">
  Button with color transitions
</button>
```

### 3. Use CSS custom properties for theme-aware styling

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: var(--border-width) solid var(--border-primary);
  transition: all var(--theme-transition-duration)
    var(--theme-transition-easing);
}
```

## CSS Classes

### Transition Classes

- `theme-transition-all` - Transitions all theme-related properties
- `theme-transition-colors` - Transitions colors only
- `theme-transition-borders` - Transitions border properties
- `theme-transition-shadows` - Transitions box-shadow

### Theme State Classes

- `theme-extreme-brutalist` - Applied when extreme theme is active
- `theme-refined-brutalist` - Applied when refined theme is active
- `theme-transitioning` - Applied during theme transitions

## Performance Considerations

1. **Throttled Updates**: Scroll events are throttled to 60fps for smooth performance
2. **RequestAnimationFrame**: Smooth animations use RAF for optimal timing
3. **Hysteresis**: Prevents rapid theme switching with buffer zones
4. **Intersection Observer**: Efficient section visibility detection
5. **CSS Transitions**: Hardware-accelerated transitions for smooth effects

## Accessibility

- Respects `prefers-reduced-motion` for users who prefer minimal animations
- Maintains keyboard navigation during theme transitions
- Provides semantic theme information via data attributes
- Includes debug information in development mode

## Development

### Debug Mode

In development, debug panels show current theme state and transition progress.

### Testing

Use the theme demo page at `/theme-demo` to test the system.

### Customization

All transition durations, easing functions, and thresholds are configurable through the component props and CSS custom properties.

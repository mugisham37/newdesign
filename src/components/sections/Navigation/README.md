# Navigation Component

The Navigation component provides a fixed-position navigation bar with dual-theme support and scroll-based behavior changes.

## Features

- **Dual-theme support**: Automatically adapts between extreme and refined brutalist themes
- **Fixed positioning**: Stays at the top of the viewport with scroll-based background changes
- **Brutal border system**: Layered shadows and effects that change based on theme
- **Theme transition animations**: Smooth 600ms transitions between themes
- **Scroll-based effects**: Background opacity and border animations based on scroll position
- **Responsive design**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Usage

```tsx
import { Navigation } from '@/components/sections/Navigation';

export default function Layout() {
  return (
    <>
      <Navigation>
        <div className="flex items-center justify-between w-full">
          <div className="text-xl font-bold">LOGO</div>
          <div className="flex gap-4">
            <span>HOME</span>
            <span>PROJECTS</span>
            <span>CONTACT</span>
          </div>
        </div>
      </Navigation>

      <main className="pt-24">{/* Your page content */}</main>
    </>
  );
}
```

## Props

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | `''`    | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Navigation content     |

## Theme Behavior

### Extreme Brutalist Theme

- **Borders**: 8px solid borders with harsh geometric styling
- **Shadows**: Multiple layered shadows (8px 8px 0, 16px 16px 0)
- **Colors**: High contrast black/white/yellow
- **Typography**: Space Mono font family
- **Animations**: Aggressive glitch effects and brutal pulse animations

### Refined Brutalist Theme

- **Borders**: 2px borders with 8px border radius
- **Shadows**: Subtle shadows with blur effects
- **Colors**: Professional palette with purple/cyan accents
- **Typography**: Inter font family
- **Animations**: Smooth floating and glow effects

## Scroll Behavior

- **Background opacity**: Increases from 0 to 0.95 (extreme) or 0.9 (refined) based on scroll
- **Border animations**: Top border scales with scroll progress
- **Accent border**: Appears and animates when scrolled
- **Transition indicator**: Shows during theme transitions

## CSS Classes

### Base Classes

- `.navigation`: Main navigation container
- `.navigation__background`: Scroll-based background overlay
- `.navigation__border-effects`: Container for border animations
- `.navigation__container`: Content container with max-width

### Theme Classes

- `.navigation--theme-extreme-brutalist`: Extreme theme styling
- `.navigation--theme-refined-brutalist`: Refined theme styling
- `.navigation--scrolled`: Applied when page is scrolled
- `.navigation--transitioning`: Applied during theme transitions

## Accessibility

- Uses semantic `<nav>` element with `role="navigation"`
- Includes `aria-label="Main navigation"`
- Supports keyboard navigation
- Respects `prefers-reduced-motion` settings
- High contrast mode support

## Performance

- Uses `transform: translateZ(0)` for GPU acceleration
- Throttled scroll event handling (16ms)
- CSS containment for layout optimization
- Will-change properties for smooth animations

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Backdrop-filter support with fallbacks

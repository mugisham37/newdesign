# NavigationMenu Component

## Overview

The NavigationMenu component is a sophisticated, theme-aware navigation menu that provides interactive elements including badges, commit counters, pulse indicators, underline animations, and glitch effects. It seamlessly adapts between Extreme Brutalist and Refined Brutalist themes.

## Features

### Core Features

- **Theme-aware styling**: Automatically adapts to current theme (extreme-brutalist or refined-brutalist)
- **Interactive hover effects**: Shadow transformations, color changes, and scale effects
- **Active state management**: Automatically detects active section based on scroll position
- **Smooth scrolling**: Implements smooth scroll to target sections
- **Accessibility**: Full keyboard navigation and screen reader support

### Visual Elements

- **Badges**: Configurable badges with different types (new, hot, updated, live)
- **Commit counters**: Display commit/activity counts with lightning bolt icons
- **Pulse indicators**: Animated pulse dots and rings for live/active items
- **Underline animations**: Smooth underline fill animations on hover/active
- **Glitch effects**: Terminal-style glitch effects for extreme theme
- **Shadow effects**: Layered shadow transformations on hover

### Interactive States

- **Hover states**: Complex multi-layer hover animations
- **Active states**: Visual indication of current section
- **Focus states**: Keyboard navigation support
- **Glitching states**: Special glitch animation for extreme theme clicks

## Usage

### Basic Usage

```tsx
import { NavigationMenu } from '@/components/sections/Navigation/NavigationMenu';

// Use with default menu items
<NavigationMenu />

// Use with custom menu items
<NavigationMenu
  items={customMenuItems}
  onItemClick={(item) => console.log('Clicked:', item)}
/>
```

### Custom Menu Items

```tsx
import { MenuItem } from '@/components/sections/Navigation/NavigationMenu';

const customMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'HOME',
    href: '#hero',
    badge: { text: 'LIVE', type: 'live', pulse: true },
    commitCount: 247,
    isActive: true,
    description: 'Portfolio home and introduction',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    href: '#projects',
    badge: { text: 'NEW', type: 'new' },
    commitCount: 156,
    description: 'Featured development projects',
  },
];
```

## Props

### NavigationMenuProps

```tsx
interface NavigationMenuProps {
  items?: MenuItem[]; // Menu items (optional, uses defaults)
  className?: string; // Additional CSS classes
  onItemClick?: (item: MenuItem) => void; // Click handler
}
```

### MenuItem Interface

```tsx
interface MenuItem {
  id: string; // Unique identifier
  label: string; // Display text
  href: string; // Target section/URL
  badge?: {
    // Optional badge
    text: string; // Badge text
    type: 'new' | 'hot' | 'updated' | 'live'; // Badge type
    pulse?: boolean; // Enable pulse animation
  };
  commitCount?: number; // Optional commit counter
  isActive?: boolean; // Active state (auto-managed)
  description?: string; // Accessibility description
}
```

## Theme Variations

### Extreme Brutalist Theme

- **Typography**: Space Mono, JetBrains Mono fonts
- **Borders**: 8px solid borders, no border radius
- **Effects**: Harsh shadows, glitch animations, brutal hover effects
- **Colors**: High contrast black/white/yellow
- **Animations**: Sharp, aggressive transitions

### Refined Brutalist Theme

- **Typography**: Inter, JetBrains Mono fonts
- **Borders**: 2px borders with 8px border radius
- **Effects**: Soft shadows, smooth animations, elegant hover effects
- **Colors**: Professional purple/cyan gradients
- **Animations**: Smooth, polished transitions

## Styling

The component uses CSS custom properties for theme-aware styling:

```css
.navigation-menu {
  /* Theme variables are automatically applied */
  --theme-bg: /* Current theme background */ --theme-text:
    /* Current theme text color */
    --theme-accent: /* Current theme accent color */
    /* ... other theme variables */;
}
```

## Accessibility Features

- **ARIA labels**: Proper menubar and menuitem roles
- **Keyboard navigation**: Full keyboard support with focus management
- **Screen reader support**: Descriptive text and current page indication
- **Reduced motion**: Respects user motion preferences
- **High contrast**: Enhanced visibility in high contrast mode

## Performance Optimizations

- **GPU acceleration**: Transform3d for smooth animations
- **Will-change**: Optimized for animation properties
- **Contain**: Layout and paint containment for performance
- **Throttled scroll**: Optimized scroll event handling

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties support required
- Backdrop-filter support for blur effects (graceful degradation)

## Examples

### Default Menu

```tsx
// Uses default menu items with all features
<NavigationMenu />
```

### Custom Menu with Handler

```tsx
<NavigationMenu
  items={[
    {
      id: 'about',
      label: 'ABOUT',
      href: '#about',
      badge: { text: 'UPDATED', type: 'updated' },
      commitCount: 89,
      description: 'About section',
    },
  ]}
  onItemClick={(item) => {
    console.log(`Navigating to ${item.label}`);
    // Custom navigation logic
  }}
/>
```

### Themed Integration

```tsx
// Component automatically adapts to current theme
<ThemeProvider>
  <NavigationMenu />
</ThemeProvider>
```

## Testing

The component includes comprehensive visual and interaction testing:

- Theme switching behavior
- Hover and focus states
- Click handling and navigation
- Accessibility compliance
- Responsive behavior

## Related Components

- `Navigation`: Main navigation container
- `NavigationLogo`: Logo component with brutal effects
- `NavigationCTA`: Call-to-action button (planned)
- `MobileMenu`: Mobile navigation overlay (planned)

# Design Document

## Overview

This design document outlines the architecture and implementation strategy for migrating a sophisticated React portfolio from Vite.js to Next.js 14+ with TypeScript while maintaining 100% visual and functional fidelity. The current application features advanced 3D graphics with Three.js, complex GSAP animations, custom font loading, smooth scrolling, and responsive design patterns that must be preserved exactly.

The migration strategy focuses on a hybrid rendering approach where SEO-critical content uses Server-Side Rendering (SSR) while interactive 3D components and animations use Client-Side Rendering (CSR) with proper hydration boundaries.

## Architecture

### Current Vite.js Architecture

```
Vite.js Application
├── Single-page React app with client-side rendering
├── Three.js Canvas with 3D Planet model
├── GSAP animations with timeline management
├── Custom font loading via CSS @font-face
├── Tailwind CSS with custom utilities
├── Lenis smooth scrolling integration
└── React 19.1.0 with modern hooks
```

### Target Next.js Architecture

```
Next.js 14+ App Router
├── app/
│   ├── layout.tsx (Root layout with font loading)
│   ├── page.tsx (Main page with SSR shell)
│   ├── globals.css (Migrated styles)
│   └── fonts.ts (Next.js font optimization)
├── src/
│   ├── components/ (Client components with 'use client')
│   ├── sections/ (Hybrid rendering sections)
│   └── constants/ (Shared data)
└── public/ (Static assets preserved)
```

### Rendering Strategy

- **SSR Components**: Layout, navigation, text content, SEO metadata
- **CSR Components**: Three.js Canvas, GSAP animations, interactive elements
- **Hybrid Approach**: Sections that contain both static content and interactive elements

## Components and Interfaces

### Core Component Migration Strategy

#### 1. App Component Transformation

**Current**: `src/App.jsx` - Single client-side app component
**Target**: Split into multiple components:

- `app/layout.tsx` - Root layout with font loading and metadata
- `app/page.tsx` - Main page wrapper
- `src/components/AppContent.tsx` - Client-side app logic

```typescript
// app/layout.tsx
interface RootLayoutProps {
  children: React.ReactNode;
}

// src/components/AppContent.tsx
interface AppContentProps {
  // No props needed - self-contained
}
```

#### 2. Three.js Component Architecture

**Current**: Direct Canvas integration in Hero component
**Target**: Separated Three.js scene with dynamic import

```typescript
// src/components/ThreeScene.tsx
interface ThreeSceneProps {
  isMobile: boolean;
}

// Dynamic import in Hero component
const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-50" />,
});
```

#### 3. Font Loading System

**Current**: CSS @font-face declarations
**Target**: Next.js localFont optimization

```typescript
// app/fonts.ts
export const amiamie: LocalFont;
export const amiamieRound: LocalFont;

// Font configuration with all variants
interface FontConfig {
  src: Array<{
    path: string;
    weight: string;
    style: string;
  }>;
  variable: string;
  display: string;
}
```

#### 4. Animation System Preservation

**Current**: Direct GSAP integration with useGSAP
**Target**: Identical GSAP setup with client-side boundaries

```typescript
// All animation components require 'use client'
interface AnimatedComponentProps {
  // Preserve exact prop interfaces
  subTitle: string;
  title: string;
  text: string;
  textColor: string;
  withScrollTrigger?: boolean;
}
```

### Component Conversion Matrix

| Component                 | Current Type | Target Type             | Special Requirements           |
| ------------------------- | ------------ | ----------------------- | ------------------------------ |
| App.jsx                   | Client       | Split (Layout + Client) | Loading state management       |
| Hero.jsx                  | Client       | Hybrid                  | Dynamic Three.js import        |
| Planet.jsx                | Client       | Client                  | 'use client' directive         |
| AnimatedHeaderSection.jsx | Client       | Client                  | GSAP timeline preservation     |
| Marquee.jsx               | Client       | Client                  | Complex GSAP Observer logic    |
| Navbar.jsx                | Client       | Hybrid                  | Navigation + responsive logic  |
| All Sections              | Client       | Hybrid                  | Content SSR + interactions CSR |

## Data Models

### Font Configuration Model

```typescript
interface FontVariant {
  path: string;
  weight: "300" | "400" | "900";
  style: "normal" | "italic";
}

interface FontFamily {
  name: string;
  variants: FontVariant[];
  variable: string;
  display: "swap" | "block" | "fallback";
}
```

### Three.js Scene Configuration

```typescript
interface SceneConfig {
  camera: {
    position: [number, number, number];
    fov: number;
    near: number;
    far: number;
  };
  lighting: LightformerConfig[];
  environment: {
    resolution: number;
  };
}

interface PlanetProps {
  scale: number;
  isMobile?: boolean;
}
```

### Animation Timeline Configuration

```typescript
interface GSAPTimelineConfig {
  duration: number;
  ease: string;
  delay?: number;
  scrollTrigger?: {
    trigger: RefObject<HTMLElement>;
    start?: string;
    end?: string;
  };
}
```

### Project Data Structure

```typescript
interface Project {
  id: number;
  name: string;
  description: string;
  href: string;
  image: string;
  bgImage: string;
  frameworks: Framework[];
}

interface Framework {
  id: number;
  name: string;
}
```

## Error Handling

### Client-Side Hydration Errors

- **Issue**: Three.js components causing hydration mismatches
- **Solution**: Dynamic imports with `ssr: false` and loading states
- **Implementation**: Wrap all Three.js components in dynamic imports

### Font Loading Failures

- **Issue**: Custom fonts not loading properly
- **Solution**: Next.js localFont with proper fallbacks
- **Implementation**: Font display swap with system font fallbacks

### GSAP Animation Errors

- **Issue**: Animations triggering before DOM is ready
- **Solution**: Proper useGSAP integration with client boundaries
- **Implementation**: Ensure all GSAP components have 'use client' directive

### Asset Loading Errors

- **Issue**: Public assets not found after migration
- **Solution**: Preserve exact public directory structure
- **Implementation**: Maintain identical asset paths

### TypeScript Migration Errors

- **Issue**: JavaScript to TypeScript conversion issues
- **Solution**: Gradual migration with proper type definitions
- **Implementation**: Start with basic types, add complexity incrementally

## Testing Strategy

### Visual Regression Testing

1. **Screenshot Comparison**

   - Capture screenshots at multiple breakpoints
   - Compare pixel-perfect differences
   - Test all animation states

2. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)
   - WebGL compatibility verification

### Functional Testing

1. **Animation Testing**

   - GSAP timeline execution
   - Three.js scene rendering
   - Loading progress tracking
   - Smooth scrolling behavior

2. **Responsive Testing**

   - Breakpoint behavior
   - Mobile planet scaling
   - Touch interactions
   - Font rendering across devices

3. **Performance Testing**
   - Lighthouse score comparison
   - First Contentful Paint metrics
   - 3D scene frame rates
   - Bundle size analysis

### Integration Testing

1. **Component Integration**

   - Props passing between components
   - Event handling preservation
   - State management consistency

2. **Asset Integration**
   - Font loading verification
   - 3D model loading
   - Image optimization
   - Static asset accessibility

### TypeScript Testing

1. **Type Safety**

   - Component prop types
   - Hook return types
   - Event handler types
   - Third-party library types

2. **Build Testing**
   - TypeScript compilation
   - Next.js build process
   - Production bundle generation

## Implementation Phases

### Phase 1: Project Setup and Configuration

- Initialize Next.js project with TypeScript
- Install exact dependency versions
- Configure Next.js for Three.js compatibility
- Set up Tailwind CSS with custom configuration

### Phase 2: Asset and Font Migration

- Transfer all public assets maintaining structure
- Implement Next.js font optimization
- Configure font loading with proper fallbacks
- Verify asset accessibility

### Phase 3: Core Component Migration

- Convert App component to layout + page structure
- Migrate Three.js components with dynamic imports
- Convert all components to TypeScript
- Add 'use client' directives where needed

### Phase 4: Animation and Interaction Migration

- Preserve GSAP timeline configurations
- Maintain smooth scrolling integration
- Convert event handlers to TypeScript
- Test animation timing and behavior

### Phase 5: Styling and Responsive Migration

- Transfer Tailwind configuration
- Migrate custom CSS utilities
- Verify responsive breakpoints
- Test font rendering across devices

### Phase 6: Testing and Optimization

- Conduct visual regression testing
- Performance benchmarking
- Cross-browser compatibility testing
- SEO and accessibility verification

## Critical Success Factors

### Visual Fidelity Requirements

- Pixel-perfect reproduction of original design
- Identical animation timing and easing
- Preserved font rendering and typography
- Maintained responsive behavior

### Performance Requirements

- Lighthouse score ≥ 90 for all metrics
- First Contentful Paint ≤ 2 seconds
- 60fps animation performance
- Optimized bundle sizes

### Technical Requirements

- TypeScript compilation without errors
- Next.js build success
- All dependencies compatible
- Proper SSR/CSR boundaries

### Compatibility Requirements

- Cross-browser functionality
- Mobile device support
- WebGL compatibility
- Accessibility compliance

This design ensures a systematic approach to migrating the sophisticated Vite.js portfolio to Next.js while maintaining every aspect of the current user experience and visual design.

# Design Document

## Overview

This design document outlines the architecture and implementation strategy for transforming a sophisticated React + Vite portfolio application into a Next.js 14+ TypeScript application. The current application features advanced 3D animations using Three.js, interactive components, custom Tailwind CSS styling, and modern React patterns that must be preserved while gaining the benefits of Next.js SSR, performance optimizations, and TypeScript safety.

### Current Architecture Analysis

**Technology Stack:**

- **Frontend**: React 19 with JSX
- **Build Tool**: Vite 6.1.0 with React plugin
- **Styling**: Tailwind CSS 4.0 with custom theme and animations
- **3D Graphics**: Three.js with React Three Fiber and Drei
- **Animations**: Motion (Framer Motion) and GSAP
- **Email Service**: EmailJS for contact form
- **State Management**: React hooks (useState, useEffect, useRef)
- **Responsive Design**: React Responsive library

**Key Components:**

- Interactive 3D astronaut model with animations
- Interactive globe with mouse/touch controls
- Particle system with mouse interaction
- Animated text components with flip animations
- Contact form with EmailJS integration
- Responsive navigation with mobile menu
- Custom Tailwind CSS variables and keyframe animations

## Architecture

### Target Next.js Architecture

```
src/
├── app/
│   ├── globals.css          # Global styles (from index.css)
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main page (current App.jsx)
│   └── favicon.ico          # App favicon
├── components/              # Reusable UI components (converted to TSX)
│   ├── Alert.tsx
│   ├── Astronaut.tsx        # 3D astronaut model (client-side)
│   ├── Card.tsx
│   ├── CopyEmailButton.tsx
│   ├── FlipWords.tsx        # Text animation component
│   ├── Frameworks.tsx
│   ├── Globe.tsx            # Interactive globe (client-side)
│   ├── HeroText.tsx         # Animated hero text (client-side)
│   ├── Loader.tsx
│   ├── Marquee.tsx
│   ├── OrbitingCircles.tsx
│   ├── ParallaxBackground.tsx
│   ├── Particles.tsx        # Particle system (client-side)
│   ├── Project.tsx
│   ├── ProjectDetails.tsx
│   └── Timeline.tsx
├── sections/                # Page sections (converted to TSX)
│   ├── About.tsx
│   ├── Contact.tsx          # Contact form (client-side)
│   ├── Experiences.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx             # Hero with 3D canvas (client-side)
│   ├── Navbar.tsx           # Navigation (client-side)
│   ├── Projects.tsx
│   └── Testimonial.tsx
├── constants/
│   └── index.ts             # Project data and constants
├── types/                   # TypeScript type definitions
│   ├── components.ts
│   ├── projects.ts
│   └── global.ts
└── lib/                     # Utility functions
    └── utils.ts
```

### Client-Side vs Server-Side Components

**Server Components (Default):**

- Static content sections (About, Projects, Experiences, Testimonial, Footer)
- Components that don't use browser APIs or state
- Layout components without interactivity

**Client Components (Require "use client"):**

- `Hero.tsx` - Contains Three.js Canvas
- `Astronaut.tsx` - Three.js 3D model with animations
- `Globe.tsx` - Interactive globe with mouse controls
- `Particles.tsx` - Canvas-based particle system
- `HeroText.tsx` - Motion animations
- `Navbar.tsx` - Interactive navigation with state
- `Contact.tsx` - Form handling with EmailJS
- `FlipWords.tsx` - Text animations
- Any component using hooks, browser APIs, or event handlers

## Components and Interfaces

### Core Type Definitions

```typescript
// types/projects.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  subDescription: string[];
  href: string;
  logo: string;
  image: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  path: string;
}

// types/components.ts
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AstronautProps extends ComponentProps {
  scale?: number | number[];
  position?: [number, number, number];
}

export interface GlobeProps extends ComponentProps {
  config?: GlobeConfig;
}

export interface ParticlesProps extends ComponentProps {
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

// types/global.ts
export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface Experience {
  title: string;
  job: string;
  date: string;
  contents: string[];
}

export interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
}
```

### Component Architecture Patterns

**1. Three.js Components Pattern:**

```typescript
"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../components/Loader";

export default function ThreeJSComponent() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>{/* 3D content */}</Suspense>
    </Canvas>
  );
}
```

**2. Animation Components Pattern:**

```typescript
"use client";
import { motion } from "motion/react";

export default function AnimatedComponent() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={variants} initial="hidden" animate="visible">
      {/* content */}
    </motion.div>
  );
}
```

**3. Interactive Components Pattern:**

```typescript
"use client";
import { useState, useEffect } from "react";

export default function InteractiveComponent() {
  const [state, setState] = useState<StateType>(initialState);

  useEffect(() => {
    // Browser API usage
  }, []);

  return (
    // JSX with event handlers
  );
}
```

## Data Models

### Project Configuration

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "motion",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
  },
  images: {
    domains: ["robohash.org"], // For testimonial images
  },
  webpack: (config) => {
    // Handle GLTF files for Three.js
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
```

### TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/sections/*": ["./src/sections/*"],
      "@/constants/*": ["./src/constants/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Package Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@types/node": "^20.0.0",
    "@types/three": "^0.173.0",
    "@emailjs/browser": "^4.4.1",
    "@gsap/react": "^2.1.2",
    "@react-three/drei": "^10.0.0",
    "@react-three/fiber": "^9.0.4",
    "cobe": "^0.6.3",
    "maath": "^0.10.8",
    "motion": "^12.4.5",
    "react-responsive": "^10.0.0",
    "tailwind-merge": "^3.0.1",
    "tailwindcss": "^4.0.7",
    "three": "^0.173.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "eslint": "^9.19.0",
    "eslint-config-next": "^14.0.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.0.0"
  }
}
```

## Error Handling

### SSR Compatibility Issues

**1. Three.js SSR Handling:**

```typescript
// For components that must be client-side only
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("../components/Globe"), {
  ssr: false,
  loading: () => <div>Loading globe...</div>,
});
```

**2. Browser API Error Handling:**

```typescript
"use client";
import { useEffect, useState } from "react";

export default function BrowserComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Browser API usage here
}
```

**3. EmailJS Error Handling:**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await emailjs.send(/* params */);
    showAlertMessage("success", "Message sent successfully!");
  } catch (error) {
    console.error("Email send error:", error);
    showAlertMessage("error", "Failed to send message. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

### Hydration Mismatch Prevention

**1. Consistent Rendering:**

```typescript
// Avoid different server/client renders
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

return <div>{isClient ? <ClientOnlyComponent /> : <ServerFallback />}</div>;
```

**2. Animation Initialization:**

```typescript
// Ensure animations start after hydration
useEffect(() => {
  if (typeof window !== "undefined") {
    // Initialize animations
  }
}, []);
```

## Testing Strategy

### Component Testing Approach

**1. Static Components:**

- Test rendering without errors
- Verify content display
- Check responsive behavior

**2. Interactive Components:**

- Test user interactions (clicks, form submissions)
- Verify state changes
- Test error handling

**3. 3D Components:**

- Test loading states
- Verify model rendering
- Test performance under load

**4. Animation Components:**

- Test animation triggers
- Verify smooth transitions
- Test on different devices

### Integration Testing

**1. Page-Level Testing:**

- Test complete page rendering
- Verify all sections load correctly
- Test navigation between sections

**2. Form Integration:**

- Test EmailJS integration
- Verify form validation
- Test success/error states

**3. Performance Testing:**

- Test Three.js performance
- Verify smooth animations
- Test on mobile devices

### Build Testing

**1. TypeScript Compilation:**

- Ensure no type errors
- Verify all imports resolve
- Test build process

**2. Production Build:**

- Test optimized bundle
- Verify asset loading
- Test in production environment

## Performance Considerations

### Bundle Optimization

**1. Code Splitting:**

- Automatic Next.js code splitting
- Dynamic imports for heavy components
- Lazy loading for 3D models

**2. Asset Optimization:**

- Next.js automatic image optimization
- Optimized font loading
- Compressed 3D models

**3. Runtime Performance:**

- Efficient Three.js rendering
- Optimized animation loops
- Memory management for particles

### Loading Strategies

**1. Progressive Loading:**

- Show loading states for 3D content
- Skeleton screens for content
- Graceful degradation

**2. Preloading:**

- Preload critical 3D models
- Preload hero section assets
- Cache frequently used resources

This design ensures a smooth transformation from Vite to Next.js while maintaining all existing functionality and visual design, with improved performance, SEO capabilities, and TypeScript safety.

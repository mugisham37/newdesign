# Vite.js to Next.js Migration Guide

## Project Overview

This guide provides detailed instructions for migrating a React portfolio website from Vite.js to Next.js while maintaining **EXACT** visual appearance and functionality.

### Current Project Stack

- **Framework**: Vite.js + React 19.1.0
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: GSAP 3.13.0 with React integration
- **Styling**: Tailwind CSS 4.1.7 with custom fonts
- **Smooth Scrolling**: Lenis 1.3.4
- **Responsive**: react-responsive 10.0.1
- **Custom Fonts**: Amiamie font family (multiple weights/styles)

### Target Architecture

- **Framework**: Next.js 14+ (App Router)
- **Rendering**: Hybrid (SSR for SEO + CSR for 3D components)
- **All existing libraries preserved**

## Critical Requirements

### 1. VISUAL PRESERVATION

- **EXACT** same appearance across all screen sizes
- **IDENTICAL** animations and transitions
- **SAME** loading states and progress indicators
- **PRESERVED** font rendering and typography
- **MAINTAINED** 3D planet animations and lighting

### 2. FUNCTIONAL PRESERVATION

- All GSAP animations must work identically
- Three.js 3D scene must render exactly the same
- Smooth scrolling behavior must be preserved
- Responsive breakpoints must match exactly
- Loading progress tracking must function identically

## Step-by-Step Migration Process

### Phase 1: Project Setup

#### 1.1 Initialize Next.js Project

```bash
npx create-next-app@latest awwwards-portfolio-nextjs --typescript --tailwind --eslint --app
cd awwwards-portfolio-nextjs
```

#### 1.2 Install Exact Dependencies

```bash
npm install @gsap/react@^2.1.2 @react-three/drei@^10.0.8 @react-three/fiber@^9.1.2 gsap@^3.13.0 lenis@^1.3.4 maath@^0.10.8 react@^19.1.0 react-dom@^19.1.0 react-responsive@^10.0.1 react-scroll@^1.9.3 three@^0.176.0 @iconify/react@^6.0.0
```

#### 1.3 Configure Next.js

Create `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
};

module.exports = nextConfig;
```

### Phase 2: Asset Migration

#### 2.1 Public Assets Transfer

**CRITICAL**: Copy ALL assets maintaining exact structure:

```
public/
├── fonts/
│   ├── otf/
│   │   ├── Amiamie-Regular.otf
│   │   ├── Amiamie-Italic.otf
│   │   ├── Amiamie-Light.otf
│   │   ├── Amiamie-LightItalic.otf
│   │   ├── Amiamie-Black.otf
│   │   ├── Amiamie-BlackItalic.otf
│   │   ├── Amiamie-RegularRound.otf
│   │   ├── Amiamie-BlackRound.otf
│   │   └── Amiamie-BlackItalicRound.otf
│   └── ttf/ (all corresponding TTF files)
├── models/
│   └── Planet.glb
├── assets/
│   ├── projects/ (all project images)
│   └── backgrounds/ (all background images)
└── vite.svg (keep for compatibility)
```

#### 2.2 Font Configuration

Create `app/fonts.ts`:

```typescript
import localFont from "next/font/local";

export const amiamie = localFont({
  src: [
    {
      path: "../public/fonts/otf/Amiamie-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/otf/Amiamie-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/otf/Amiamie-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/otf/Amiamie-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/otf/Amiamie-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/otf/Amiamie-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-amiamie",
  display: "swap",
});

export const amiamieRound = localFont({
  src: [
    {
      path: "../public/fonts/otf/Amiamie-RegularRound.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/otf/Amiamie-BlackRound.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/otf/Amiamie-BlackItalicRound.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-amiamie-round",
  display: "swap",
});
```

### Phase 3: Tailwind Configuration

#### 3.1 Update tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e5e5e0",
        DarkLava: "#393632",
        SageGray: "#8b8b73",
        gold: "#cfa355",
      },
      fontFamily: {
        amiamie: ["var(--font-amiamie)", "sans-serif"],
        "amiamie-round": ["var(--font-amiamie-round)", "sans-serif"],
      },
      animation: {
        marquee: "marquee 40s infinite linear",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};
```

#### 3.2 Global Styles Migration

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #e5e5e0;
  --color-DarkLava: #393632;
  --color-SageGray: #8b8b73;
  --color-gold: #cfa355;
  --gap: 1rem;
}

body {
  background: #e5e5e0;
  color: black;
  scroll-behavior: smooth;
  overflow-x: hidden;
  font-family: var(--font-amiamie);
}

@layer utilities {
  .clip-path {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  }

  .banner-text-responsive {
    @apply text-[68px] sm:text-[118px] md:text-[126px] lg:text-[152px] leading-9 sm:leading-16 lg:leading-20;
  }

  .value-text-responsive {
    @apply text-2xl md:text-[26px] lg:text-[32px];
  }

  .marquee-text-responsive {
    @apply text-[28px] sm:text-[36px] lg:text-[42px];
  }

  .contact-text-responsive {
    @apply text-[42px] sm:text-[52px] md:text-[62px] lg:text-[100px];
  }
}
```

### Phase 4: Component Migration Strategy

#### 4.1 Directory Structure

```
src/
├── components/
│   ├── AnimatedHeaderSection.jsx
│   ├── AnimatedTextLines.jsx
│   ├── Marquee.jsx
│   └── Planet.jsx (needs dynamic import)
├── sections/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── ContactSummary.jsx
│   ├── Hero.jsx (needs dynamic import for Canvas)
│   ├── Navbar.jsx
│   ├── Services.jsx
│   ├── ServiceSummary.jsx
│   └── Works.jsx
└── constants/
    └── index.js
```

#### 4.2 Critical Component Modifications

**Hero.jsx** - Requires dynamic import:

```jsx
"use client";
import dynamic from "next/dynamic";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-50" />,
});

const Hero = () => {
  // ... existing code
  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Ali Sanati"}
        text={text}
        textColor={"text-black"}
      />
      <ThreeScene isMobile={isMobile} />
    </section>
  );
};
```

**Create ThreeScene.jsx**:

```jsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Planet } from "./Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";

const ThreeScene = ({ isMobile }) => {
  return (
    <figure
      className="absolute inset-0 -z-50"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
      >
        {/* ... existing Canvas content */}
      </Canvas>
    </figure>
  );
};

export default ThreeScene;
```

**Planet.jsx** - Add 'use client':

```jsx
"use client";
import React, { useRef } from "react";
// ... rest of existing code unchanged
```

#### 4.3 App Component Migration

Create `src/components/AppContent.jsx`:

```jsx
"use client";
import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import ReactLenis from "lenis/react";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
// ... import all other sections

const AppContent = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default AppContent;
```

### Phase 5: App Router Setup

#### 5.1 Root Layout

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { amiamie, amiamieRound } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Sanati - Portfolio",
  description: "Premium web development and design services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${amiamie.variable} ${amiamieRound.variable}`}>
      <body className={amiamie.className}>{children}</body>
    </html>
  );
}
```

#### 5.2 Main Page

Create `app/page.tsx`:

```tsx
import AppContent from "../src/components/AppContent";

export default function Home() {
  return <AppContent />;
}
```

### Phase 6: Critical Migration Rules

#### 6.1 Component Migration Checklist

- [ ] Add 'use client' to ALL components using hooks, GSAP, or Three.js
- [ ] Preserve EXACT className strings and styling
- [ ] Maintain identical component structure and props
- [ ] Keep all useEffect, useRef, and custom hooks unchanged
- [ ] Preserve all GSAP timeline configurations exactly

#### 6.2 Import Path Updates

- Change relative imports to match new structure
- Update asset paths to use Next.js public directory
- Ensure all dynamic imports use proper Next.js syntax

#### 6.3 Performance Preservation

- Use dynamic imports for Three.js components with `ssr: false`
- Maintain lazy loading for 3D models
- Preserve existing loading states and progress tracking

### Phase 7: Testing Requirements

#### 7.1 Visual Verification

- [ ] Compare side-by-side with original Vite version
- [ ] Test all responsive breakpoints (mobile, tablet, desktop)
- [ ] Verify font rendering matches exactly
- [ ] Check 3D planet animation timing and appearance
- [ ] Validate all GSAP animations trigger correctly

#### 7.2 Functional Testing

- [ ] Smooth scrolling behavior works identically
- [ ] Loading progress displays correctly
- [ ] All navigation links function properly
- [ ] Contact forms and interactions work
- [ ] Performance metrics match or improve

#### 7.3 Cross-Browser Testing

- [ ] Chrome, Firefox, Safari, Edge compatibility
- [ ] Mobile browser testing (iOS Safari, Chrome Mobile)
- [ ] WebGL support verification

### Phase 8: Deployment Preparation

#### 8.1 Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### 8.2 Environment Variables

Create `.env.local` if needed for any API keys or configuration.

#### 8.3 Static Export (if needed)

Add to `next.config.js` if deploying as static site:

```javascript
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

## Success Criteria

### Visual Fidelity: 100% Match

- Pixel-perfect reproduction of original design
- Identical animations and transitions
- Same loading states and progress indicators
- Preserved typography and spacing

### Performance Requirements

- Lighthouse score ≥ 90 for all metrics
- First Contentful Paint ≤ 2s
- 3D scene loads within same timeframe as original
- Smooth 60fps animations maintained

### Functional Requirements

- All interactive elements work identically
- Responsive behavior matches exactly
- Cross-browser compatibility preserved
- SEO improvements from Next.js SSR

## Common Pitfalls to Avoid

1. **Don't modify GSAP configurations** - Keep exact timing and easing
2. **Preserve exact Tailwind classes** - Don't optimize or change class names
3. **Maintain component structure** - Don't refactor during migration
4. **Keep asset paths identical** - Use same public directory structure
5. **Don't change Three.js scene setup** - Preserve camera, lighting, and model positioning

## Final Validation

Before considering migration complete:

1. Deploy both versions side-by-side
2. Compare screenshots at multiple breakpoints
3. Test all animations and interactions
4. Verify loading performance
5. Confirm SEO improvements without visual changes

This migration should result in a Next.js application that is visually and functionally identical to the original Vite.js version while gaining the benefits of Next.js architecture.

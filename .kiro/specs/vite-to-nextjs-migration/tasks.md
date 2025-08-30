# Implementation Plan

- [x] 1. Initialize Next.js project structure and configuration

  - Create new Next.js 14+ project with TypeScript and Tailwind CSS
  - Install exact dependency versions matching current Vite project
  - Configure next.config.js for Three.js and WebGL compatibility
  - Set up ESLint configuration for Next.js and TypeScript
  - _Requirements: 1.1, 1.2, 1.3, 10.3, 10.4_

- [x] 2. Configure Tailwind CSS with custom theme and utilities

  - Create tailwind.config.js with exact color scheme and font configurations
  - Implement custom utility classes (banner-text-responsive, value-text-responsive, etc.)
  - Set up animation keyframes for marquee and other custom animations
  - Configure content paths for Next.js App Router structure
  - _Requirements: 2.4, 5.6, 6.1_

- [x] 3. Implement Next.js font optimization system

  - Create app/fonts.ts with localFont configurations for all Amiamie variants
  - Configure font loading for Regular, Italic, Light, Black weights and styles
  - Set up Amiamie-Round font family with proper variants
  - Implement font-display: swap for optimal loading performance
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 4. Create global styles and CSS migration

  - Create app/globals.css with migrated styles from src/index.css
  - Implement CSS custom properties for colors and theme variables
  - Add utility classes and responsive text sizing utilities
  - Configure body styles and scroll behavior settings
  - _Requirements: 2.4, 5.6, 6.1_

- [ ] 5. Set up root layout with font integration

  - Create app/layout.tsx with proper TypeScript interfaces
  - Integrate font loading with CSS variables
  - Configure metadata for SEO optimization
  - Set up HTML structure with font class application
  - _Requirements: 1.2, 5.1, 5.2, 10.3_

- [ ] 6. Migrate public assets with exact structure preservation

  - Copy all files from public/ directory maintaining identical paths
  - Verify fonts directory structure (/fonts/otf/ and /fonts/ttf/)
  - Ensure 3D models directory (/models/Planet.glb) is accessible
  - Copy project images and background assets with same paths
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 7. Create constants and data migration

  - Convert src/constants/index.js to TypeScript with proper interfaces
  - Define TypeScript interfaces for servicesData, projects, and socials
  - Ensure all data structures match exactly with current implementation
  - Export constants with proper type definitions
  - _Requirements: 1.2, 7.2, 10.3_

- [ ] 8. Implement Planet component with TypeScript conversion

  - Convert src/components/Planet.jsx to Planet.tsx with proper types
  - Add 'use client' directive for client-side rendering
  - Preserve exact GSAP animation configurations and timing
  - Maintain useGLTF integration with proper TypeScript types
  - Add proper interfaces for component props and refs
  - _Requirements: 1.2, 4.1, 4.2, 7.1, 7.4, 7.5_

- [ ] 9. Create ThreeScene component with dynamic import support

  - Create new src/components/ThreeScene.tsx for Canvas wrapper
  - Implement proper TypeScript interfaces for scene props
  - Configure Canvas with identical camera, lighting, and environment settings
  - Preserve Float component integration and planet scaling logic
  - Add proper error boundaries and loading states
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.1_

- [ ] 10. Migrate AnimatedHeaderSection with GSAP preservation

  - Convert src/components/AnimatedHeaderSection.jsx to TypeScript
  - Add 'use client' directive and proper prop interfaces
  - Preserve exact GSAP timeline configurations and scroll triggers
  - Maintain clip-path styling and responsive text classes
  - Ensure AnimatedTextLines integration works identically
  - _Requirements: 3.2, 7.1, 7.4, 7.5_

- [ ] 11. Convert AnimatedTextLines component to TypeScript

  - Convert src/components/AnimatedTextLines.jsx to TypeScript
  - Add proper interfaces for text animation props
  - Preserve GSAP text animation timing and effects
  - Maintain responsive styling and text formatting
  - _Requirements: 3.2, 7.1, 7.4_

- [ ] 12. Migrate Marquee component with complex GSAP logic

  - Convert src/components/Marquee.jsx to TypeScript with proper types
  - Add 'use client' directive for client-side GSAP functionality
  - Preserve horizontalLoop function with exact animation logic
  - Maintain Observer integration for scroll-based speed changes
  - Ensure Icon integration from @iconify/react works identically
  - _Requirements: 3.2, 7.1, 7.4, 7.5_

- [ ] 13. Create Hero section with dynamic Three.js integration

  - Convert src/sections/Hero.jsx to TypeScript
  - Implement dynamic import for ThreeScene component with ssr: false
  - Add proper loading state for Three.js scene
  - Preserve responsive media query logic with react-responsive
  - Maintain exact text content and AnimatedHeaderSection integration
  - _Requirements: 4.1, 4.5, 7.1, 7.6_

- [ ] 14. Migrate Navbar section with responsive behavior

  - Convert src/sections/Navbar.jsx to TypeScript
  - Add proper interfaces for navigation props and state
  - Preserve responsive behavior and mobile menu functionality
  - Maintain scroll-based navigation and link behavior
  - _Requirements: 7.1, 7.6, 9.2_

- [ ] 15. Convert ServiceSummary section to TypeScript

  - Convert src/sections/ServiceSummary.jsx to TypeScript
  - Add proper interfaces for service summary props
  - Preserve GSAP animations and scroll triggers if present
  - Maintain responsive styling and layout
  - _Requirements: 7.1, 7.2_

- [ ] 16. Migrate Services section with data integration

  - Convert src/sections/Services.jsx to TypeScript
  - Integrate with migrated servicesData from constants
  - Preserve component layout and styling exactly
  - Add proper TypeScript interfaces for service items
  - _Requirements: 7.1, 7.2_

- [ ] 17. Convert About section to TypeScript

  - Convert src/sections/About.jsx to TypeScript
  - Add proper interfaces for about section props
  - Preserve GSAP animations and scroll-based triggers
  - Maintain responsive text and layout styling
  - _Requirements: 7.1, 7.4_

- [ ] 18. Migrate Works section with project data integration

  - Convert src/sections/Works.jsx to TypeScript
  - Integrate with migrated projects data from constants
  - Preserve project card layout and hover interactions
  - Add proper TypeScript interfaces for project items
  - _Requirements: 7.1, 7.2_

- [ ] 19. Convert ContactSummary section to TypeScript

  - Convert src/sections/ContactSummary.jsx to TypeScript
  - Add proper interfaces for contact summary props
  - Preserve GSAP animations and responsive styling
  - Maintain exact text content and layout
  - _Requirements: 7.1, 7.4_

- [ ] 20. Migrate Contact section with social links integration

  - Convert src/sections/Contact.jsx to TypeScript
  - Integrate with migrated socials data from constants
  - Preserve contact form functionality and styling
  - Add proper TypeScript interfaces for contact props
  - _Requirements: 7.1, 7.2_

- [ ] 21. Create AppContent component with loading state management

  - Create src/components/AppContent.tsx as main client-side wrapper
  - Add 'use client' directive and proper TypeScript interfaces
  - Implement useProgress hook integration for loading states
  - Preserve ReactLenis smooth scrolling integration exactly
  - Maintain loading progress animation and fade-in transitions
  - _Requirements: 8.1, 8.2, 8.3, 9.1, 9.3_

- [ ] 22. Implement main page component with SSR shell

  - Create app/page.tsx as main page entry point
  - Import and render AppContent component
  - Configure proper metadata and SEO settings
  - Ensure proper hydration boundaries between SSR and CSR
  - _Requirements: 1.1, 8.4, 10.1_

- [ ] 23. Configure development and build scripts

  - Update package.json with Next.js scripts (dev, build, start, lint)
  - Ensure all dependencies are compatible with Next.js
  - Configure TypeScript compilation settings
  - Set up proper development environment with hot reloading
  - _Requirements: 10.1, 10.2, 10.4, 10.5_

- [ ] 24. Implement comprehensive testing suite

  - Create test files for critical components (Planet, Hero, AppContent)
  - Test Three.js scene rendering and GSAP animations
  - Verify font loading and responsive behavior
  - Test loading states and smooth scrolling functionality
  - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [ ] 25. Conduct visual regression testing and optimization

  - Compare migrated site with original Vite version side-by-side
  - Test all responsive breakpoints and animation timing
  - Verify font rendering and 3D scene appearance
  - Measure performance metrics and optimize if needed
  - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6, 8.4, 8.5, 8.6_

- [ ] 26. Final build verification and deployment preparation
  - Run production build and verify no TypeScript errors
  - Test built application functionality and performance
  - Verify all assets load correctly in production mode
  - Confirm SEO improvements while maintaining visual fidelity
  - _Requirements: 10.2, 10.3, 10.5, 10.6_

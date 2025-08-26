# Brutalist Portfolio - Next.js 14

A sophisticated brutalist portfolio built with Next.js 14, featuring a dual-theme architecture that transitions from Extreme Brutalist to Refined Brutalist design.

## Features

- **Next.js 14** with App Router and TypeScript
- **Dual-theme architecture** with scroll-based transitions
- **Tailwind CSS** for styling with custom brutalist design tokens
- **Framer Motion** for advanced animations
- **Performance optimized** with image optimization and code splitting
- **SEO ready** with metadata and structured data
- **Accessibility compliant** with WCAG 2.1 AA standards

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# Analysis
npm run analyze         # Analyze bundle size
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components (to be created)
├── hooks/             # Custom React hooks (to be created)
├── contexts/          # React contexts (to be created)
├── styles/            # Additional styles (to be created)
├── utils/             # Utility functions (to be created)
├── types/             # TypeScript type definitions (to be created)
└── data/              # Static data (to be created)
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Code Quality**: ESLint, Prettier
- **Performance**: Built-in Next.js optimizations

## Theme System

The portfolio features a dual-theme architecture:

### Extreme Brutalist Theme

- Harsh geometric borders (8px solid)
- High contrast black/white/yellow colors
- Aggressive animations and glitch effects
- Terminal-inspired typography (Space Mono, JetBrains Mono)

### Refined Brutalist Theme

- Softer geometric elements with rounded corners
- Professional color palette (cyan, purple accents)
- Smooth animations and subtle effects
- Business-appropriate styling while maintaining brutalist DNA

## Performance Features

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Bundle analysis and optimization
- Core Web Vitals monitoring
- SEO optimization with metadata and structured data

## Development

This project follows modern React and Next.js best practices:

- TypeScript with strict configuration
- Component composition patterns
- Custom hooks for reusable logic
- Context for state management
- Performance optimization techniques
- Accessibility-first development

## License

This project is private and proprietary.

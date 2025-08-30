import { Metadata } from "next";
import AppContent from "../src/components/AppContent";

// Page-specific metadata that extends the layout metadata
export const metadata: Metadata = {
  title: "Home | Creative Developer & 3D Artist",
  description:
    "Welcome to my creative portfolio featuring stunning 3D graphics, interactive animations, and cutting-edge web development projects built with Next.js, Three.js, and GSAP.",
  openGraph: {
    title: "Home | Creative Developer & 3D Artist",
    description:
      "Welcome to my creative portfolio featuring stunning 3D graphics, interactive animations, and cutting-edge web development projects.",
    url: "/",
  },
  twitter: {
    title: "Home | Creative Developer & 3D Artist",
    description:
      "Welcome to my creative portfolio featuring stunning 3D graphics, interactive animations, and cutting-edge web development projects.",
  },
};

/**
 * Main page component that serves as the entry point for the portfolio
 * This component provides the SSR shell while AppContent handles all client-side functionality
 *
 * The hydration boundary is established here:
 * - This component (page.tsx) renders on the server for SEO and initial load
 * - AppContent component runs on the client for all interactive features
 */
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen">
      {/* 
        AppContent is a client component that handles:
        - Three.js 3D scene rendering
        - GSAP animations and scroll triggers
        - Loading progress tracking with useProgress
        - Smooth scrolling with ReactLenis
        - All interactive portfolio sections
        
        The 'use client' directive in AppContent ensures proper hydration boundaries
      */}
      <AppContent />
    </main>
  );
}

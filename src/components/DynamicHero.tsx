"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "../types/components";

// Loading component for Hero section
const HeroLoader = () => (
  <section className="flex items-center justify-center min-h-screen c-space">
    <div className="text-white text-lg">Loading Hero section...</div>
  </section>
);

// Dynamically import Hero component with no SSR
const DynamicHero = dynamic(() => import("../sections/Hero"), {
  ssr: false,
  loading: HeroLoader,
});

// Wrapper component with proper typing
const Hero: React.FC<ComponentProps> = (props) => {
  return <DynamicHero {...props} />;
};

export default Hero;

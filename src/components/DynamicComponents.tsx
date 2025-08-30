"use client";

import dynamic from "next/dynamic";
import {
  AstronautProps,
  GlobeProps,
  ParticlesProps,
} from "../types/components";

// Loading components for better UX
const AstronautLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="animate-pulse text-4xl mb-2">🚀</div>
      <div className="text-neutral-400 text-sm">Loading astronaut...</div>
    </div>
  </div>
);

const GlobeLoader = () => (
  <div className="mx-auto aspect-[1/1] w-full max-w-[600px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-2"></div>
      <div className="text-neutral-400 text-sm">Loading globe...</div>
    </div>
  </div>
);

const ParticlesLoader = () => (
  <div className="pointer-events-none flex items-center justify-center h-full">
    <div className="text-center text-neutral-600 text-sm opacity-50">
      <div className="mb-1">✨</div>
      <div>Loading particles...</div>
    </div>
  </div>
);

// Dynamic imports with optimized loading
export const DynamicAstronaut = dynamic(
  () => import("./Astronaut").then((mod) => ({ default: mod.Astronaut })),
  {
    ssr: false,
    loading: AstronautLoader,
  }
);

export const DynamicGlobe = dynamic(
  () => import("./Globe").then((mod) => ({ default: mod.Globe })),
  {
    ssr: false,
    loading: GlobeLoader,
  }
);

export const DynamicParticles = dynamic(
  () => import("./Particles").then((mod) => ({ default: mod.Particles })),
  {
    ssr: false,
    loading: ParticlesLoader,
  }
);

// Wrapper components with proper typing
export const Astronaut: React.FC<AstronautProps> = (props) => {
  return <DynamicAstronaut {...props} />;
};

export const Globe: React.FC<GlobeProps> = (props) => {
  return <DynamicGlobe {...props} />;
};

export const Particles: React.FC<ParticlesProps> = (props) => {
  return <DynamicParticles {...props} />;
};

import * as React from "react";
import type * as THREE from "three";

// Base component props interface
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Three.js component props
export interface AstronautProps {
  scale?: number | number[];
  position?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: unknown;
}

// Globe component configuration and props
export interface GlobeMarker {
  location: [number, number];
  size: number;
}

export interface GlobeConfig {
  width?: number;
  height?: number;
  onRender?: () => void;
  devicePixelRatio?: number;
  phi?: number;
  theta?: number;
  dark?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  markers?: GlobeMarker[];
}

export interface GlobeProps extends ComponentProps {
  config?: GlobeConfig;
}

// Particles component props
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

// Animation and text component props
export interface FlipWordsProps extends ComponentProps {
  words: string[];
  duration?: number;
}

export interface HeroTextProps {
  className?: string;
}

// Navigation component props
export interface NavbarProps {
  className?: string;
}

// Alert component props
export interface AlertProps {
  type: "success" | "error" | "warning" | "info" | "danger";
  text: string;
}

// Motion animation variants
export interface MotionVariants {
  hidden: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    filter?: string;
  };
  visible: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    filter?: string;
  };
}

// Three.js related types
export interface ThreeJSNodes {
  [key: string]: THREE.Object3D;
}

export interface ThreeJSMaterials {
  [key: string]: THREE.Material;
}

export interface ThreeJSAnimations {
  name: string;
  duration: number;
  tracks: THREE.KeyframeTrack[];
}

// Mouse position interface
export interface MousePosition {
  x: number;
  y: number;
}

// Canvas size interface
export interface CanvasSize {
  w: number;
  h: number;
}

// Particle circle interface
export interface ParticleCircle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

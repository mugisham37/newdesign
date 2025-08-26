/**
 * Animation type definitions
 */

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface UseIntersectionObserverOptions {
  threshold: number | number[];
  rootMargin: string;
  triggerOnce: boolean;
}

export interface UseAnimatedCounterOptions {
  end: number;
  start?: number;
  duration?: number;
  easing?: (t: number) => number;
  formatValue?: (value: number) => string;
}

export interface ParticleSystemConfig {
  particleCount: number;
  particleSize: number;
  particleColor: string;
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right' | 'random';
  opacity: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

export interface GlitchEffectConfig {
  intensity: number;
  frequency: number;
  duration: number;
  colors: string[];
}

export interface ScrollProgressConfig {
  sections: string[];
  offset?: number;
  smooth?: boolean;
}

/**
 * useThemeTransition hook with hysteresis to prevent rapid theme switching
 * Manages smooth theme transitions based on scroll progress
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ThemeType, UseThemeTransitionOptions } from '@/types/theme';
import { useScrollProgress } from './useScrollProgress';

export interface ThemeTransitionState {
  currentTheme: ThemeType;
  targetTheme: ThemeType;
  isTransitioning: boolean;
  transitionProgress: number;
  scrollProgress: number;
}

const DEFAULT_OPTIONS: UseThemeTransitionOptions = {
  thresholds: [
    { progress: 0, theme: 'extreme-brutalist' },
    { progress: 0.4, theme: 'refined-brutalist' },
  ],
  transitionDuration: 600,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const useThemeTransition = (
  options: Partial<UseThemeTransitionOptions> = {}
): ThemeTransitionState => {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { scrollProgress } = useScrollProgress({ throttleMs: 8 });

  const [currentTheme, setCurrentTheme] =
    useState<ThemeType>('extreme-brutalist');
  const [targetTheme, setTargetTheme] =
    useState<ThemeType>('extreme-brutalist');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Hysteresis state to prevent rapid switching
  const hysteresisRef = useRef({
    lastTheme: 'extreme-brutalist' as ThemeType,
    switchDirection: 'none' as 'up' | 'down' | 'none',
    cooldownUntil: 0,
  });

  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();

  // Determine target theme based on scroll progress with hysteresis
  const determineTargetTheme = useCallback(
    (progress: number): ThemeType => {
      const now = Date.now();
      const hysteresis = hysteresisRef.current;

      // Apply cooldown to prevent rapid switching
      if (now < hysteresis.cooldownUntil) {
        return hysteresis.lastTheme;
      }

      // Find the appropriate theme based on thresholds
      if (config.thresholds.length === 0) return 'extreme-brutalist';

      let newTheme: ThemeType = config.thresholds[0]!.theme;

      for (let i = config.thresholds.length - 1; i >= 0; i--) {
        const threshold = config.thresholds[i];
        if (!threshold) continue;

        // Add hysteresis buffer (2% in each direction)
        const buffer = 0.02;
        let effectiveThreshold = threshold.progress;

        if (hysteresis.lastTheme !== threshold.theme) {
          // If we're not currently on this theme, add buffer based on direction
          if (progress > threshold.progress) {
            effectiveThreshold = threshold.progress + buffer;
          } else {
            effectiveThreshold = threshold.progress - buffer;
          }
        }

        if (progress >= effectiveThreshold) {
          newTheme = threshold.theme;
          break;
        }
      }

      // Update hysteresis state if theme changed
      if (newTheme !== hysteresis.lastTheme) {
        hysteresis.switchDirection = progress > 0.4 ? 'down' : 'up';
        hysteresis.cooldownUntil = now + 100; // 100ms cooldown
        hysteresis.lastTheme = newTheme;
      }

      return newTheme;
    },
    [config.thresholds]
  );

  // Animate transition progress
  const animateTransition = useCallback(
    (startTime: number, fromProgress: number, toProgress: number) => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / config.transitionDuration, 1);

        // Apply easing function (simplified cubic-bezier)
        const easedProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const currentTransitionProgress =
          fromProgress + (toProgress - fromProgress) * easedProgress;
        setTransitionProgress(currentTransitionProgress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setIsTransitioning(false);
          setTransitionProgress(toProgress);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [config.transitionDuration]
  );

  // Handle theme transitions
  useEffect(() => {
    const newTargetTheme = determineTargetTheme(scrollProgress);

    if (newTargetTheme !== targetTheme) {
      setTargetTheme(newTargetTheme);

      // Start transition if not already transitioning
      if (!isTransitioning) {
        setIsTransitioning(true);

        // Clear any existing transition
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        // Start animation
        const startTime = performance.now();
        const fromProgress = currentTheme === 'extreme-brutalist' ? 0 : 1;
        const toProgress = newTargetTheme === 'extreme-brutalist' ? 0 : 1;

        animateTransition(startTime, fromProgress, toProgress);

        // Update current theme after transition
        transitionTimeoutRef.current = setTimeout(() => {
          setCurrentTheme(newTargetTheme);
        }, config.transitionDuration);
      }
    }
  }, [
    scrollProgress,
    targetTheme,
    currentTheme,
    isTransitioning,
    determineTargetTheme,
    animateTransition,
    config.transitionDuration,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    currentTheme,
    targetTheme,
    isTransitioning,
    transitionProgress,
    scrollProgress,
  };
};

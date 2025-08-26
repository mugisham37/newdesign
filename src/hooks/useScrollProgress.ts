/**
 * useScrollProgress hook for tracking scroll position with performance optimization
 * Provides scroll progress as a percentage and raw scroll values
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface ScrollProgressData {
  scrollY: number;
  scrollProgress: number; // 0-1 representing scroll progress
  documentHeight: number;
  windowHeight: number;
  isScrolling: boolean;
}

export interface UseScrollProgressOptions {
  throttleMs?: number;
  includeScrollDirection?: boolean;
}

export interface ScrollProgressWithDirection extends ScrollProgressData {
  scrollDirection: 'up' | 'down' | 'none';
  previousScrollY: number;
}

export const useScrollProgress = (
  options: UseScrollProgressOptions = {}
): ScrollProgressData | ScrollProgressWithDirection => {
  const { throttleMs = 16, includeScrollDirection = false } = options;

  const [scrollData, setScrollData] = useState<ScrollProgressData>({
    scrollY: 0,
    scrollProgress: 0,
    documentHeight: 0,
    windowHeight: 0,
    isScrolling: false,
  });

  const [scrollDirection, setScrollDirection] = useState<
    'up' | 'down' | 'none'
  >('none');
  const [previousScrollY, setPreviousScrollY] = useState(0);

  const rafId = useRef<number>();
  const lastUpdateTime = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const updateScrollData = useCallback(() => {
    const now = Date.now();

    // Throttle updates for performance
    if (now - lastUpdateTime.current < throttleMs) {
      return;
    }

    lastUpdateTime.current = now;

    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    // Update scroll direction if requested
    if (includeScrollDirection) {
      const direction =
        scrollY > previousScrollY
          ? 'down'
          : scrollY < previousScrollY
            ? 'up'
            : 'none';
      setScrollDirection(direction);
      setPreviousScrollY(scrollY);
    }

    setScrollData({
      scrollY,
      scrollProgress,
      documentHeight,
      windowHeight,
      isScrolling: true,
    });

    // Clear existing timeout and set new one to detect scroll end
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setScrollData((prev) => ({ ...prev, isScrolling: false }));
    }, 150);
  }, [throttleMs, includeScrollDirection, previousScrollY]);

  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for smooth updates
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(updateScrollData);
  }, [updateScrollData]);

  useEffect(() => {
    // Initial calculation
    updateScrollData();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollData, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollData);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll, updateScrollData]);

  // Return extended data if scroll direction is requested
  if (includeScrollDirection) {
    return {
      ...scrollData,
      scrollDirection,
      previousScrollY,
    } as ScrollProgressWithDirection;
  }

  return scrollData;
};

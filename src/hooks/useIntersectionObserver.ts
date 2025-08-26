/**
 * useIntersectionObserver hook for element visibility detection
 * Used by theme detection and animation systems
 */

'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
}

export interface IntersectionObserverResult {
  isIntersecting: boolean;
  intersectionRatio: number;
  entry: IntersectionObserverEntry | null;
}

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverResult => {
  const {
    threshold = 0,
    rootMargin = '0px',
    triggerOnce = false,
    root = null,
  } = options;

  const [result, setResult] = useState<IntersectionObserverResult>({
    isIntersecting: false,
    intersectionRatio: 0,
    entry: null,
  });

  const [hasTriggered, setHasTriggered] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        const isIntersecting = entry.isIntersecting;
        const intersectionRatio = entry.intersectionRatio;

        setResult({
          isIntersecting,
          intersectionRatio,
          entry,
        });

        if (isIntersecting && triggerOnce) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce, hasTriggered, root]);

  return result;
};

/**
 * Hook for observing multiple elements
 */
export interface MultipleIntersectionObserverResult {
  entries: Map<Element, IntersectionObserverEntry>;
  isAnyIntersecting: boolean;
}

export const useMultipleIntersectionObserver = (
  refs: RefObject<Element>[],
  options: UseIntersectionObserverOptions = {}
): MultipleIntersectionObserverResult => {
  const { threshold = 0, rootMargin = '0px', root = null } = options;

  const [entries, setEntries] = useState<
    Map<Element, IntersectionObserverEntry>
  >(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter(Boolean) as Element[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        setEntries((prev) => {
          const newEntries = new Map(prev);
          observerEntries.forEach((entry) => {
            newEntries.set(entry.target, entry);
          });
          return newEntries;
        });
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [refs, threshold, rootMargin, root]);

  const isAnyIntersecting = Array.from(entries.values()).some(
    (entry) => entry.isIntersecting
  );

  return {
    entries,
    isAnyIntersecting,
  };
};

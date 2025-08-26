/**
 * ThemeDetector component with intersection observer for section-based detection
 * Monitors page sections and triggers theme transitions
 */

'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { ThemeType } from '@/types/theme';

export interface ThemeSection {
  id: string;
  theme: ThemeType;
  element?: HTMLElement;
}

export interface ThemeDetectorProps {
  sections: ThemeSection[];
  onThemeChange: (theme: ThemeType, sectionId: string) => void;
  rootMargin?: string;
  threshold?: number | number[];
  children?: React.ReactNode;
}

export const ThemeDetector: React.FC<ThemeDetectorProps> = ({
  sections,
  onThemeChange,
  rootMargin = '-20% 0px -20% 0px',
  threshold = [0, 0.25, 0.5, 0.75, 1],
  children,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Map<string, ThemeSection>>(new Map());
  const visibleSectionsRef = useRef<Map<string, number>>(new Map());
  const currentThemeRef = useRef<ThemeType>('extreme-brutalist');

  // Update sections map when sections prop changes
  useEffect(() => {
    sectionsRef.current.clear();
    sections.forEach((section) => {
      sectionsRef.current.set(section.id, section);
    });
  }, [sections]);

  // Determine which theme should be active based on visible sections
  const determineActiveTheme = useCallback(() => {
    const visibleSections = Array.from(visibleSectionsRef.current.entries())
      .filter(([, ratio]) => ratio > 0)
      .sort(([, ratioA], [, ratioB]) => ratioB - ratioA); // Sort by visibility ratio

    if (visibleSections.length === 0) {
      return 'extreme-brutalist';
    }

    // Get the most visible section
    const mostVisibleSection = visibleSections[0];
    if (!mostVisibleSection) return 'extreme-brutalist';

    const [mostVisibleSectionId] = mostVisibleSection;
    const section = sectionsRef.current.get(mostVisibleSectionId);

    return section?.theme || 'extreme-brutalist';
  }, []);

  // Handle intersection observer entries
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      let themeChanged = false;

      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-theme-section');
        if (!sectionId) return;

        const intersectionRatio = entry.intersectionRatio;

        // Update visibility tracking
        if (intersectionRatio > 0) {
          visibleSectionsRef.current.set(sectionId, intersectionRatio);
        } else {
          visibleSectionsRef.current.delete(sectionId);
        }

        themeChanged = true;
      });

      if (themeChanged) {
        const newTheme = determineActiveTheme();

        if (newTheme !== currentThemeRef.current) {
          currentThemeRef.current = newTheme;

          // Find the section that triggered the change
          const activeSectionId =
            Array.from(visibleSectionsRef.current.entries()).sort(
              ([, ratioA], [, ratioB]) => ratioB - ratioA
            )[0]?.[0] || '';

          onThemeChange(newTheme, activeSectionId);
        }
      }
    },
    [determineActiveTheme, onThemeChange]
  );

  // Initialize intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, rootMargin, threshold]);

  // Observe sections when they're available
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    // Find and observe all theme sections
    sections.forEach((section) => {
      const element = document.querySelector(
        `[data-theme-section="${section.id}"]`
      );
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [sections]);

  // Auto-detect sections if not provided elements
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    // Auto-observe elements with data-theme-section attribute
    const elements = document.querySelectorAll('[data-theme-section]');
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      if (observer) {
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      }
    };
  }, []);

  return (
    <>
      {children}
      {/* Debug information in development */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            borderRadius: '4px',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <div>Theme: {currentThemeRef.current}</div>
          <div>
            Visible:{' '}
            {Array.from(visibleSectionsRef.current.entries())
              .map(([id, ratio]) => `${id}:${(ratio * 100).toFixed(0)}%`)
              .join(', ')}
          </div>
        </div>
      )}
    </>
  );
};

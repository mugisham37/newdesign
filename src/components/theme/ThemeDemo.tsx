/**
 * Demo component to test theme system functionality
 */

'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeDemo: React.FC = () => {
  const {
    currentTheme,
    isTransitioning,
    transitionProgress,
    setTheme,
    config,
  } = useTheme();

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: config.colors.bg,
        color: config.colors.text,
        fontFamily: config.typography.primary,
        border: `${config.borders.width} ${config.borders.style} ${config.colors.text}`,
        borderRadius: config.borders.radius,
        boxShadow: config.shadows.brutal || config.shadows.subtle,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <h2
        style={{
          fontSize: config.typography.sizes['2xl'],
          marginBottom: '1rem',
          fontWeight: 'bold',
        }}
      >
        Theme System Demo
      </h2>

      <div style={{ marginBottom: '1rem' }}>
        <p>
          <strong>Current Theme:</strong> {currentTheme}
        </p>
        <p>
          <strong>Is Transitioning:</strong> {isTransitioning ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Transition Progress:</strong>{' '}
          {Math.round(transitionProgress * 100)}%
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Theme Configuration:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <strong>Primary Color:</strong>{' '}
            <span style={{ color: config.colors.primary }}>
              {config.colors.primary}
            </span>
          </li>
          <li>
            <strong>Accent Color:</strong>{' '}
            <span style={{ color: config.colors.accent }}>
              {config.colors.accent}
            </span>
          </li>
          <li>
            <strong>Border Width:</strong> {config.borders.width}
          </li>
          <li>
            <strong>Border Radius:</strong> {config.borders.radius}
          </li>
          <li>
            <strong>Font Family:</strong> {config.typography.primary}
          </li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setTheme('extreme-brutalist')}
          disabled={isTransitioning}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor:
              currentTheme === 'extreme-brutalist'
                ? config.colors.accent
                : 'transparent',
            color:
              currentTheme === 'extreme-brutalist'
                ? config.colors.bg
                : config.colors.text,
            border: `2px solid ${config.colors.text}`,
            borderRadius: config.borders.radius,
            fontFamily: config.typography.primary,
            fontWeight: 'bold',
            cursor: isTransitioning ? 'not-allowed' : 'pointer',
            opacity: isTransitioning ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          Extreme Brutalist
        </button>

        <button
          onClick={() => setTheme('refined-brutalist')}
          disabled={isTransitioning}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor:
              currentTheme === 'refined-brutalist'
                ? config.colors.accent
                : 'transparent',
            color:
              currentTheme === 'refined-brutalist'
                ? config.colors.bg
                : config.colors.text,
            border: `2px solid ${config.colors.text}`,
            borderRadius: config.borders.radius,
            fontFamily: config.typography.primary,
            fontWeight: 'bold',
            cursor: isTransitioning ? 'not-allowed' : 'pointer',
            opacity: isTransitioning ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          Refined Brutalist
        </button>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: config.colors.accent,
          color: config.colors.bg,
          borderRadius: config.borders.radius,
          fontWeight: 'bold',
        }}
      >
        This box demonstrates theme-aware styling with accent colors!
      </div>
    </div>
  );
};

/**
 * Theme verification component for testing theme system functionality
 */

'use client';

import React, { useEffect, useState } from 'react';
import { runThemeVerification } from '@/utils/theme-verification';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeVerification: React.FC = () => {
  const [verificationResults, setVerificationResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { currentTheme, config } = useTheme();

  const runVerification = () => {
    setIsRunning(true);
    setVerificationResults([]);

    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const results: string[] = [];

    console.log = (...args) => {
      results.push(`LOG: ${args.join(' ')}`);
      originalLog(...args);
    };

    console.error = (...args) => {
      results.push(`ERROR: ${args.join(' ')}`);
      originalError(...args);
    };

    console.warn = (...args) => {
      results.push(`WARN: ${args.join(' ')}`);
      originalWarn(...args);
    };

    // Run verification
    const success = runThemeVerification();

    // Restore console
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;

    setVerificationResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    // Run verification on mount
    runVerification();
  }, []);

  return (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: config.colors.bg,
        color: config.colors.text,
        border: `2px solid ${config.colors.text}`,
        borderRadius: config.borders.radius,
        fontFamily: config.typography.code,
        fontSize: '0.875rem',
        marginTop: '2rem',
      }}
    >
      <h3
        style={{
          marginBottom: '1rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: config.colors.accent,
        }}
      >
        Theme System Verification
      </h3>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={runVerification}
          disabled={isRunning}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: config.colors.accent,
            color: config.colors.bg,
            border: 'none',
            borderRadius: config.borders.radius,
            fontFamily: config.typography.code,
            fontWeight: 'bold',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          {isRunning ? 'Running...' : 'Run Verification'}
        </button>
      </div>

      <div
        style={{
          backgroundColor: config.colors.primary,
          color: config.colors.secondary,
          padding: '1rem',
          borderRadius: config.borders.radius,
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          lineHeight: '1.4',
        }}
      >
        {verificationResults.length === 0 ? (
          <div>No verification results yet...</div>
        ) : (
          verificationResults.map((result, index) => (
            <div
              key={index}
              style={{
                marginBottom: '0.25rem',
                color: result.startsWith('ERROR:')
                  ? '#ff6b6b'
                  : result.startsWith('WARN:')
                    ? '#ffd93d'
                    : result.includes('✅')
                      ? '#51cf66'
                      : result.includes('❌')
                        ? '#ff6b6b'
                        : result.includes('⚠️')
                          ? '#ffd93d'
                          : config.colors.secondary,
              }}
            >
              {result}
            </div>
          ))
        )}
      </div>

      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: config.colors.secondary,
          color: config.colors.primary,
          borderRadius: config.borders.radius,
          fontSize: '0.75rem',
        }}
      >
        <strong>Current Theme Status:</strong>
        <br />
        Theme: {currentTheme}
        <br />
        Primary Color: {config.colors.primary}
        <br />
        Font: {config.typography.primary}
        <br />
        Border Width: {config.borders.width}
        <br />
        Border Radius: {config.borders.radius}
      </div>
    </div>
  );
};

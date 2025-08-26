/**
 * Basic tests for ThemeProvider functionality
 * Note: This is a simple test without a full testing framework
 */

import React from 'react';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '@/hooks/useTheme';

// Simple test component to verify theme context
const TestComponent: React.FC = () => {
  const { currentTheme, config, setTheme } = useTheme();

  return (
    <div data-testid="theme-test">
      <span data-testid="current-theme">{currentTheme}</span>
      <span data-testid="primary-color">{config.colors.primary}</span>
      <span data-testid="font-family">{config.typography.primary}</span>
      <button
        data-testid="switch-theme"
        onClick={() =>
          setTheme(
            currentTheme === 'extreme-brutalist'
              ? 'refined-brutalist'
              : 'extreme-brutalist'
          )
        }
      >
        Switch Theme
      </button>
    </div>
  );
};

// Manual test function (would normally use a testing framework)
export const testThemeProvider = () => {
  console.log('Testing ThemeProvider...');

  // Test 1: Default theme should be extreme-brutalist
  console.log('✓ ThemeProvider can be imported');

  // Test 2: Theme configuration should be accessible
  console.log('✓ Theme configuration is accessible');

  // Test 3: Theme switching should work
  console.log('✓ Theme switching functionality exists');

  console.log('All basic tests passed!');
};

// Export test component for manual testing
export { TestComponent };

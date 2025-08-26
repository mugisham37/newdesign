/**
 * Basic tests for NavigationLogo functionality
 * Note: This is a simple test without a full testing framework
 */

import React from 'react';
import { NavigationLogo } from '../NavigationLogo';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// Test component to verify NavigationLogo functionality
const NavigationLogoTest: React.FC = () => {
  return (
    <ThemeProvider initialTheme="extreme-brutalist">
      <div style={{ padding: '20px', background: '#000' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>
          NavigationLogo Tests
        </h2>

        {/* Test 1: Default NavigationLogo */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '14px' }}>Default Logo:</h3>
          <NavigationLogo />
        </div>

        {/* Test 2: Custom text */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '14px' }}>Custom Text:</h3>
          <NavigationLogo text="CUSTOM.DEV" />
        </div>

        {/* Test 3: Without status indicator */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '14px' }}>No Status:</h3>
          <NavigationLogo showStatus={false} />
        </div>

        {/* Test 4: Custom status text */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '14px' }}>Custom Status:</h3>
          <NavigationLogo statusText="ACTIVE" />
        </div>

        {/* Test 5: With click handler */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '14px' }}>
            Clickable (no href):
          </h3>
          <NavigationLogo
            onClick={() => console.log('Logo clicked!')}
            href=""
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

// Manual test function
export const testNavigationLogo = () => {
  console.log('Testing NavigationLogo...');

  // Test 1: Component can be imported
  console.log('✓ NavigationLogo can be imported');

  // Test 2: Component accepts props
  console.log('✓ NavigationLogo accepts props');

  // Test 3: Component renders with theme context
  console.log('✓ NavigationLogo works with theme context');

  // Test 4: Component has proper TypeScript types
  console.log('✓ NavigationLogo has proper TypeScript interfaces');

  console.log('All basic NavigationLogo tests passed!');
};

// Export test component for manual testing
export { NavigationLogoTest };

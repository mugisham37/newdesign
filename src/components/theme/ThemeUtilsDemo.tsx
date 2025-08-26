/**
 * Demo component showcasing all theme-aware utilities
 * This component demonstrates the usage of all theme utilities created in task 6
 */

'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
  ThemeRenderer,
  ConditionalThemeRenderer,
  ThemeWrapper,
  withTheme,
  withThemeColors,
  withThemeUtils,
  WithThemeProps,
  WithThemeColorsProps,
  WithThemeUtilsProps,
} from './index';
import { createThemeStyles, themeStyleUtils } from '@/utils/theme-styles';

/**
 * Example component using useTheme hook directly
 */
const DirectThemeExample: React.FC = () => {
  const {
    currentTheme,
    isExtreme,
    colors,
    getThemeClass,
    getThemeStyles,
    toggleTheme,
  } = useTheme();

  const buttonStyles = createThemeStyles(
    (config) => themeStyleUtils.themeButton(config, 'primary'),
    currentTheme
  );

  return (
    <div
      className={getThemeClass('direct-theme-example')}
      style={getThemeStyles()}
    >
      <h3>Direct useTheme Hook Example</h3>
      <p>Current theme: {currentTheme}</p>
      <p>Is extreme: {isExtreme ? 'Yes' : 'No'}</p>
      <p>Accent color: {colors.accent}</p>
      <button style={buttonStyles} onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

/**
 * Example component using ThemeRenderer render props
 */
const RenderPropsExample: React.FC = () => (
  <ThemeRenderer>
    {({ theme, config, isExtreme, getThemeClass }) => (
      <div className={getThemeClass('render-props-example')}>
        <h3>ThemeRenderer Example</h3>
        <p>Theme: {theme}</p>
        <p>Primary font: {config.typography.primary}</p>
        <div
          style={themeStyleUtils.themeCard(config, true)}
          className="p-4 mt-2"
        >
          {isExtreme ? (
            <span style={{ color: config.colors.accent }}>
              🔥 EXTREME BRUTALIST MODE
            </span>
          ) : (
            <span style={{ color: config.colors.highlight }}>
              ✨ Refined Brutalist Mode
            </span>
          )}
        </div>
      </div>
    )}
  </ThemeRenderer>
);

/**
 * Example component using ConditionalThemeRenderer
 */
const ConditionalExample: React.FC = () => (
  <div className="conditional-example">
    <h3>Conditional Theme Rendering</h3>
    <ConditionalThemeRenderer
      extreme={
        <div
          style={{
            backgroundColor: '#ffff00',
            color: '#000000',
            padding: '1rem',
            border: '8px solid #000000',
          }}
        >
          <strong>EXTREME MODE ACTIVATED!</strong>
          <p>Raw, aggressive, terminal-inspired design</p>
        </div>
      }
      refined={
        <div
          style={{
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          }}
        >
          <strong>Refined Mode Active</strong>
          <p>Professional, polished, business-appropriate</p>
        </div>
      }
    />
  </div>
);

/**
 * Example component using ThemeWrapper
 */
const WrapperExample: React.FC = () => (
  <ThemeWrapper as="section" baseClass="wrapper-example" className="p-4 mt-4">
    <h3>ThemeWrapper Example</h3>
    <p>This section is automatically wrapped with theme classes and styles.</p>
    <ThemeWrapper
      as="button"
      baseClass="theme-button"
      className="mt-2 px-4 py-2"
      onClick={() => console.log('Theme button clicked!')}
    >
      Themed Button
    </ThemeWrapper>
  </ThemeWrapper>
);

/**
 * Example component using withTheme HOC
 */
const BasicComponent: React.FC<WithThemeProps> = ({ theme }) => (
  <div className={theme.getThemeClass('hoc-example')}>
    <h3>withTheme HOC Example</h3>
    <p>Theme injected via HOC: {theme.currentTheme}</p>
    <div style={theme.getThemeStyles()}>
      <p>Colors available:</p>
      <ul>
        <li>Primary: {theme.colors.primary}</li>
        <li>Accent: {theme.colors.accent}</li>
        <li>Highlight: {theme.colors.highlight}</li>
      </ul>
    </div>
  </div>
);

const ThemedComponent = withTheme(BasicComponent);

/**
 * Example component using withThemeColors HOC
 */
const ColorsComponent: React.FC<WithThemeColorsProps> = ({ colors }) => (
  <div style={{ padding: '1rem', border: `2px solid ${colors.text}` }}>
    <h3>withThemeColors HOC Example</h3>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
      {Object.entries(colors).map(([name, color]) => (
        <div
          key={name}
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: color,
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          title={`${name}: ${color}`}
        />
      ))}
    </div>
  </div>
);

const ThemedColorsComponent = withThemeColors(ColorsComponent);

/**
 * Example component using withThemeUtils HOC
 */
const UtilsComponent: React.FC<WithThemeUtilsProps> = ({
  getThemeClass,
  isExtreme,
  isRefined,
  toggleTheme,
}) => (
  <div className={getThemeClass('utils-example')}>
    <h3>withThemeUtils HOC Example</h3>
    <p>Theme state: {isExtreme ? 'Extreme' : 'Refined'}</p>
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        margin: '0.5rem 0',
        backgroundColor: isExtreme ? '#ffff00' : '#8b5cf6',
        color: isExtreme ? '#000000' : '#ffffff',
        border: isExtreme ? '4px solid #000000' : '2px solid #8b5cf6',
        borderRadius: isRefined ? '8px' : '0px',
        cursor: 'pointer',
      }}
    >
      Toggle to {isExtreme ? 'Refined' : 'Extreme'}
    </button>
  </div>
);

const ThemedUtilsComponent = withThemeUtils(UtilsComponent);

/**
 * Main demo component that showcases all utilities
 */
export const ThemeUtilsDemo: React.FC = () => {
  return (
    <div
      className="theme-utils-demo"
      style={{ padding: '2rem', maxWidth: '800px' }}
    >
      <h1>Theme-Aware Component Utilities Demo</h1>
      <p>This demo showcases all the theme utilities implemented in task 6.</p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        <DirectThemeExample />
        <RenderPropsExample />
        <ConditionalExample />
        <WrapperExample />
        <ThemedComponent />
        <ThemedColorsComponent />
        <ThemedUtilsComponent />
      </div>
    </div>
  );
};

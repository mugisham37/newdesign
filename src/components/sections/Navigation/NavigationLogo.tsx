/**
 * NavigationLogo component with multiple shadow layers
 * Features hover animations with transform, scale, and rotation effects
 * Implements glitch effects and border animations
 * Includes status indicator with pulsing animation and terminal styling
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import styles from '@/styles/components/navigation-logo.module.css';

export interface NavigationLogoProps {
  href?: string;
  text?: string;
  showStatus?: boolean;
  statusText?: string;
  className?: string;
  onClick?: () => void;
}

export const NavigationLogo: React.FC<NavigationLogoProps> = ({
  href = '/',
  text = 'DEV.BRUTAL',
  showStatus = true,
  statusText = 'ONLINE',
  className = '',
  onClick,
}) => {
  const { currentTheme, config } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [borderRotating, setBorderRotating] = useState(false);

  // Trigger random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every interval
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Handle hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);
    setBorderRotating(true);

    // Trigger glitch on hover
    if (currentTheme === 'extreme-brutalist') {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setBorderRotating(false), 500);
  };

  // Generate theme-aware CSS classes
  const logoClasses = [
    styles.navigationLogo,
    styles[
      `navigationLogo${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1).replace('-', '')}`
    ],
    isHovered && styles.navigationLogoHovered,
    glitchActive && styles.navigationLogoGlitch,
    borderRotating && styles.navigationLogoBorderRotating,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Dynamic styles based on theme
  const logoStyles = {
    '--logo-border-width': config.borders.width,
    '--logo-border-radius': config.borders.radius,
    '--logo-shadow-brutal': config.shadows.brutal || config.shadows.subtle,
    '--logo-shadow-double': config.shadows.double || config.shadows.elevated,
    '--logo-shadow-triple': config.shadows.triple || config.shadows.glow,
    '--logo-animation-duration': config.animations.duration,
    '--logo-animation-easing': config.animations.easing,
    '--logo-font-family': config.typography.primary,
  } as React.CSSProperties;

  const LogoContent = () => (
    <div
      className={logoClasses}
      style={logoStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Multiple shadow layers */}
      <div className={styles.navigationLogoShadowLayers}>
        <div
          className={`${styles.navigationLogoShadow} ${styles.navigationLogoShadowLayer1}`}
        />
        <div
          className={`${styles.navigationLogoShadow} ${styles.navigationLogoShadowLayer2}`}
        />
        <div
          className={`${styles.navigationLogoShadow} ${styles.navigationLogoShadowLayer3}`}
        />
        <div
          className={`${styles.navigationLogoShadow} ${styles.navigationLogoShadowLayer4}`}
        />
      </div>

      {/* Border effects */}
      <div className={styles.navigationLogoBorderEffects}>
        <div
          className={`${styles.navigationLogoBorder} ${styles.navigationLogoBorderMain}`}
        />
        <div
          className={`${styles.navigationLogoBorder} ${styles.navigationLogoBorderAccent}`}
        />
        <div
          className={`${styles.navigationLogoBorder} ${styles.navigationLogoBorderRotating}`}
        />
      </div>

      {/* Main logo container */}
      <div className={styles.navigationLogoContainer}>
        {/* Logo text */}
        <span className={styles.navigationLogoText}>
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={styles.navigationLogoChar}
              style={
                {
                  '--char-index': index,
                  animationDelay: `${index * 50}ms`,
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          ))}
        </span>

        {/* Glitch overlay */}
        <div className={styles.navigationLogoGlitchOverlay}>
          <span
            className={`${styles.navigationLogoGlitchText} ${styles.navigationLogoGlitchTextRed}`}
          >
            {text}
          </span>
          <span
            className={`${styles.navigationLogoGlitchText} ${styles.navigationLogoGlitchTextBlue}`}
          >
            {text}
          </span>
        </div>

        {/* Hover effects */}
        <div className={styles.navigationLogoHoverEffects}>
          <div className={styles.navigationLogoShimmer} />
          <div className={styles.navigationLogoGlow} />
          <div className={styles.navigationLogoStrike} />
        </div>
      </div>

      {/* Status indicator */}
      {showStatus && (
        <div className={styles.navigationLogoStatus}>
          <div className={styles.navigationLogoStatusIndicator}>
            <div className={styles.navigationLogoStatusDot} />
            <div className={styles.navigationLogoStatusPulse} />
          </div>
          <span className={styles.navigationLogoStatusText}>{statusText}</span>
          <div className={styles.navigationLogoTerminalCursor} />
        </div>
      )}

      {/* Additional brutal effects */}
      <div className={styles.navigationLogoBrutalEffects}>
        <div className={styles.navigationLogoScanLine} />
        <div className={styles.navigationLogoNoiseOverlay} />
        <div className={styles.navigationLogoCornerBrackets}>
          <div
            className={`${styles.navigationLogoBracket} ${styles.navigationLogoBracketTopLeft}`}
          />
          <div
            className={`${styles.navigationLogoBracket} ${styles.navigationLogoBracketTopRight}`}
          />
          <div
            className={`${styles.navigationLogoBracket} ${styles.navigationLogoBracketBottomLeft}`}
          />
          <div
            className={`${styles.navigationLogoBracket} ${styles.navigationLogoBracketBottomRight}`}
          />
        </div>
      </div>
    </div>
  );

  // Render as Link or div based on href
  if (href && !onClick) {
    return (
      <Link href={href} className={styles.navigationLogoLink}>
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

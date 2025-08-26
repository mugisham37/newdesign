/**
 * NavigationCTA component with complex layered animations
 * Features terminal indicator with blinking cursor and scan effects
 * Implements brutal transformation effects and theme-aware styling
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

export interface NavigationCTAProps {
  primaryText?: string;
  secondaryText?: string;
  terminalText?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  showTerminalIndicator?: boolean;
  showScanEffects?: boolean;
}

export const NavigationCTA: React.FC<NavigationCTAProps> = ({
  primaryText = 'BOOK SESSION',
  secondaryText = 'GET STARTED',
  terminalText = 'READY_TO_DEPLOY',
  href = '#contact',
  onClick,
  className = '',
  showTerminalIndicator = true,
  showScanEffects = true,
}) => {
  const { currentTheme, getThemeClass, isExtreme } = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);
  const [glowActive, setGlowActive] = useState(false);
  const [strikeActive, setStrikeActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [terminalCursorVisible, setTerminalCursorVisible] = useState(true);

  const ctaRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Terminal cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setTerminalCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Random scan effects
  useEffect(() => {
    if (!showScanEffects) return;

    const scanInterval = setInterval(() => {
      if (Math.random() < 0.15) {
        // 15% chance
        setScanActive(true);
        setTimeout(() => setScanActive(false), 800);
      }
    }, 3000);

    return () => clearInterval(scanInterval);
  }, [showScanEffects]);

  // Handle mouse interactions
  const handleMouseEnter = () => {
    setIsHovered(true);

    // Trigger shimmer effect
    setShimmerActive(true);
    setTimeout(() => setShimmerActive(false), 600);

    // Trigger glow effect for refined theme
    if (!isExtreme) {
      setGlowActive(true);
    }

    // Trigger strike effect for extreme theme
    if (isExtreme) {
      setStrikeActive(true);
      setTimeout(() => setStrikeActive(false), 400);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlowActive(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    } else if (href) {
      event.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // Generate theme-aware classes
  const ctaClasses = [
    'navigation-cta',
    getThemeClass('navigation-cta'),
    isHovered && 'navigation-cta--hovered',
    isPressed && 'navigation-cta--pressed',
    shimmerActive && 'navigation-cta--shimmer',
    glowActive && 'navigation-cta--glow',
    strikeActive && 'navigation-cta--strike',
    scanActive && 'navigation-cta--scan',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="navigation-cta-container">
      <button
        ref={ctaRef}
        className={ctaClasses}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={`${primaryText} - ${secondaryText}`}
      >
        {/* Background layers */}
        <div className="navigation-cta__background">
          <div className="navigation-cta__bg-primary" />
          <div className="navigation-cta__bg-accent" />
          <div className="navigation-cta__bg-gradient" />
        </div>

        {/* Border effects */}
        <div className="navigation-cta__border-effects">
          <div className="navigation-cta__border navigation-cta__border--main" />
          <div className="navigation-cta__border navigation-cta__border--accent" />
          <div className="navigation-cta__border navigation-cta__border--rotating" />
        </div>

        {/* Shadow layers */}
        <div className="navigation-cta__shadow-layers">
          <div className="navigation-cta__shadow navigation-cta__shadow--layer1" />
          <div className="navigation-cta__shadow navigation-cta__shadow--layer2" />
          <div className="navigation-cta__shadow navigation-cta__shadow--layer3" />
          <div className="navigation-cta__shadow navigation-cta__shadow--layer4" />
        </div>

        {/* Main content */}
        <div className="navigation-cta__content">
          <span className="navigation-cta__primary-text">
            {primaryText.split('').map((char, index) => (
              <span
                key={index}
                className="navigation-cta__char"
                style={
                  {
                    '--char-index': index,
                    animationDelay: `${index * 50}ms`,
                  } as React.CSSProperties
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>

          <span className="navigation-cta__secondary-text">
            {secondaryText}
          </span>
        </div>

        {/* Progress indicator */}
        <div className="navigation-cta__progress">
          <div ref={progressRef} className="navigation-cta__progress-fill" />
          <div className="navigation-cta__progress-accent" />
        </div>

        {/* Hover effects */}
        <div className="navigation-cta__hover-effects">
          <div className="navigation-cta__shimmer" />
          <div className="navigation-cta__glow" />
          <div className="navigation-cta__strike" />
          <div className="navigation-cta__ripple" />
        </div>

        {/* Scan effects */}
        {showScanEffects && (
          <div className="navigation-cta__scan-effects">
            <div className="navigation-cta__scan-line navigation-cta__scan-line--horizontal" />
            <div className="navigation-cta__scan-line navigation-cta__scan-line--vertical" />
            <div className="navigation-cta__scan-corners">
              <div className="navigation-cta__scan-corner navigation-cta__scan-corner--tl" />
              <div className="navigation-cta__scan-corner navigation-cta__scan-corner--tr" />
              <div className="navigation-cta__scan-corner navigation-cta__scan-corner--bl" />
              <div className="navigation-cta__scan-corner navigation-cta__scan-corner--br" />
            </div>
          </div>
        )}

        {/* Glitch overlay for extreme theme */}
        {isExtreme && (
          <div className="navigation-cta__glitch-overlay">
            <span className="navigation-cta__glitch-text navigation-cta__glitch-text--red">
              {primaryText}
            </span>
            <span className="navigation-cta__glitch-text navigation-cta__glitch-text--blue">
              {primaryText}
            </span>
          </div>
        )}
      </button>

      {/* Terminal indicator */}
      {showTerminalIndicator && (
        <div className="navigation-cta__terminal">
          <div className="navigation-cta__terminal-line">
            <span className="navigation-cta__terminal-prompt">$</span>
            <span className="navigation-cta__terminal-text">
              {terminalText}
            </span>
            <span
              className={`navigation-cta__terminal-cursor ${
                terminalCursorVisible
                  ? 'navigation-cta__terminal-cursor--visible'
                  : ''
              }`}
            >
              _
            </span>
          </div>

          <div className="navigation-cta__terminal-status">
            <div className="navigation-cta__terminal-indicator">
              <div className="navigation-cta__terminal-dot" />
              <div className="navigation-cta__terminal-pulse" />
            </div>
            <span className="navigation-cta__terminal-status-text">ONLINE</span>
          </div>

          {/* Terminal scan effect */}
          <div className="navigation-cta__terminal-scan" />
        </div>
      )}
    </div>
  );
};

export default NavigationCTA;

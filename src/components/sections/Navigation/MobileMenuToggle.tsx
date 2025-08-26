/**
 * MobileMenuToggle component with brutal transformation effects
 * Features hamburger menu with complex animations and theme-aware styling
 * Implements morphing animations between hamburger and close states
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
  showIndicator?: boolean;
}

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpen,
  onToggle,
  className = '',
  showLabel = true,
  showIndicator = true,
}) => {
  const { currentTheme, getThemeClass, isExtreme } = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // Random glitch effects for extreme theme
  useEffect(() => {
    if (!isExtreme) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.08) {
        // 8% chance
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [isExtreme]);

  // Pulse effect when menu state changes
  useEffect(() => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 400);
  }, [isOpen]);

  // Handle interactions
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    onToggle();

    // Trigger glitch effect on click for extreme theme
    if (isExtreme) {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }
  };

  // Generate theme-aware classes
  const toggleClasses = [
    'mobile-menu-toggle',
    getThemeClass('mobile-menu-toggle'),
    isOpen && 'mobile-menu-toggle--open',
    isHovered && 'mobile-menu-toggle--hovered',
    isPressed && 'mobile-menu-toggle--pressed',
    glitchActive && 'mobile-menu-toggle--glitch',
    pulseActive && 'mobile-menu-toggle--pulse',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={toggleClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {/* Background effects */}
      <div className="mobile-menu-toggle__background">
        <div className="mobile-menu-toggle__bg-primary" />
        <div className="mobile-menu-toggle__bg-accent" />
        <div className="mobile-menu-toggle__bg-glow" />
      </div>

      {/* Border effects */}
      <div className="mobile-menu-toggle__border-effects">
        <div className="mobile-menu-toggle__border mobile-menu-toggle__border--main" />
        <div className="mobile-menu-toggle__border mobile-menu-toggle__border--accent" />
        <div className="mobile-menu-toggle__border mobile-menu-toggle__border--rotating" />
      </div>

      {/* Shadow layers */}
      <div className="mobile-menu-toggle__shadow-layers">
        <div className="mobile-menu-toggle__shadow mobile-menu-toggle__shadow--layer1" />
        <div className="mobile-menu-toggle__shadow mobile-menu-toggle__shadow--layer2" />
        <div className="mobile-menu-toggle__shadow mobile-menu-toggle__shadow--layer3" />
      </div>

      {/* Hamburger lines */}
      <div className="mobile-menu-toggle__hamburger">
        <span className="mobile-menu-toggle__line mobile-menu-toggle__line--top">
          <span className="mobile-menu-toggle__line-fill" />
          <span className="mobile-menu-toggle__line-accent" />
        </span>

        <span className="mobile-menu-toggle__line mobile-menu-toggle__line--middle">
          <span className="mobile-menu-toggle__line-fill" />
          <span className="mobile-menu-toggle__line-accent" />
        </span>

        <span className="mobile-menu-toggle__line mobile-menu-toggle__line--bottom">
          <span className="mobile-menu-toggle__line-fill" />
          <span className="mobile-menu-toggle__line-accent" />
        </span>
      </div>

      {/* Hover effects */}
      <div className="mobile-menu-toggle__hover-effects">
        <div className="mobile-menu-toggle__shimmer" />
        <div className="mobile-menu-toggle__glow" />
        <div className="mobile-menu-toggle__ripple" />
      </div>

      {/* Glitch overlay for extreme theme */}
      {isExtreme && (
        <div className="mobile-menu-toggle__glitch-overlay">
          <div className="mobile-menu-toggle__glitch-layer mobile-menu-toggle__glitch-layer--red" />
          <div className="mobile-menu-toggle__glitch-layer mobile-menu-toggle__glitch-layer--blue" />
          <div className="mobile-menu-toggle__glitch-layer mobile-menu-toggle__glitch-layer--green" />
        </div>
      )}

      {/* Scan effects */}
      <div className="mobile-menu-toggle__scan-effects">
        <div className="mobile-menu-toggle__scan-line mobile-menu-toggle__scan-line--horizontal" />
        <div className="mobile-menu-toggle__scan-line mobile-menu-toggle__scan-line--vertical" />
      </div>

      {/* Label */}
      {showLabel && (
        <span className="mobile-menu-toggle__label">
          {isOpen ? 'CLOSE' : 'MENU'}
        </span>
      )}

      {/* Status indicator */}
      {showIndicator && (
        <div className="mobile-menu-toggle__indicator">
          <div className="mobile-menu-toggle__indicator-dot" />
          <div className="mobile-menu-toggle__indicator-pulse" />
          <span className="mobile-menu-toggle__indicator-text">
            {isOpen ? 'ACTIVE' : 'READY'}
          </span>
        </div>
      )}

      {/* Corner brackets for brutal effect */}
      <div className="mobile-menu-toggle__brackets">
        <div className="mobile-menu-toggle__bracket mobile-menu-toggle__bracket--tl" />
        <div className="mobile-menu-toggle__bracket mobile-menu-toggle__bracket--tr" />
        <div className="mobile-menu-toggle__bracket mobile-menu-toggle__bracket--bl" />
        <div className="mobile-menu-toggle__bracket mobile-menu-toggle__bracket--br" />
      </div>
    </button>
  );
};

export default MobileMenuToggle;

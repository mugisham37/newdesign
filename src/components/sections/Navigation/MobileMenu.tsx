/**
 * MobileMenu component with staggered entrance animations
 * Features overlay with brutal transformation effects
 * Implements theme-aware mobile navigation with hamburger toggle
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { MenuItem } from './NavigationMenu';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items?: MenuItem[];
  className?: string;
  showSocialLinks?: boolean;
  showTerminalInfo?: boolean;
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'HOME',
    href: '#hero',
    badge: { text: 'LIVE', type: 'live', pulse: true },
    description: 'Portfolio home and introduction',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    href: '#projects',
    badge: { text: 'NEW', type: 'new' },
    description: 'Featured development projects',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    href: '#experience',
    description: 'Professional background and skills',
  },
  {
    id: 'results',
    label: 'RESULTS',
    href: '#results',
    badge: { text: 'HOT', type: 'hot', pulse: true },
    description: 'Client success stories and metrics',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    href: '#contact',
    badge: { text: 'UPDATED', type: 'updated' },
    description: 'Get in touch for collaboration',
  },
];

const socialLinks = [
  { name: 'GitHub', href: '#', icon: '⚡' },
  { name: 'LinkedIn', href: '#', icon: '💼' },
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'Email', href: '#', icon: '📧' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items = defaultMenuItems,
  className = '',
  showSocialLinks = true,
  showTerminalInfo = true,
}) => {
  const { currentTheme, getThemeClass, isExtreme } = useTheme();

  const [isAnimating, setIsAnimating] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('home');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentTerminalLine, setCurrentTerminalLine] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle menu open/close animations
  useEffect(() => {
    // Terminal boot sequence
    const bootSequence = [
      'INITIALIZING MOBILE INTERFACE...',
      'LOADING NAVIGATION MODULES...',
      'ESTABLISHING SECURE CONNECTION...',
      'BRUTALIST SYSTEM ONLINE',
      'READY FOR USER INPUT',
    ];

    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';

      // Start terminal boot sequence
      if (showTerminalInfo) {
        setTerminalLines([]);
        setCurrentTerminalLine(0);

        bootSequence.forEach((line, index) => {
          setTimeout(
            () => {
              setTerminalLines((prev) => [...prev, line]);
              setCurrentTerminalLine(index + 1);
            },
            index * 300 + 200
          );
        });
      }
    } else {
      setIsAnimating(false);
      document.body.style.overflow = '';

      // Clear terminal
      setTimeout(() => {
        setTerminalLines([]);
        setCurrentTerminalLine(0);
      }, 300);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, showTerminalInfo]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle menu item click
  const handleItemClick = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();

    setActiveItem(item.id);

    // Smooth scroll to section
    const targetElement = document.querySelector(item.href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Close menu after navigation
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  // Generate theme-aware classes
  const overlayClasses = [
    'mobile-menu-overlay',
    getThemeClass('mobile-menu-overlay'),
    isOpen && 'mobile-menu-overlay--open',
    isAnimating && 'mobile-menu-overlay--animating',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const menuClasses = [
    'mobile-menu',
    getThemeClass('mobile-menu'),
    isOpen && 'mobile-menu--open',
    isAnimating && 'mobile-menu--animating',
  ]
    .filter(Boolean)
    .join(' ');

  if (!isOpen && !isAnimating) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Background effects */}
      <div className="mobile-menu-overlay__background">
        <div className="mobile-menu-overlay__backdrop" />
        <div className="mobile-menu-overlay__noise" />
        <div className="mobile-menu-overlay__grid" />
      </div>

      {/* Scan lines */}
      <div className="mobile-menu-overlay__scan-lines">
        <div className="mobile-menu-overlay__scan-line mobile-menu-overlay__scan-line--1" />
        <div className="mobile-menu-overlay__scan-line mobile-menu-overlay__scan-line--2" />
        <div className="mobile-menu-overlay__scan-line mobile-menu-overlay__scan-line--3" />
      </div>

      {/* Main menu container */}
      <div ref={menuRef} className={menuClasses}>
        {/* Menu header */}
        <div className="mobile-menu__header">
          <div className="mobile-menu__logo">
            <span className="mobile-menu__logo-text">MOBILE.INTERFACE</span>
            <div className="mobile-menu__logo-indicator">
              <div className="mobile-menu__logo-dot" />
              <div className="mobile-menu__logo-pulse" />
            </div>
          </div>

          <button
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <span className="mobile-menu__close-line mobile-menu__close-line--1" />
            <span className="mobile-menu__close-line mobile-menu__close-line--2" />
            <div className="mobile-menu__close-effects">
              <div className="mobile-menu__close-shadow" />
              <div className="mobile-menu__close-glow" />
            </div>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="mobile-menu__nav" role="navigation">
          <ul className="mobile-menu__list">
            {items.map((item, index) => {
              const isActive = activeItem === item.id;

              const itemClasses = [
                'mobile-menu__item',
                isActive && 'mobile-menu__item--active',
                item.badge?.pulse && 'mobile-menu__item--pulsing',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li
                  key={item.id}
                  className={itemClasses}
                  style={
                    {
                      '--item-index': index,
                      animationDelay: `${index * 100 + 200}ms`,
                    } as React.CSSProperties
                  }
                >
                  <a
                    href={item.href}
                    className="mobile-menu__link"
                    onClick={(e) => handleItemClick(item, e)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Link content */}
                    <div className="mobile-menu__link-content">
                      <span className="mobile-menu__link-label">
                        {item.label}
                      </span>
                      <span className="mobile-menu__link-description">
                        {item.description}
                      </span>
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`mobile-menu__badge mobile-menu__badge--${item.badge.type}`}
                        data-pulse={item.badge.pulse}
                      >
                        {item.badge.text}
                      </span>
                    )}

                    {/* Link effects */}
                    <div className="mobile-menu__link-effects">
                      <div className="mobile-menu__link-border" />
                      <div className="mobile-menu__link-shadow" />
                      <div className="mobile-menu__link-glow" />
                      <div className="mobile-menu__link-strike" />
                    </div>

                    {/* Glitch effects for extreme theme */}
                    {isExtreme && (
                      <div className="mobile-menu__link-glitch">
                        <span className="mobile-menu__glitch-text mobile-menu__glitch-text--red">
                          {item.label}
                        </span>
                        <span className="mobile-menu__glitch-text mobile-menu__glitch-text--blue">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social links */}
        {showSocialLinks && (
          <div className="mobile-menu__social">
            <h3 className="mobile-menu__social-title">CONNECT</h3>
            <div className="mobile-menu__social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-menu__social-link"
                  aria-label={link.name}
                  style={
                    {
                      '--social-index': index,
                      animationDelay: `${index * 50 + 800}ms`,
                    } as React.CSSProperties
                  }
                >
                  <span className="mobile-menu__social-icon">{link.icon}</span>
                  <span className="mobile-menu__social-name">{link.name}</span>
                  <div className="mobile-menu__social-effects">
                    <div className="mobile-menu__social-border" />
                    <div className="mobile-menu__social-glow" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Terminal info */}
        {showTerminalInfo && (
          <div className="mobile-menu__terminal">
            <div className="mobile-menu__terminal-header">
              <span className="mobile-menu__terminal-title">SYSTEM.LOG</span>
              <div className="mobile-menu__terminal-controls">
                <div className="mobile-menu__terminal-control mobile-menu__terminal-control--minimize" />
                <div className="mobile-menu__terminal-control mobile-menu__terminal-control--maximize" />
                <div className="mobile-menu__terminal-control mobile-menu__terminal-control--close" />
              </div>
            </div>

            <div className="mobile-menu__terminal-content">
              {terminalLines.map((line, index) => (
                <div
                  key={index}
                  className="mobile-menu__terminal-line"
                  style={
                    {
                      animationDelay: `${index * 300 + 200}ms`,
                    } as React.CSSProperties
                  }
                >
                  <span className="mobile-menu__terminal-prompt">{'>'}</span>
                  <span className="mobile-menu__terminal-text">{line}</span>
                </div>
              ))}

              {currentTerminalLine === 5 && (
                <div className="mobile-menu__terminal-cursor">
                  <span className="mobile-menu__terminal-prompt">{'>'}</span>
                  <span className="mobile-menu__terminal-cursor-blink">_</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu footer */}
        <div className="mobile-menu__footer">
          <div className="mobile-menu__footer-info">
            <span className="mobile-menu__footer-text">
              BRUTALIST.INTERFACE.V2.0
            </span>
            <div className="mobile-menu__footer-status">
              <div className="mobile-menu__footer-dot" />
              <span className="mobile-menu__footer-status-text">
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

/**
 * NavigationMenu component with theme-aware menu items
 * Features hover effects with shadow transformations and color changes
 * Includes badges, commit counters, and pulse indicators
 * Implements underline animations and glitch effects for active states
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  badge?: {
    text: string;
    type: 'new' | 'hot' | 'updated' | 'live';
    pulse?: boolean;
  };
  commitCount?: number;
  isActive?: boolean;
  description?: string;
}

export interface NavigationMenuProps {
  items?: MenuItem[];
  className?: string;
  onItemClick?: (item: MenuItem) => void;
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'HOME',
    href: '#hero',
    badge: { text: 'LIVE', type: 'live', pulse: true },
    commitCount: 247,
    isActive: true,
    description: 'Portfolio home and introduction',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    href: '#projects',
    badge: { text: 'NEW', type: 'new' },
    commitCount: 156,
    description: 'Featured development projects',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    href: '#experience',
    commitCount: 89,
    description: 'Professional background and skills',
  },
  {
    id: 'results',
    label: 'RESULTS',
    href: '#results',
    badge: { text: 'HOT', type: 'hot', pulse: true },
    commitCount: 203,
    description: 'Client success stories and metrics',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    href: '#contact',
    badge: { text: 'UPDATED', type: 'updated' },
    commitCount: 42,
    description: 'Get in touch for collaboration',
  },
];

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items = defaultMenuItems,
  className = '',
  onItemClick,
}) => {
  const { currentTheme, getThemeClass, colors, animations } = useTheme();
  const { scrollProgress } = useScrollProgress();

  const [activeItem, setActiveItem] = useState<string>('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [glitchingItem, setGlitchingItem] = useState<string | null>(null);

  const menuRef = useRef<HTMLUListElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Handle active section detection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => item.href.replace('#', ''));
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      }

      setActiveItem(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  // Handle menu item click
  const handleItemClick = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();

    // Trigger glitch effect for extreme theme
    if (currentTheme === 'extreme-brutalist') {
      setGlitchingItem(item.id);
      setTimeout(() => setGlitchingItem(null), 300);
    }

    // Smooth scroll to section
    const targetElement = document.querySelector(item.href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setActiveItem(item.id);
    onItemClick?.(item);
  };

  // Generate theme-aware classes
  const menuClasses = [
    'navigation-menu',
    getThemeClass('navigation-menu'),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={menuClasses}>
      <ul ref={menuRef} className="navigation-menu__list" role="menubar">
        {items.map((item, index) => {
          const isActive = activeItem === item.id;
          const isHovered = hoveredItem === item.id;
          const isGlitching = glitchingItem === item.id;

          const itemClasses = [
            'navigation-menu__item',
            isActive && 'navigation-menu__item--active',
            isHovered && 'navigation-menu__item--hovered',
            isGlitching && 'navigation-menu__item--glitching',
            item.badge?.pulse && 'navigation-menu__item--pulsing',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li key={item.id} className={itemClasses} role="none">
              <a
                href={item.href}
                className="navigation-menu__link"
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
                aria-describedby={`menu-desc-${item.id}`}
                onClick={(e) => handleItemClick(item, e)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => setHoveredItem(item.id)}
                onBlur={() => setHoveredItem(null)}
              >
                {/* Main label */}
                <span className="navigation-menu__label">{item.label}</span>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={`navigation-menu__badge navigation-menu__badge--${item.badge.type}`}
                    data-pulse={item.badge.pulse}
                  >
                    {item.badge.text}
                  </span>
                )}

                {/* Commit counter */}
                {item.commitCount && (
                  <span className="navigation-menu__commit-counter">
                    <span className="navigation-menu__commit-icon">⚡</span>
                    <span className="navigation-menu__commit-count">
                      {item.commitCount}
                    </span>
                  </span>
                )}

                {/* Pulse indicator */}
                {item.badge?.pulse && (
                  <span className="navigation-menu__pulse-indicator">
                    <span className="navigation-menu__pulse-dot"></span>
                    <span className="navigation-menu__pulse-ring"></span>
                  </span>
                )}

                {/* Underline animation */}
                <span className="navigation-menu__underline">
                  <span className="navigation-menu__underline-fill"></span>
                  <span className="navigation-menu__underline-accent"></span>
                </span>

                {/* Glitch effects */}
                {currentTheme === 'extreme-brutalist' && (
                  <span className="navigation-menu__glitch-effects">
                    <span className="navigation-menu__glitch-layer navigation-menu__glitch-layer--1">
                      {item.label}
                    </span>
                    <span className="navigation-menu__glitch-layer navigation-menu__glitch-layer--2">
                      {item.label}
                    </span>
                  </span>
                )}

                {/* Shadow transformations */}
                <span className="navigation-menu__shadow-effects">
                  <span className="navigation-menu__shadow navigation-menu__shadow--primary"></span>
                  <span className="navigation-menu__shadow navigation-menu__shadow--secondary"></span>
                  <span className="navigation-menu__shadow navigation-menu__shadow--accent"></span>
                </span>

                {/* Hidden description for accessibility */}
                <span
                  id={`menu-desc-${item.id}`}
                  className="navigation-menu__description sr-only"
                >
                  {item.description}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Active item indicator */}
      <div
        ref={underlineRef}
        className="navigation-menu__active-indicator"
        style={
          {
            '--indicator-progress': scrollProgress,
          } as React.CSSProperties
        }
      />

      {/* Terminal-style status line */}
      <div className="navigation-menu__status-line">
        <span className="navigation-menu__status-text">
          [{activeItem.toUpperCase()}] SECTION_ACTIVE
        </span>
        <span className="navigation-menu__status-cursor">_</span>
      </div>
    </div>
  );
};

export default NavigationMenu;

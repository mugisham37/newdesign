// Brutal Button Component - CSS Modules Example

import React from 'react';
import { createModuleClass } from '@/utils/css-modules';
import styles from './BrutalButton.module.css';

export interface BrutalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  theme?: 'extreme-brutalist' | 'refined-brutalist';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  theme,
  isLoading = false,
  isDisabled = false,
  onClick,
  type = 'button',
  className,
  icon,
}) => {
  const buttonClass = createModuleClass(styles, 'button', {
    variant,
    size,
    modifiers: {
      extremeBrutalist: theme === 'extreme-brutalist',
      refinedBrutalist: theme === 'refined-brutalist',
    },
    states: {
      loading: isLoading,
      disabled: isDisabled,
    },
    additional: [className],
  });

  const handleClick = () => {
    if (!isDisabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      aria-label={isLoading ? 'Loading...' : undefined}
    >
      {isLoading && (
        <div className={styles.loadingSpinner} aria-hidden="true" />
      )}

      {icon && !isLoading && (
        <span className={styles.buttonIcon} aria-hidden="true">
          {icon}
        </span>
      )}

      <span>{children}</span>

      <div className={styles.buttonEffects} aria-hidden="true">
        <div className={styles.shimmer} />
        <div className={styles.strike} />
      </div>
    </button>
  );
};

export default BrutalButton;

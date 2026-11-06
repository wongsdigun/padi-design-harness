'use client';

import * as React from 'react';

export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipType = 'outline' | 'soft' | 'solid';
export type ChipColor =
  | 'tosca'
  | 'grey'
  | 'gray'
  | 'green'
  | 'red'
  | 'orange'
  | 'blue'
  | 'dark blue'
  | 'dark-blue';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chip size variant:
   * - `sm`: height 24px, font 12px, icon 12px
   * - `md`: height 32px, font 14px, icon 16px
   * - `lg`: height 40px, font 16px, icon 20px
   * @default 'md'
   */
  size?: ChipSize;

  /**
   * Chip visual style:
   * - `soft`: Light tinted background with colored text
   * - `solid`: Bold colored background with white text
   * - `outline`: Transparent background with colored border and text
   * @default 'soft'
   */
  type?: ChipType;

  /**
   * Color theme corresponding to Figma palette:
   * `tosca`, `grey`, `green`, `red`, `orange`, `blue`, `dark blue`
   * @default 'tosca'
   */
  color?: ChipColor;

  /**
   * Optional icon placed before the label
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon placed after the label (unless onDelete is used)
   */
  rightIcon?: React.ReactNode;

  /**
   * If provided, renders an interactive dismiss/delete button on the right
   */
  onDelete?: (e: React.MouseEvent) => void;

  /**
   * Whether the chip is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the chip is selected / active
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the chip acts as an interactive button/filter
   */
  clickable?: boolean;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  function Chip(
    {
      size = 'md',
      type = 'soft',
      color = 'tosca',
      leftIcon,
      rightIcon,
      onDelete,
      disabled = false,
      selected = false,
      clickable = false,
      className = '',
      children,
      onClick,
      ...props
    },
    ref
  ) {
    // Normalize color name: replace spaces with hyphen and alias grey/gray
    const normalizedColor = color.replace(' ', '-');
    const isInteractive = (clickable || Boolean(onClick)) && !disabled;

    const chipClasses = [
      'ds-chip',
      `ds-chip--${size}`,
      `ds-chip--${type}`,
      `ds-chip--color-${normalizedColor}`,
      selected ? 'ds-chip--selected' : '',
      isInteractive ? 'ds-chip--interactive' : '',
      disabled ? 'ds-chip--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onDelete) {
        onDelete(e);
      }
    };

    return (
      <div
        ref={ref}
        className={chipClasses}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={disabled ? true : undefined}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {leftIcon && (
          <span className="ds-chip__icon ds-chip__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {children !== undefined && children !== null && (
          <span className="ds-chip__label">{children}</span>
        )}

        {!onDelete && rightIcon && (
          <span className="ds-chip__icon ds-chip__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {onDelete && (
          <button
            type="button"
            className="ds-chip__delete-btn"
            onClick={handleDelete}
            disabled={disabled}
            aria-label="Remove"
            tabIndex={-1}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

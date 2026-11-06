'use client';

import * as React from 'react';

export type ChipFilterSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ChipFilterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * Chip filter size from Figma:
   * - `xs`: height 24px, icon 12px, text 12/18
   * - `sm`: height 36px, icon 12px, text 12/18
   * - `md`: height 44px, icon 16px, text 14/21
   * - `lg`: height 52px, icon 20px, text 16/24
   * @default 'md'
   */
  size?: ChipFilterSize;

  /**
   * Whether the filter is applied. Drives the tosca background, border and text.
   * @default false
   */
  active?: boolean;

  /**
   * Called when the label area is clicked. Renders the label as a toggle button.
   */
  onToggle?: () => void;

  /**
   * When provided, renders the trailing dismiss button.
   */
  onDelete?: () => void;

  /**
   * Accessible name for the dismiss button.
   * @default 'Remove'
   */
  deleteLabel?: string;

  /**
   * Replaces the default tick-circle icon.
   */
  icon?: React.ReactNode;

  children?: React.ReactNode;
}

const TickCircle = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.6667" stroke="currentColor" strokeWidth="1" />
    <path
      d="M5.17 8L7.23 9.71 10.83 6.1"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Figma `chip filter`: a removable, toggleable filter chip. The label area and
 * the dismiss button are sibling buttons so neither nests inside the other.
 */
export const ChipFilter = React.forwardRef<HTMLDivElement, ChipFilterProps>(
  function ChipFilter(
    {
      size = 'md',
      active = false,
      onToggle,
      onDelete,
      deleteLabel = 'Remove',
      icon,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={['ds-chip-filter', `ds-chip-filter--${size}`, className]
          .filter(Boolean)
          .join(' ')}
        data-active={active ? '' : undefined}
        {...props}
      >
        <button
          type="button"
          className="ds-chip-filter__button"
          onClick={onToggle}
          aria-pressed={active}
        >
          <span className="ds-chip-filter__icon" aria-hidden="true">
            {icon ?? TickCircle}
          </span>
          {children !== undefined && children !== null ? (
            <span className="ds-chip-filter__label">{children}</span>
          ) : null}
        </button>

        {onDelete ? (
          <button
            type="button"
            className="ds-chip-filter__close"
            onClick={onDelete}
            aria-label={deleteLabel}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    );
  }
);

ChipFilter.displayName = 'ChipFilter';

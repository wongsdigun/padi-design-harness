'use client';

import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, 'onChange' | 'onCheckedChange'> {
  /**
   * Checkbox size:
   * - `sm`: box 16px, icon 12px, font 12px
   * - `md`: box 20px, icon 16px, font 14px
   * - `lg`: box 24px, icon 20px, font 16px
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Label text or element displayed next to the checkbox
   */
  label?: React.ReactNode;

  /**
   * Optional helper or description text below the label
   */
  description?: React.ReactNode;

  /**
   * Error message displayed below the checkbox
   */
  error?: React.ReactNode;

  /**
   * Controlled checked state
   */
  checked?: boolean;

  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;

  /**
   * Indeterminate (partially checked) state
   */
  indeterminate?: boolean;

  /**
   * Callback fired when checked state changes
   */
  onCheckedChange?: (checked: boolean, eventDetails?: any) => void;
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MinusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      size = 'md',
      label,
      description,
      error,
      checked,
      defaultChecked,
      indeterminate = false,
      disabled,
      onCheckedChange,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    const displayLabel = label ?? children;

    const rootClasses = [
      'ds-checkbox-root',
      `ds-checkbox--${size}`,
      disabled ? 'ds-checkbox--disabled' : '',
      error ? 'ds-checkbox--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const boxContent = (
      <BaseCheckbox.Root
        ref={ref}
        className={rootClasses}
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
        disabled={disabled}
        onCheckedChange={onCheckedChange as any}
        {...props}
      >
        <BaseCheckbox.Indicator className="ds-checkbox__indicator">
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    if (!displayLabel && !description && !error) {
      return boxContent;
    }

    return (
      <label className={`ds-checkbox-wrapper ds-checkbox-wrapper--${size} ${disabled ? 'ds-checkbox-wrapper--disabled' : ''}`}>
        {boxContent}
        <div className="ds-checkbox__content">
          {displayLabel && <span className="ds-checkbox__label">{displayLabel}</span>}
          {description && <span className="ds-checkbox__description">{description}</span>}
          {error && <span className="ds-checkbox__error">{error}</span>}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

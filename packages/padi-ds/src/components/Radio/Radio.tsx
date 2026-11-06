'use client';

import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadio.Root>, 'value'> {
  /**
   * The value of the radio button
   */
  value: string;

  /**
   * Size of the radio button:
   * - `sm`: box 16px, dot 8px, font 12px
   * - `md`: box 20px, dot 10px, font 14px
   * - `lg`: box 24px, dot 12px, font 16px
   * @default 'md'
   */
  size?: RadioSize;

  /**
   * Label text or element displayed next to the radio button
   */
  label?: React.ReactNode;

  /**
   * Optional helper or description text below the label
   */
  description?: React.ReactNode;

  /**
   * Error message
   */
  error?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  function Radio(
    {
      value,
      size = 'md',
      label,
      description,
      error,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    const displayLabel = label ?? children;

    const rootClasses = [
      'ds-radio-root',
      `ds-radio--${size}`,
      disabled ? 'ds-radio--disabled' : '',
      error ? 'ds-radio--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const radioBox = (
      <BaseRadio.Root
        ref={ref}
        value={value}
        disabled={disabled}
        className={rootClasses}
        {...props}
      >
        <BaseRadio.Indicator className="ds-radio__indicator" />
      </BaseRadio.Root>
    );

    if (!displayLabel && !description && !error) {
      return radioBox;
    }

    return (
      <label
        className={`ds-radio-wrapper ds-radio-wrapper--${size} ${
          disabled ? 'ds-radio-wrapper--disabled' : ''
        }`}
      >
        {radioBox}
        <div className="ds-radio__content">
          {displayLabel && <span className="ds-radio__label">{displayLabel}</span>}
          {description && <span className="ds-radio__description">{description}</span>}
          {error && <span className="ds-radio__error">{error}</span>}
        </div>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof BaseRadioGroup> {
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      orientation = 'vertical',
      className = '',
      children,
      ...props
    },
    ref
  ) {
    const groupClasses = [
      'ds-radio-group',
      `ds-radio-group--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <BaseRadioGroup
        ref={ref}
        className={groupClasses}
        {...props}
      >
        {children}
      </BaseRadioGroup>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

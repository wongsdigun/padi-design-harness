'use client';

import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';

export type SwitchSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>, 'onChange' | 'onCheckedChange'> {
  /**
   * Size of the switch:
   * - `sm` (28px x 16px)
   * - `md` (36px x 20px)
   * - `lg` (44px x 24px)
   * @default 'md'
   */
  size?: SwitchSize;

  /**
   * Label text or element displayed next to the switch
   */
  label?: React.ReactNode;

  /**
   * Optional helper or description text below the label
   */
  description?: React.ReactNode;

  /**
   * Position of the label relative to the switch toggle
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';

  /**
   * Callback fired when checked state changes
   */
  onCheckedChange?: (checked: boolean, eventDetails?: any) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      size = 'md',
      label,
      description,
      labelPosition = 'right',
      disabled,
      className = '',
      children,
      onCheckedChange,
      ...props
    },
    ref
  ) {
    const displayLabel = label ?? children;

    const normalizedSize: 'sm' | 'md' | 'lg' =
      size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'medium' ? 'md' : size;

    const rootClasses = [
      'ds-switch-root',
      `ds-switch--${normalizedSize}`,
      disabled ? 'ds-switch--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const switchToggle = (
      <BaseSwitch.Root
        ref={ref}
        disabled={disabled}
        className={rootClasses}
        onCheckedChange={onCheckedChange as any}
        {...props}
      >
        <BaseSwitch.Thumb className="ds-switch__thumb" />
      </BaseSwitch.Root>
    );

    if (!displayLabel && !description) {
      return switchToggle;
    }

    return (
      <label
        className={`ds-switch-wrapper ds-switch-wrapper--${normalizedSize} ds-switch-wrapper--label-${labelPosition} ${
          disabled ? 'ds-switch-wrapper--disabled' : ''
        }`}
      >
        {labelPosition === 'left' && (
          <div className="ds-switch__content">
            {displayLabel && <span className="ds-switch__label">{displayLabel}</span>}
            {description && <span className="ds-switch__description">{description}</span>}
          </div>
        )}

        {switchToggle}

        {labelPosition === 'right' && (
          <div className="ds-switch__content">
            {displayLabel && <span className="ds-switch__label">{displayLabel}</span>}
            {description && <span className="ds-switch__description">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

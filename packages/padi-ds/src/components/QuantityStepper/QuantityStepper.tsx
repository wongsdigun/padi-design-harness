'use client';

import * as React from 'react';
import { NumberField } from '@base-ui/react/number-field';

export type QuantityStepperSize = 'sm' | 'md' | 'lg';

export interface QuantityStepperProps
  extends Omit<React.ComponentPropsWithoutRef<typeof NumberField.Root>, 'className'> {
  /**
   * Figma sizes: `sm` 36px, `md` 44px, `lg` 52px.
   * @default 'md'
   */
  size?: QuantityStepperSize;

  /** Accessible name for the input, e.g. "Jumlah". */
  label: string;

  /** Accessible name for the minus button. @default 'Kurangi' */
  decrementLabel?: string;

  /** Accessible name for the plus button. @default 'Tambah' */
  incrementLabel?: string;

  className?: string;
}

/** Figma `quantity stepper`: a bordered −/+ control around a number input. */
export const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  function QuantityStepper(
    {
      size = 'md',
      label,
      decrementLabel = 'Kurangi',
      incrementLabel = 'Tambah',
      className = '',
      ...props
    },
    ref
  ) {
    return (
      <NumberField.Root
        ref={ref}
        className={['ds-quantity-stepper', className].filter(Boolean).join(' ')}
        data-size={size}
        {...props}
      >
        <NumberField.Group className="ds-quantity-stepper__group">
          <NumberField.Decrement
            className="ds-quantity-stepper__action"
            aria-label={decrementLabel}
          >
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" aria-hidden="true">
              <path d="M1 1h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </NumberField.Decrement>

          <NumberField.Input className="ds-quantity-stepper__input" aria-label={label} />

          <NumberField.Increment
            className="ds-quantity-stepper__action"
            aria-label={incrementLabel}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    );
  }
);

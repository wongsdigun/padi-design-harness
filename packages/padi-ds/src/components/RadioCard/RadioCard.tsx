'use client';

import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react/radio';

export interface RadioCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadio.Root>, 'value' | 'children'> {
  /** Value submitted when this card is chosen. */
  value: string;

  /** Card heading — Figma's `Label` (14/21 medium). */
  label: React.ReactNode;

  /** Which side the radio circle sits on. @default 'left' */
  radioSide?: 'left' | 'right';

  /** Optional second line — Figma's `Label` (12/18 regular). */
  description?: React.ReactNode;
}

/**
 * Figma `radio button card`: a 200x75 selectable card with a radio circle.
 * Must be rendered inside `<RadioGroup>`.
 */
export const RadioCard = React.forwardRef<HTMLButtonElement, RadioCardProps>(
  function RadioCard({ value, label, description, radioSide = 'left', className = '', ...props }, ref) {
    return (
      <BaseRadio.Root
        ref={ref}
        value={value}
        className={['ds-radio-card', className].filter(Boolean).join(' ')}
        data-radio-side={radioSide}
        {...props}
      >
        <span className="ds-radio-card__circle">
          <BaseRadio.Indicator className="ds-radio-card__dot" />
        </span>

        <span className="ds-radio-card__content">
          <span className="ds-radio-card__label">{label}</span>
          {description ? (
            <span className="ds-radio-card__description">{description}</span>
          ) : null}
        </span>
      </BaseRadio.Root>
    );
  }
);

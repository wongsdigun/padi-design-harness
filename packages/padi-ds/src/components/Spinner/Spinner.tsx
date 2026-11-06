'use client';

import * as React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'primary' | 'reverse';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Spinner size from Figma:
   * - `sm` (20px, 4px stroke)
   * - `md` (40px, 6px stroke)
   * - `lg` (60px, 8px stroke)
   * @default 'md'
   */
  size?: SpinnerSize;

  /**
   * Spinner color from Figma:
   * - `primary`: tosca gradient (on light backgrounds)
   * - `reverse`: light gradient (on dark / brand backgrounds)
   * @default 'primary'
   */
  color?: SpinnerColor;

  /**
   * Accessible label announced by screen readers.
   * Pass `null` for a decorative spinner (e.g. inside a button that already
   * exposes `aria-busy`), which removes it from the accessibility tree.
   * @default 'Loading'
   */
  label?: string | null;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { size = 'md', color = 'primary', label = 'Loading', className = '', ...props },
    ref
  ) {
    const classes = [
      'ds-spinner',
      `ds-spinner--${size}`,
      `ds-spinner--${color}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        {...(label === null
          ? { 'aria-hidden': true }
          : { role: 'status', 'aria-label': label })}
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

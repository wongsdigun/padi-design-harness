'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
export type ButtonType = 'solid' | 'outline' | 'destructive';
export type ButtonMode = 'primary' | 'tertiery' | 'destructive';

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, 'type'> {
  /**
   * Button visual type from Figma:
   * - `solid`: Primary action (CTA)
   * - `outline`: Secondary action
   * - `destructive`: Danger / deletion action
   * @default 'solid'
   */
  type?: ButtonType;

  /**
   * Native HTML button type attribute
   * @default 'button'
   */
  htmlType?: 'button' | 'submit' | 'reset';

  /**
   * Alias for `type` (for backwards compatibility)
   */
  variant?: 'solid' | 'outline';

  /**
   * Button size from Figma:
   * - `sm` (small, 36px)
   * - `md` (medium, 44px)
   * - `lg` (large, 52px)
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Theme mode for backwards compatibility with earlier v3 builds:
   * - `primary` -> type='solid'
   * - `tertiery` -> type='outline'
   * - `destructive` -> type='destructive'
   */
  mode?: ButtonMode;

  /**
   * Optional icon placed before the label
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon placed after the label
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the button should occupy 100% width of its parent container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      type,
      htmlType = 'button',
      variant,
      size = 'md',
      mode,
      leftIcon,
      rightIcon,
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    // 1. Resolve normalized size: sm | md | lg
    const normalizedSize: 'sm' | 'md' | 'lg' =
      size === 'small'
        ? 'sm'
        : size === 'large'
        ? 'lg'
        : size === 'medium'
        ? 'md'
        : size;

    // 2. Resolve normalized type: solid | outline | destructive
    let resolvedType: ButtonType = 'solid';
    if (type) {
      resolvedType = type;
    } else if (mode === 'destructive') {
      resolvedType = 'destructive';
    } else if (mode === 'tertiery') {
      resolvedType = 'outline';
    } else if (variant === 'outline') {
      resolvedType = 'outline';
    } else {
      resolvedType = 'solid';
    }

    // 3. Resolve legacy mode data-attribute
    const resolvedMode =
      mode ||
      (resolvedType === 'destructive'
        ? 'destructive'
        : resolvedType === 'outline'
        ? 'tertiery'
        : 'primary');

    const buttonClasses = [
      'ds-button',
      `ds-button--${resolvedType}`,
      `ds-button--${normalizedSize}`,
      // Backwards compatibility classes
      `ds-button--${variant || (resolvedType === 'outline' ? 'outline' : 'solid')}`,
      `ds-button--${
        normalizedSize === 'sm'
          ? 'small'
          : normalizedSize === 'lg'
          ? 'large'
          : 'medium'
      }`,
      fullWidth ? 'ds-button--full-width' : '',
      loading ? 'ds-button--loading' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isDisabled = disabled || loading;

    return (
      <BaseButton
        ref={ref}
        type={htmlType}
        className={buttonClasses}
        data-mode-button={resolvedMode}
        disabled={isDisabled}
        aria-busy={loading ? true : undefined}
        {...props}
      >
        {loading ? (
          <span className="ds-button__spinner" aria-hidden="true" />
        ) : null}
        {!loading && leftIcon ? (
          <span
            className="ds-button__icon ds-button__icon--left"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        ) : null}
        {children !== undefined && children !== null ? (
          <span className="ds-button__label">{children}</span>
        ) : null}
        {!loading && rightIcon ? (
          <span
            className="ds-button__icon ds-button__icon--right"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        ) : null}
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';

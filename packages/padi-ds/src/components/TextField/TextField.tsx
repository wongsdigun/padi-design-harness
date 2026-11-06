'use client';

import * as React from 'react';

export type TextFieldSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * Field size variant from Figma:
   * - `sm`: height 36px, font 12px, icon 16px
   * - `md`: height 44px, font 14px, icon 20px
   * - `lg`: height 52px, font 16px, icon 24px
   * @default 'md'
   */
  size?: TextFieldSize;

  /**
   * Label displayed above the input field
   */
  label?: React.ReactNode;

  /**
   * Optional helper text below the input field
   */
  description?: React.ReactNode;

  /**
   * Error message displayed below the input field
   */
  error?: React.ReactNode;

  /**
   * Success message displayed below the input field
   */
  success?: React.ReactNode;

  /**
   * Optional icon or element placed inside the left slot of the input
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon or element placed inside the right slot of the input
   */
  rightIcon?: React.ReactNode;

  /**
   * Prefix text placed inside the input (e.g. "https://", "Rp")
   */
  prefixText?: React.ReactNode;

  /**
   * Suffix text placed inside the input (e.g. ".com", "kg")
   */
  suffixText?: React.ReactNode;

  /**
   * Whether to display a clear button when input has value
   */
  clearable?: boolean;

  /**
   * Callback fired when clear button is clicked
   */
  onClear?: () => void;

  /**
   * Whether the input field occupies 100% width
   * @default true
   */
  fullWidth?: boolean;
}

const ClearIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      size = 'md',
      label,
      description,
      error,
      success,
      leftIcon,
      rightIcon,
      prefixText,
      suffixText,
      clearable = false,
      onClear,
      fullWidth = true,
      disabled,
      required,
      className = '',
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const normalizedSize: 'sm' | 'md' | 'lg' =
      size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'medium' ? 'md' : size;

    const hasValue = Boolean(currentValue && String(currentValue).length > 0);
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    const wrapperClasses = [
      'ds-text-field-wrapper',
      fullWidth ? 'ds-text-field-wrapper--full-width' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      'ds-text-field-container',
      `ds-text-field-container--${normalizedSize}`,
      hasError ? 'ds-text-field-container--error' : '',
      hasSuccess ? 'ds-text-field-container--success' : '',
      disabled ? 'ds-text-field-container--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="ds-text-field__label">
            {label}
            {required && <span className="ds-text-field__required">*</span>}
          </label>
        )}

        <div className={containerClasses}>
          {leftIcon && (
            <span className="ds-text-field__slot ds-text-field__slot--left" aria-hidden="true">
              {leftIcon}
            </span>
          )}

          {prefixText && (
            <span className="ds-text-field__prefix">{prefixText}</span>
          )}

          <input
            ref={ref}
            disabled={disabled}
            required={required}
            value={currentValue}
            onChange={handleChange}
            className="ds-text-field__input"
            {...props}
          />

          {clearable && hasValue && !disabled && (
            <button
              type="button"
              className="ds-text-field__clear-btn"
              onClick={handleClear}
              aria-label="Clear text"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}

          {suffixText && (
            <span className="ds-text-field__suffix">{suffixText}</span>
          )}

          {rightIcon && (
            <span className="ds-text-field__slot ds-text-field__slot--right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>

        {description && !error && !success && (
          <span className="ds-text-field__description">{description}</span>
        )}

        {hasError && (
          <span className="ds-text-field__error">{error}</span>
        )}

        {hasSuccess && (
          <span className="ds-text-field__success">{success}</span>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

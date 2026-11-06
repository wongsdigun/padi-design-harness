'use client';

import * as React from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label displayed above the text area
   */
  label?: React.ReactNode;

  /**
   * Optional helper text below the text area
   */
  description?: React.ReactNode;

  /**
   * Error message displayed below the text area
   */
  error?: React.ReactNode;

  /**
   * Success message displayed below the text area
   */
  success?: React.ReactNode;

  /**
   * Whether to display character counter (requires maxLength)
   * @default false
   */
  showCount?: boolean;

  /**
   * Whether the text area occupies 100% width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Resize behavior: 'none' | 'vertical' | 'horizontal' | 'both'
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      description,
      error,
      success,
      showCount = false,
      fullWidth = true,
      resize = 'vertical',
      disabled,
      required,
      maxLength,
      className = '',
      value,
      defaultValue,
      onChange,
      rows = 4,
      ...props
    },
    ref
  ) {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const currentLength = currentValue ? String(currentValue).length : 0;

    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    const wrapperClasses = [
      'ds-textarea-wrapper',
      fullWidth ? 'ds-textarea-wrapper--full-width' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClasses = [
      'ds-textarea',
      `ds-textarea--resize-${resize}`,
      hasError ? 'ds-textarea--error' : '',
      hasSuccess ? 'ds-textarea--success' : '',
      disabled ? 'ds-textarea--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="ds-textarea__label">
            {label}
            {required && <span className="ds-textarea__required">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          className={textareaClasses}
          {...props}
        />

        <div className="ds-textarea__footer">
          <div className="ds-textarea__messages">
            {description && !error && !success && (
              <span className="ds-textarea__description">{description}</span>
            )}
            {hasError && <span className="ds-textarea__error">{error}</span>}
            {hasSuccess && <span className="ds-textarea__success">{success}</span>}
          </div>

          {showCount && maxLength !== undefined && (
            <span className="ds-textarea__count">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

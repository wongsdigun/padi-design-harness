'use client';

import * as React from 'react';
import { StatusIcon } from './statusIcons';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Alert variant from Figma. Drives the background tint, border, icon and
   * action colour.
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Bold first line. Figma pairs it with a description.
   */
  title?: React.ReactNode;

  /**
   * Body copy. Also accepts `children`.
   */
  description?: React.ReactNode;

  /**
   * Replace the default variant icon. Pass `null` to render no icon.
   */
  icon?: React.ReactNode | null;

  /**
   * Label for the trailing text action, e.g. "Lihat detail".
   */
  actionLabel?: string;

  /**
   * Called when the text action is clicked.
   */
  onAction?: () => void;

  /**
   * When provided, renders the dismiss button.
   */
  onClose?: () => void;

  /**
   * Accessible name for the dismiss button.
   * @default 'Tutup'
   */
  closeLabel?: string;

  children?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'info',
    title,
    description,
    icon,
    actionLabel,
    onAction,
    onClose,
    closeLabel = 'Tutup',
    className = '',
    children,
    ...props
  },
  ref
) {
  const body = description ?? children;
  // Errors are announced immediately; the rest wait for a polite gap.
  const role = variant === 'error' ? 'alert' : 'status';

  return (
    <div
      ref={ref}
      role={role}
      className={['ds-alert', `ds-alert--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {icon === null ? null : (
        <span className="ds-alert__icon" aria-hidden="true">
          {icon ?? <StatusIcon variant={variant} />}
        </span>
      )}

      <div className="ds-alert__content">
        {title ? <span className="ds-alert__title">{title}</span> : null}
        {body ? <span className="ds-alert__description">{body}</span> : null}
      </div>

      {actionLabel ? (
        <button type="button" className="ds-alert__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}

      {onClose ? (
        <button
          type="button"
          className="ds-alert__close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
});

Alert.displayName = 'Alert';

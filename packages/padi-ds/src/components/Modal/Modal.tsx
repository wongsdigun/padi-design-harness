'use client';

import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';

export type ModalProps = React.ComponentProps<typeof Dialog.Root>;
export type ModalTriggerProps = React.ComponentProps<typeof Dialog.Trigger>;
export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

export interface ModalContentProps extends React.ComponentProps<typeof Dialog.Popup> {
  /**
   * Figma `Mobile=on`: full-width sheet pinned to the bottom, square corners
   * and the grabber bar. Applied as `data-mode-mobile` so CSS owns the layout.
   */
  mobile?: boolean;
}

export interface ModalHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Heading. Rendered as `Dialog.Title`, which names the dialog. */
  title?: React.ReactNode;

  /** Optional 32px leading slot — Figma's back arrow or product icon. */
  icon?: React.ReactNode;

  /** Called after the dismiss button closes the dialog. */
  onClose?: () => void;

  /**
   * Whether to render the trailing dismiss button.
   * @default true
   */
  showClose?: boolean;

  /**
   * Accessible name for the dismiss button.
   * @default 'Tutup'
   */
  closeLabel?: string;

  children?: React.ReactNode;
}

export interface ModalActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `row` gives every button an equal share of the width (Figma's 1- and
   * 2-button footers). `stack` puts them on full-width rows — nest a `div`
   * inside a stacked footer for Figma's 3-button layouts.
   * @default 'row'
   */
  layout?: 'row' | 'stack';
}

/** Groups all parts of the dialog. Renders no element of its own. */
export const Modal = Dialog.Root;

export const ModalTrigger = Dialog.Trigger;

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent({ mobile = false, className = '', children, ...props }, ref) {
    return (
      <Dialog.Portal>
        <Dialog.Backdrop className="ds-modal__backdrop" />
        <Dialog.Viewport className="ds-modal__viewport">
          <Dialog.Popup
            ref={ref}
            className={['ds-modal', className].filter(Boolean).join(' ')}
            data-mode-mobile={mobile ? '' : undefined}
            {...props}
          >
            {children}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    );
  }
);

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(
    {
      title,
      icon,
      onClose,
      showClose = true,
      closeLabel = 'Tutup',
      className = '',
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={['ds-modal__header', className].filter(Boolean).join(' ')}
        {...props}
      >
        {icon ? (
          <span className="ds-modal__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}

        {/* The `as never` casts bridge the duplicate @types/react copies (the
            package's React 19 types vs the root React 18 types Base UI uses).
            Drop them once the resolution is deduped. */}
        {title ? (
          <Dialog.Title className="ds-modal__title">{title as never}</Dialog.Title>
        ) : null}

        {children as never}

        {showClose ? (
          <Dialog.Close className="ds-modal__close" aria-label={closeLabel} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Dialog.Close>
        ) : null}
      </div>
    );
  }
);

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody({ className = '', ...props }, ref) {
    return (
      <div ref={ref} className={['ds-modal__body', className].filter(Boolean).join(' ')} {...props} />
    );
  }
);

export const ModalActions = React.forwardRef<HTMLDivElement, ModalActionsProps>(
  function ModalActions({ layout = 'row', className = '', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={['ds-modal__actions', className].filter(Boolean).join(' ')}
        data-layout={layout}
        {...props}
      />
    );
  }
);

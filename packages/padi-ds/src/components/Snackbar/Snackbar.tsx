'use client';

import * as React from 'react';
import { Toast } from '@base-ui/react/toast';
import { StatusIcon, type StatusVariant } from '../Alert/statusIcons';

/** `type` accepted by `useSnackbar().add({ type })` — drives icon and colours. */
export type SnackbarType = StatusVariant;

export type SnackbarPosition = 'top-center' | 'bottom-center';

export interface SnackbarProviderProps {
  /**
   * Maximum snackbars on screen at once; older ones are marked `data-limited`.
   * @default 3
   */
  limit?: number;

  /**
   * Auto-dismiss delay in ms. `0` keeps the snackbar until dismissed.
   * @default 5000
   */
  timeout?: number;

  /**
   * Anchor inside the viewport. Figma puts the desktop snackbar 96px from the
   * top, centred (48px on mobile).
   * @default 'top-center'
   */
  position?: SnackbarPosition;

  /**
   * Accessible name for the dismiss button.
   * @default 'Tutup'
   */
  closeLabel?: string;

  children?: React.ReactNode;
}

type ToastObject = React.ComponentProps<typeof Toast.Root>['toast'];

/**
 * Mount once near the app root. Renders `children` plus the snackbar viewport;
 * queue snackbars from anywhere with `useSnackbar()`.
 */
export function SnackbarProvider({
  limit = 3,
  timeout = 5000,
  position = 'top-center',
  closeLabel = 'Tutup',
  children,
}: SnackbarProviderProps) {
  return (
    <Toast.Provider limit={limit} timeout={timeout}>
      {/* `as never` bridges the duplicate @types/react copies; drop it once
          the resolution is deduped. */}
      {children as never}
      <SnackbarViewport position={position} closeLabel={closeLabel} />
    </Toast.Provider>
  );
}

SnackbarProvider.displayName = 'SnackbarProvider';

/**
 * The toast manager: `add`, `close`, `update`, `promise`. Requires a
 * `<SnackbarProvider>` above it.
 */
export function useSnackbar() {
  return Toast.useToastManager();
}

function SnackbarViewport({
  position,
  closeLabel,
}: {
  position: SnackbarPosition;
  closeLabel: string;
}) {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="ds-snackbar__viewport" data-position={position}>
        {toasts.map((toast) => (
          <SnackbarItem key={toast.id} toast={toast} closeLabel={closeLabel} />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function SnackbarItem({
  toast,
  closeLabel,
}: {
  toast: ToastObject;
  closeLabel: string;
}) {
  // Base UI keeps `type` free-form; anything unknown renders as info.
  const variant = (toast.type ?? 'info') as StatusVariant;

  return (
    <Toast.Root toast={toast} className="ds-snackbar">
      <span className="ds-snackbar__icon" aria-hidden="true">
        <StatusIcon variant={variant} />
      </span>

      <Toast.Content className="ds-snackbar__content">
        <Toast.Title className="ds-snackbar__title" />
        <Toast.Description className="ds-snackbar__description" />
      </Toast.Content>

      {toast.actionProps ? <Toast.Action className="ds-snackbar__action" /> : null}

      <Toast.Close className="ds-snackbar__close" aria-label={closeLabel}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Toast.Close>
    </Toast.Root>
  );
}

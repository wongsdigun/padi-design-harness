import * as React from 'react';

/** Status variants shared by `Alert` and `Snackbar` (Figma `color/status/*`). */
export type StatusVariant = 'info' | 'success' | 'warning' | 'error';

/** 20x20 glyphs drawn in the 32px status circle. */
export const STATUS_ICONS: Record<StatusVariant, React.ReactNode> = {
  info: (
    <>
      <circle cx="10" cy="6.4" r="1.1" fill="currentColor" />
      <path d="M10 9v4.6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </>
  ),
  success: (
    <path
      d="M6.4 10.3l2.4 2.4 4.8-4.8"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  warning: (
    <>
      <path d="M10 5.9v4.9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="10" cy="13.9" r="1.1" fill="currentColor" />
    </>
  ),
  error: (
    <path
      d="M7.3 7.3l5.4 5.4M12.7 7.3l-5.4 5.4"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
    />
  ),
};

/** Falls back to the info glyph for unknown toast types. */
export function StatusIcon({ variant }: { variant: StatusVariant }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {STATUS_ICONS[variant] ?? STATUS_ICONS.info}
    </svg>
  );
}

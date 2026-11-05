import { SnackbarProvider as PadiSnackbarProvider, useSnackbar } from '@frontend-shared/padi-ds';
import type { SnackbarProviderProps, SnackbarPosition, SnackbarType } from '@frontend-shared/padi-ds';

export function SnackbarProvider(props: SnackbarProviderProps) {
  return <PadiSnackbarProvider data-padi-ds="SnackbarProvider" {...props} />;
}

export { useSnackbar };
export type { SnackbarProviderProps, SnackbarPosition, SnackbarType };

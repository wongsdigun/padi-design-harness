import { Alert as PadiAlert } from '@frontend-shared/padi-ds';
import type { AlertProps, AlertVariant } from '@frontend-shared/padi-ds';

export function Alert(props: AlertProps) {
  return <PadiAlert data-padi-ds="Alert" {...props} />;
}

export type { AlertProps, AlertVariant };

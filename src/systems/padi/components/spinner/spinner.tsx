import { Spinner as PadiSpinner } from '@frontend-shared/padi-ds';
import type { SpinnerProps, SpinnerSize, SpinnerColor } from '@frontend-shared/padi-ds';

export function Spinner(props: SpinnerProps) {
  return <PadiSpinner data-padi-ds="Spinner" {...props} />;
}

export type { SpinnerProps, SpinnerSize, SpinnerColor };

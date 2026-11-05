import { Button as PadiButton } from '@frontend-shared/padi-ds';
import type { ButtonProps, ButtonSize, ButtonType, ButtonMode } from '@frontend-shared/padi-ds';

export function Button(props: ButtonProps) {
  return <PadiButton data-padi-ds="Button" {...props} />;
}

export type { ButtonProps, ButtonSize, ButtonType, ButtonMode };

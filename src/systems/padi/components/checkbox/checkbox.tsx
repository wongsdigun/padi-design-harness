import { Checkbox as PadiCheckbox } from '@frontend-shared/padi-ds';
import type { CheckboxProps, CheckboxSize } from '@frontend-shared/padi-ds';

export function Checkbox(props: CheckboxProps) {
  return <PadiCheckbox data-padi-ds="Checkbox" {...props} />;
}

export type { CheckboxProps, CheckboxSize };

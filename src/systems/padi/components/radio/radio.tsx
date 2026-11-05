import { Radio as PadiRadio, RadioGroup as PadiRadioGroup } from '@frontend-shared/padi-ds';
import type { RadioProps, RadioGroupProps, RadioSize } from '@frontend-shared/padi-ds';

export function Radio(props: RadioProps) {
  return <PadiRadio data-padi-ds="Radio" {...props} />;
}

export function RadioGroup(props: RadioGroupProps) {
  return <PadiRadioGroup data-padi-ds="RadioGroup" {...props} />;
}

export type { RadioProps, RadioGroupProps, RadioSize };

import { Switch as PadiSwitch } from '@frontend-shared/padi-ds';
import type { SwitchProps, SwitchSize } from '@frontend-shared/padi-ds';

export function Switch(props: SwitchProps) {
  return <PadiSwitch data-padi-ds="Switch" {...props} />;
}

export type { SwitchProps, SwitchSize };

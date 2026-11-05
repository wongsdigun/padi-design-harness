import { RadioCard as PadiRadioCard } from '@frontend-shared/padi-ds';
import type { RadioCardProps } from '@frontend-shared/padi-ds';

export function RadioCard(props: RadioCardProps) {
  return <PadiRadioCard data-padi-ds="RadioCard" {...props} />;
}

export type { RadioCardProps };

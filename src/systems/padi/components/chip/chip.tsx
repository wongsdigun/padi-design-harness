import { Chip as PadiChip } from '@frontend-shared/padi-ds';
import type { ChipProps, ChipSize, ChipType, ChipColor } from '@frontend-shared/padi-ds';

export function Chip(props: ChipProps) {
  return <PadiChip data-padi-ds="Chip" {...props} />;
}

export type { ChipProps, ChipSize, ChipType, ChipColor };

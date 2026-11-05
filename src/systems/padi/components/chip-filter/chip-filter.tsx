import { ChipFilter as PadiChipFilter } from '@frontend-shared/padi-ds';
import type { ChipFilterProps, ChipFilterSize } from '@frontend-shared/padi-ds';

export function ChipFilter(props: ChipFilterProps) {
  return <PadiChipFilter data-padi-ds="ChipFilter" {...props} />;
}

export type { ChipFilterProps, ChipFilterSize };

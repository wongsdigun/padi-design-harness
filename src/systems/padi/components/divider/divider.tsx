import { Divider as PadiDivider } from '@frontend-shared/padi-ds';
import type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerColor,
  DividerTextPosition,
} from '@frontend-shared/padi-ds';

export function Divider(props: DividerProps) {
  return <PadiDivider data-padi-ds="Divider" {...props} />;
}

export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerColor,
  DividerTextPosition,
};

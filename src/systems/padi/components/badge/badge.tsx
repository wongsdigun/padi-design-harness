import { Badge as PadiBadge } from '@frontend-shared/padi-ds';
import type { BadgeProps, BadgeSize } from '@frontend-shared/padi-ds';

export function Badge(props: BadgeProps) {
  return <PadiBadge data-padi-ds="Badge" {...props} />;
}

export type { BadgeProps, BadgeSize };

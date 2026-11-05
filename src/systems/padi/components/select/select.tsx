import {
  Select as PadiSelect,
  SelectTrigger,
  SelectInput,
  SelectContent,
  SelectSearch,
  SelectItem,
} from '@frontend-shared/padi-ds';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectInputProps,
  SelectContentProps,
  SelectSearchProps,
  SelectItemProps,
} from '@frontend-shared/padi-ds';

export function Select(props: SelectProps) {
  return <PadiSelect data-padi-ds="Select" {...props} />;
}

export { SelectTrigger, SelectInput, SelectContent, SelectSearch, SelectItem };
export type {
  SelectProps,
  SelectTriggerProps,
  SelectInputProps,
  SelectContentProps,
  SelectSearchProps,
  SelectItemProps,
};

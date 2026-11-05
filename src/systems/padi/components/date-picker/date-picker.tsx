import { DatePicker as PadiDatePicker } from '@frontend-shared/padi-ds';
import type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerView,
  DateRange,
} from '@frontend-shared/padi-ds';

export function DatePicker(props: DatePickerProps) {
  return <PadiDatePicker data-padi-ds="DatePicker" {...props} />;
}

export type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerView,
  DateRange,
};

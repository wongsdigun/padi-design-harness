import { TextField as PadiTextField } from '@frontend-shared/padi-ds';
import type { TextFieldProps, TextFieldSize } from '@frontend-shared/padi-ds';

export function TextField(props: TextFieldProps) {
  return <PadiTextField data-padi-ds="TextField" {...props} />;
}

export type { TextFieldProps, TextFieldSize };

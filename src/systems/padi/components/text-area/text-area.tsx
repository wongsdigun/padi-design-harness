import { TextArea as PadiTextArea } from '@frontend-shared/padi-ds';
import type { TextAreaProps } from '@frontend-shared/padi-ds';

export function TextArea(props: TextAreaProps) {
  return <PadiTextArea data-padi-ds="TextArea" {...props} />;
}

export type { TextAreaProps };

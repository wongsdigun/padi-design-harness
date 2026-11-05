import { QuantityStepper as PadiQuantityStepper } from '@frontend-shared/padi-ds';
import type { QuantityStepperProps, QuantityStepperSize } from '@frontend-shared/padi-ds';

export function QuantityStepper(props: QuantityStepperProps) {
  return <PadiQuantityStepper data-padi-ds="QuantityStepper" {...props} />;
}

export type { QuantityStepperProps, QuantityStepperSize };

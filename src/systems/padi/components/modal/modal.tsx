import * as React from 'react';
import {
  Modal as PadiModal,
  ModalTrigger as PadiModalTrigger,
  ModalHeader as PadiModalHeader,
  ModalBody as PadiModalBody,
  ModalActions as PadiModalActions,
} from '@frontend-shared/padi-ds';
import type {
  ModalProps,
  ModalTriggerProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalActionsProps,
  ModalContentProps as PadiModalContentProps,
} from '@frontend-shared/padi-ds';
import { Dialog } from '@base-ui/react/dialog';
import { usePortalContainer } from '#studio/runtime';

export interface ModalContentProps extends PadiModalContentProps {
  container?: HTMLElement | null;
}

export const Modal = function Modal(props: ModalProps) {
  return <PadiModal data-padi-ds="Modal" {...props} />;
};

export const ModalTrigger = PadiModalTrigger;
export const ModalHeader = PadiModalHeader;
export const ModalBody = PadiModalBody;
export const ModalActions = PadiModalActions;

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent({ mobile = false, className = '', container, children, ...props }, ref) {
    const portalContainer = usePortalContainer();
    const Popup = Dialog.Popup as any;
    return (
      <Dialog.Portal container={container ?? portalContainer ?? undefined}>
        <Dialog.Backdrop className="ds-modal__backdrop" />
        <Dialog.Viewport className="ds-modal__viewport">
          <Popup
            ref={ref}
            data-padi-ds="ModalContent"
            className={['ds-modal', className].filter(Boolean).join(' ')}
            data-mode-mobile={mobile ? '' : undefined}
            {...props}
          >
            {children}
          </Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    );
  }
);

export type {
  ModalProps,
  ModalTriggerProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalActionsProps,
};

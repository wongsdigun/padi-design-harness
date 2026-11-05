import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
} from './modal';
import { Button } from '../button';

export function Confirmation() {
  return (
    <Modal>
      <ModalTrigger render={<Button type="destructive">Hapus Vendor</Button>} />
      <ModalContent>
        <ModalHeader title="Konfirmasi Penghapusan" />
        <ModalBody>
          <p>Apakah Anda yakin ingin menghapus data vendor ini? Tindakan ini tidak dapat dibatalkan.</p>
        </ModalBody>
        <ModalActions>
          <Button type="outline">Batal</Button>
          <Button type="destructive">Ya, Hapus</Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
}

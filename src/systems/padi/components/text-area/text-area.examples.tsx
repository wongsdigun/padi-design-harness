import { TextArea } from './text-area';

export function Basic() {
  return (
    <div style={{ maxWidth: '480px' }}>
      <TextArea label="Alamat Pengiriman" placeholder="Masukkan alamat lengkap beserta kode pos..." rows={4} />
    </div>
  );
}

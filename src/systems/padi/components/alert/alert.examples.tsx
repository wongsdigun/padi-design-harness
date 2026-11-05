import { Alert } from './alert';

export function AllVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert variant="info" title="Informasi Rekening" description="Rekening giro Anda sedang diverifikasi oleh tim finance." />
      <Alert variant="success" title="Pembayaran Berhasil" description="PO #98234 telah berhasil dibayarkan via VA Mandiri." />
      <Alert variant="warning" title="Perhatian" description="Batas waktu pelunasan termin 1 tersisa 2 hari lagi." />
      <Alert variant="error" title="Gagal Memproses" description="Koneksi ke server KBLI terputus. Silakan coba sesaat lagi." />
    </div>
  );
}

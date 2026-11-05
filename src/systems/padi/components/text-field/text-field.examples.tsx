import { TextField } from './text-field';

export function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      <TextField label="Nama Lengkap" placeholder="Masukkan nama sesuai KTP" />
      <TextField label="Email Kantor" placeholder="nama@perusahaan.co.id" description="Digunakan untuk verifikasi PO" />
      <TextField label="Nomor NPWP" error="Format NPWP tidak valid" defaultValue="00.123" />
    </div>
  );
}

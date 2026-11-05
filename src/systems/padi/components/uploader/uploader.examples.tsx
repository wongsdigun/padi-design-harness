import { Uploader, UploadedFile } from './uploader';

export function Basic() {
  return (
    <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Uploader
        title="Tarik dan lepas dokumen di sini"
        description="Format didukung: PDF, PNG, JPG (Maks. 5MB)"
      />
      <UploadedFile
        name="KBLI_Dokumen_2026.pdf"
        size="2.4 MB"
        state="success"
      />
    </div>
  );
}

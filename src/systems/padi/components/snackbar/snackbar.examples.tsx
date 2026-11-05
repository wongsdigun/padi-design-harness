import { SnackbarProvider, useSnackbar } from './snackbar';
import { Button } from '../button';

function TriggerDemo() {
  const snackbar = useSnackbar();
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button type="outline" onClick={() => snackbar.add({ type: 'success', title: 'Data berhasil disimpan!' })}>
        Tampilkan Sukses
      </Button>
      <Button type="outline" onClick={() => snackbar.add({ type: 'error', title: 'Gagal mengunggah file' })}>
        Tampilkan Error
      </Button>
    </div>
  );
}

export function Demo() {
  return (
    <SnackbarProvider>
      <TriggerDemo />
    </SnackbarProvider>
  );
}

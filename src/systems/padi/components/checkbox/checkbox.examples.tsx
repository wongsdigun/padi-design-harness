import { useState } from 'react';
import { Checkbox } from './checkbox';

export function States() {
  const [checked, setChecked] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox checked={checked} onCheckedChange={(val) => setChecked(Boolean(val))} label="Saya menyetujui syarat & ketentuan" />
      <Checkbox disabled label="Pilihan tidak dapat diubah" />
    </div>
  );
}

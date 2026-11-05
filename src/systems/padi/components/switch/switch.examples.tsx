import { useState } from 'react';
import { Switch } from './switch';

export function Interactive() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Switch checked={on} onCheckedChange={setOn} />
      <span>{on ? 'Notifikasi Aktif' : 'Notifikasi Senyap'}</span>
    </div>
  );
}

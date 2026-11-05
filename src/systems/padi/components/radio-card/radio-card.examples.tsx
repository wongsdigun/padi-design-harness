import { useState } from 'react';
import { RadioCard } from './radio-card';
import { RadioGroup } from '../radio';

export function CardGroup() {
  const [selected, setSelected] = useState('va');
  return (
    <RadioGroup value={selected} onValueChange={(next) => setSelected(String(next))}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '600px' }}>
        <RadioCard
          value="va"
          label="Virtual Account Mandiri"
          description="Verifikasi otomatis real-time tanpa upload bukti transfer."
        />
        <RadioCard
          value="cc"
          label="Kartu Kredit Corporate"
          description="Persetujuan instan dengan batas kredit korporasi."
        />
      </div>
    </RadioGroup>
  );
}

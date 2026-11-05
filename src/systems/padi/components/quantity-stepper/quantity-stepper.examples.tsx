import { useState } from 'react';
import { QuantityStepper } from './quantity-stepper';

export function Interactive() {
  const [qty, setQty] = useState(1);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <span>Jumlah Pesanan:</span>
      <QuantityStepper label="Jumlah" value={qty} onValueChange={(val) => setQty(Number(val) || 1)} min={1} max={50} />
    </div>
  );
}

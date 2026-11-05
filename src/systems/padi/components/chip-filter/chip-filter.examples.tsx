import { useState } from 'react';
import { ChipFilter } from './chip-filter';

export function FilterGroup() {
  const [selected, setSelected] = useState('semua');
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ChipFilter active={selected === 'semua'} onToggle={() => setSelected('semua')}>Semua</ChipFilter>
      <ChipFilter active={selected === 'bumn'} onToggle={() => setSelected('bumn')}>BUMN</ChipFilter>
      <ChipFilter active={selected === 'umkm'} onToggle={() => setSelected('umkm')}>UMKM</ChipFilter>
    </div>
  );
}

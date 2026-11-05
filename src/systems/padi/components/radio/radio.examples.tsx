import { useState } from 'react';
import { Radio, RadioGroup } from './radio';

export function DefaultGroup() {
  const [val, setVal] = useState('regular');
  return (
    <RadioGroup value={val} onValueChange={(next) => setVal(String(next))}>
      <Radio value="regular" label="Pengiriman Reguler (2-3 hari)" />
      <Radio value="express" label="Pengiriman Kilat (1 hari)" />
      <Radio value="sameday" label="Same Day (Hari ini)" />
    </RadioGroup>
  );
}

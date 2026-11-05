import { useState } from 'react';
import { DatePicker } from './date-picker';

export function SingleDate() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 9, 24));
  return (
    <div style={{ maxWidth: '320px' }}>
      <DatePicker
        label="Tanggal Pengiriman"
        value={date}
        onValueChange={setDate}
        hint="Pilih tanggal pengiriman yang diharapkan"
      />
    </div>
  );
}

import { Tooltip, TooltipInfo } from './tooltip';
import { Button } from '../button';

export function HoverButton() {
  return (
    <div style={{ padding: '24px' }}>
      <Tooltip content="Klik untuk menyetujui transaksi Purchase Order ini">
        <Button type="solid">Setujui PO</Button>
      </Tooltip>
    </div>
  );
}

export function Info() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>Biaya Layanan</span>
      <TooltipInfo content="Biaya pemrosesan transaksi sebesar 1.5% dikenakan oleh pihak payment gateway." />
    </div>
  );
}

import { Table, type TableColumn } from './table';
import { Chip } from '../chip';
import { Button } from '../button';

interface Order {
  id: string;
  poNumber: string;
  vendor: string;
  amount: string;
  status: string;
}

const orders: Order[] = [
  { id: '1', poNumber: 'PO-2026-001', vendor: 'PT Sumber Makmur', amount: 'Rp 45.000.000', status: 'Selesai' },
  { id: '2', poNumber: 'PO-2026-002', vendor: 'CV Jaya Abadi', amount: 'Rp 12.500.000', status: 'Diproses' },
  { id: '3', poNumber: 'PO-2026-003', vendor: 'PT Telkom Akses', amount: 'Rp 88.000.000', status: 'Menunggu' },
];

const columns: TableColumn<Order>[] = [
  { header: 'No. PO', cell: (r) => <strong>{r.poNumber}</strong> },
  { header: 'Nama Vendor', cell: (r) => r.vendor },
  { header: 'Nominal', cell: (r) => r.amount },
  { header: 'Status', cell: (r) => <Chip color={r.status === 'Selesai' ? 'green' : 'tosca'}>{r.status}</Chip> },
  { header: 'Aksi', cell: () => <Button type="outline" size="sm">Rincian</Button> },
];

export function BasicTable() {
  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Table columns={columns} rows={orders} rowKey={(r) => r.id} caption="Daftar Transaksi PO Q4" />
    </div>
  );
}

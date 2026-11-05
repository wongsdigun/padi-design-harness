import { Tabs, TabsList, TabsTab, TabsPanel } from './tabs';

export function Basic() {
  return (
    <Tabs defaultValue="po">
      <TabsList>
        <TabsTab value="po">Purchase Order</TabsTab>
        <TabsTab value="invoice">Faktur Tagihan</TabsTab>
        <TabsTab value="history">Riwayat Log</TabsTab>
      </TabsList>
      <TabsPanel value="po" style={{ padding: '16px 0' }}>
        <p>Konten daftar PO yang sedang aktif dan menunggu persetujuan.</p>
      </TabsPanel>
      <TabsPanel value="invoice" style={{ padding: '16px 0' }}>
        <p>Konten faktur tagihan yang telah diverifikasi bagian keuangan.</p>
      </TabsPanel>
      <TabsPanel value="history" style={{ padding: '16px 0' }}>
        <p>Log audit perubahan status transaksi.</p>
      </TabsPanel>
    </Tabs>
  );
}

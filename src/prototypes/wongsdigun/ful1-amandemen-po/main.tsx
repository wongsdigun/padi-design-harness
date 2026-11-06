/** @studio-id vxw1vvzj7vsmcb1e */
import { useState } from 'react';
import {
  Button,
  Chip,
  Alert
} from '@/systems/padi/components';
import { PadiInspectorHUD } from '@/systems/padi/governance';

interface OrderItem {
  id: string;
  name: string;
  category: string;
  initialQty: number;
  qty: number;
  unitPrice: number;
}

const initialItems: OrderItem[] = [
  {
    id: 'ITM-01',
    name: 'Laptop Dell Vostro 3520 15.6" Core i5 8GB 512GB SSD',
    category: 'Perangkat Komputer',
    initialQty: 10,
    qty: 10,
    unitPrice: 12500000
  },
  {
    id: 'ITM-02',
    name: 'Monitor LG 24MK600M 24" IPS Full HD Frameless',
    category: 'Monitor & Layar',
    initialQty: 10,
    qty: 8,
    unitPrice: 2100000
  },
  {
    id: 'ITM-03',
    name: 'Wireless Keyboard & Mouse Combo Logitech MK270r',
    category: 'Aksesoris Komputer',
    initialQty: 15,
    qty: 12,
    unitPrice: 350000
  }
];

export default function PoAmendmentView() {
  const [activeTab, setActiveTab] = useState<'default' | 'loading' | 'empty' | 'error'>('default');
  const [items, setItems] = useState<OrderItem[]>(initialItems);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '8px',
    boxShadow: 'var(--padi-shadow-sm, 0 1px 2px rgba(0,0,0,0.05))'
  };

  // Math calculations
  const initialSubtotal = items.reduce((acc, itm) => acc + (itm.initialQty * itm.unitPrice), 0);
  const currentSubtotal = items.reduce((acc, itm) => acc + (itm.qty * itm.unitPrice), 0);
  const delta = currentSubtotal - initialSubtotal;
  const currentPpn = Math.round(currentSubtotal * 0.11);
  const currentTotal = currentSubtotal + currentPpn;

  const handleQtyChange = (id: string, deltaQty: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + deltaQty);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-secondary)',
        padding: '32px 24px',
        fontFamily: 'Ubuntu, sans-serif'
      }}
    >
      {/* Padi Inspector HUD (Toggle with Alt + D) */}
      <PadiInspectorHUD />

      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Chip type="soft" color="blue" size="sm">FUL#1</Chip>
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Fulfillment / Amandemen PO
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              Formulir Pengajuan Amandemen PO
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              Nomor PO: <strong>PO/2026/10/PLN-DIS/09841</strong> • Penjual: PT Teknologi Nusantara Prima
            </p>
          </div>

          {/* State Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '4px',
              backgroundColor: 'var(--gray-100)',
              borderRadius: '8px'
            }}
          >
            {(['default', 'loading', 'empty', 'error'] as const).map(state => (
              <button
                key={state}
                onClick={() => setActiveTab(state)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === state ? 'var(--color-bg-primary)' : 'transparent',
                  color: activeTab === state ? 'var(--tosca-500)' : 'var(--color-text-secondary)',
                  boxShadow: activeTab === state ? 'var(--padi-shadow-sm, 0 1px 3px rgba(0,0,0,0.1))' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {state.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* State 1: Default Interactive View */}
        {activeTab === 'default' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {submitted && (
              <Alert variant="info">
                Pengajuan amandemen berhasil dikirim ke Penjual (PT Teknologi Nusantara Prima). Status PO saat ini: <strong>Menunggu Persetujuan Seller</strong>.
              </Alert>
            )}

            {/* Instruction Notice */}
            <div
              style={{
                backgroundColor: 'var(--blue-25)',
                border: '1px solid var(--blue-100)',
                borderRadius: '8px',
                padding: '14px 18px',
                fontSize: '13px',
                color: 'var(--blue-700)',
                lineHeight: 1.5
              }}
            >
              ℹ️ Anda dapat menyesuaikan kuantitas kebutuhan barang sebelum barang dikirimkan oleh Penjual. Perubahan nilai akan otomatis mengkalkulasi ulang PPN 11% dan sisa anggaran proyek.
            </div>

            {/* Table of Line Items */}
            <div style={{ ...containerStyle, padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                  Daftar Barang dalam Purchase Order
                </h3>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                    <th style={{ padding: '12px 20px', fontWeight: 600 }}>Nama Produk & Kategori</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Harga Satuan</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>Kuantitas Awal</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>Kuantitas Baru</th>
                    <th style={{ padding: '12px 20px', fontWeight: 600, textAlign: 'right' }}>Subtotal Baru</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => {
                    const rowSubtotal = item.qty * item.unitPrice;
                    const isQtyChanged = item.qty !== item.initialQty;

                    return (
                      <tr
                        key={item.id}
                        style={{
                          borderBottom: idx === items.length - 1 ? 'none' : '1px solid var(--color-border-subtle)',
                          backgroundColor: isQtyChanged ? 'var(--green-25)' : 'transparent'
                        }}
                      >
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                            {item.category} • Kode: {item.id}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--color-text-primary)' }}>
                          {formatRupiah(item.unitPrice)}
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                          {item.initialQty} unit
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-border-primary)', borderRadius: '6px', overflow: 'hidden' }}>
                            <button
                              onClick={() => handleQtyChange(item.id, -1)}
                              disabled={item.qty <= 1}
                              style={{
                                width: '28px',
                                height: '28px',
                                border: 'none',
                                backgroundColor: 'var(--color-bg-secondary)',
                                cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)'
                              }}
                            >
                              -
                            </button>
                            <span style={{ width: '36px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>
                              {item.qty}
                            </span>
                            <button
                              onClick={() => handleQtyChange(item.id, 1)}
                              style={{
                                width: '28px',
                                height: '28px',
                                border: 'none',
                                backgroundColor: 'var(--color-bg-secondary)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)'
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {formatRupiah(rowSubtotal)}
                          {isQtyChanged && (
                            <div style={{ fontSize: '11px', color: 'var(--green-600)', fontWeight: 500 }}>
                              {item.qty < item.initialQty ? 'Kuantitas Berkurang' : 'Kuantitas Bertambah'}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Financial Summary Calculation Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ ...containerStyle, padding: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 14px 0', color: 'var(--color-text-primary)' }}>
                  Perbandingan Nilai Transaksi
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal Awal:</span>
                    <span style={{ fontWeight: 500 }}>{formatRupiah(initialSubtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal Pasca Amandemen:</span>
                    <span style={{ fontWeight: 600, color: 'var(--tosca-500)' }}>{formatRupiah(currentSubtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>PPN 11%:</span>
                    <span>{formatRupiah(currentPpn)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700 }}>
                    <span>Total Baru:</span>
                    <span style={{ color: 'var(--tosca-500)' }}>{formatRupiah(currentTotal)}</span>
                  </div>
                </div>
              </div>

              <div style={{ ...containerStyle, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 10px 0', color: 'var(--color-text-primary)' }}>
                    Dampak Anggaran Proyek
                  </h4>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Selisih total amandemen:
                    <div style={{ fontSize: '20px', fontWeight: 700, color: delta < 0 ? 'var(--green-600)' : 'var(--brand-orange-500)', margin: '4px 0 8px 0' }}>
                      {delta < 0 ? '-' : '+'} {formatRupiah(Math.abs(delta))}
                    </div>
                    {delta < 0 ? (
                      <span>✅ Anggaran sebesar <strong>{formatRupiah(Math.abs(delta))}</strong> akan dikembalikan ke sisa pagu unit kerja Anda.</span>
                    ) : (
                      <span>⚠️ Pengajuan ini menambah nilai belanja sebesar {formatRupiah(delta)}.</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <Button variant="outline" onClick={() => setItems(initialItems)}>
                    Reset Nilai
                  </Button>
                  <Button variant="solid" onClick={() => setShowSubmitModal(true)}>
                    Kirim Pengajuan Amandemen
                  </Button>
                </div>
              </div>
            </div>

            {/* Confirmation Modal */}
            {showSubmitModal && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'var(--color-overlay-scrim, rgba(0, 0, 0, 0.35))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderRadius: '12px',
                    padding: '24px',
                    maxWidth: '480px',
                    width: '90%',
                    boxShadow: 'var(--padi-shadow-lg, 0 20px 25px -5px rgba(0, 0, 0, 0.1))'
                  }}
                >
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--color-text-primary)' }}>
                    Konfirmasi Pengajuan Amandemen
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                    Total transaksi akan disesuaikan menjadi <strong>{formatRupiah(currentTotal)}</strong>. Penjual memiliki waktu 2x24 jam untuk menyetujui atau menolak permohonan amandemen ini.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
                      Kembali
                    </Button>
                    <Button
                      variant="solid"
                      onClick={() => {
                        setShowSubmitModal(false);
                        setSubmitted(true);
                      }}
                    >
                      Kirim ke Penjual
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* State 2: Loading State */}
        {activeTab === 'loading' && (
          <div style={{ ...containerStyle, padding: '48px 24px', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                width: '36px',
                height: '36px',
                border: '3px solid var(--gray-100)',
                borderTopColor: 'var(--tosca-500)',
                borderRadius: '50%',
                animation: 'padi-theme-spinner-rotate 1s linear infinite',
                marginBottom: '16px'
              }}
            />
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 6px 0' }}>
              Memuat Rincian Transaksi
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
              Sinkronisasi data e-Procurement dan rekalkulasi PPN 11%...
            </p>
          </div>
        )}

        {/* State 3: Empty State */}
        {activeTab === 'empty' && (
          <div style={{ ...containerStyle, padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px 0' }}>
              Tidak Ada Item yang Dapat Diamandemen
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              Purchase Order ini telah dikirim atau diselesaikan, sehingga kuantitas dan harga barang sudah terkunci.
            </p>
            <Button variant="outline">Kembali ke Riwayat Pesanan</Button>
          </div>
        )}

        {/* State 4: Error State */}
        {activeTab === 'error' && (
          <div style={{ ...containerStyle, padding: '28px' }}>
            <Alert variant="error" style={{ marginBottom: '16px' }}>
              <strong>Batas Anggaran Terlampaui:</strong> Total penyesuaian kuantitas melebihi sisa pagu anggaran e-Procurement unit kerja Anda sebesar Rp 14.200.000.
            </Alert>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Silakan kurangi kuantitas item atau ajukan adendum anggaran kepada PIC Pengadaan sebelum mengajukan amandemen.
            </p>
            <Button variant="outline" onClick={() => setActiveTab('default')}>
              Sesuaikan Ulang Kuantitas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

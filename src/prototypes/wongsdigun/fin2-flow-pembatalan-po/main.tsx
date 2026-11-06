/** @studio-id 6rt3a05fq1wsf1x4 */
import { useState } from 'react';
import {
  Button,
  Chip,
  Alert
} from '@/systems/padi/components';
import { PadiInspectorHUD } from '@/systems/padi/governance';

export default function Fin2CancellationFlow() {
  const [activeState, setActiveState] = useState<'default' | 'loading' | 'empty' | 'error'>('default');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('project_amended');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '8px',
    boxShadow: 'var(--padi-shadow-sm, 0 1px 2px rgba(0,0,0,0.05))'
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
      {/* Padi Inspector HUD (Alt + D to toggle) */}
      <PadiInspectorHUD />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb & Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Chip type="soft" color="blue" size="sm">FIN#2</Chip>
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Financing / PO Financing Revival
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                Pengajuan Pembatalan PO Financing
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                Nomor Referensi PO: <strong>PO-TELKOM-2026-X8912</strong> • PT Maju Berkarya Bersama
              </p>
            </div>
            {/* State Switcher Bar */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '4px',
                backgroundColor: 'var(--gray-100)',
                borderRadius: '8px'
              }}
            >
              {(['default', 'loading', 'empty', 'error'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setActiveState(s)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: activeState === s ? 'var(--color-bg-primary)' : 'transparent',
                    color: activeState === s ? 'var(--tosca-500)' : 'var(--color-text-secondary)',
                    boxShadow: activeState === s ? 'var(--padi-shadow-sm, 0 1px 2px rgba(0,0,0,0.08))' : 'none'
                  }}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State 1: Default (Main Interactive Cancellation Flow) */}
        {activeState === 'default' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {isSubmitted && (
              <Alert variant="info">
                Pengajuan pembatalan telah dikirimkan ke Mimin PaDi untuk verifikasi dokumen berita acara.
              </Alert>
            )}

            {/* Transaction Summary Card */}
            <div style={{ ...containerStyle, padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Ringkasan Pembiayaan Terkait
                </span>
                <Chip type="soft" color="orange" size="sm">Menunggu Pencairan</Chip>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Nilai PO</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Rp 148.500.000</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Mitra Financier</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Bank Mandiri Taspen</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Estimasi Pencairan</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>12 Nov 2026</div>
                </div>
              </div>
            </div>

            {/* Cancellation Form Card */}
            <div style={{ ...containerStyle, padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: 0, marginBottom: '16px' }}>
                Formulir Alasan Pembatalan
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  Pilih Kategori Alasan Pembatalan
                </label>
                <select
                  value={cancellationReason}
                  onChange={e => setCancellationReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border-primary)',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="project_amended">Amandemen spesifikasi / nilai PO oleh Buyer</option>
                  <option value="supplier_cancelled">Kemitraan dibatalkan atas kesepakatan bersama</option>
                  <option value="financing_rejected">Peralihan skema pembayaran tunai (Non-Financing)</option>
                  <option value="force_majeure">Keadaan kahar (Force Majeure)</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  Penjelasan / Catatan Tambahan
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Tuliskan keterangan detail mengenai alasan pembatalan ini untuk verifikasi Mimin PaDi..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border-primary)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline" onClick={() => { setNotes(''); setIsSubmitted(false); }}>
                  Batal
                </Button>
                <Button variant="solid" onClick={() => setShowConfirmModal(true)}>
                  Ajukan Pembatalan
                </Button>
              </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
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
                    Konfirmasi Pembatalan PO
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                    Apakah Anda yakin ingin mengajukan pembatalan untuk PO <strong>PO-TELKOM-2026-X8912</strong>? Tindakan ini akan membekukan proses pencairan dan mengirimkan notifikasi ke Bank Mandiri Taspen.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                      Kembali
                    </Button>
                    <Button
                      variant="solid"
                      onClick={() => {
                        setShowConfirmModal(false);
                        setIsSubmitted(true);
                      }}
                    >
                      Ya, Ajukan Pembatalan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* State 2: Loading State */}
        {activeState === 'loading' && (
          <div style={{ ...containerStyle, padding: '60px 24px', textAlign: 'center' }}>
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
              Memverifikasi Status Transaksi
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
              Menghubungi layanan integrasi Core PaDi dan memeriksa ketersediaan limit pembiayaan...
            </p>
          </div>
        )}

        {/* State 3: Empty State */}
        {activeState === 'empty' && (
          <div style={{ ...containerStyle, padding: '56px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📂</div>
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px 0' }}>
              Tidak Ada Pengajuan Pembatalan Aktif
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              Semua PO Financing Anda saat ini berstatus berjalan normal atau telah diselesaikan.
            </p>
            <Button variant="outline">Kembali ke Daftar Transaksi</Button>
          </div>
        )}

        {/* State 4: Error State */}
        {activeState === 'error' && (
          <div style={{ ...containerStyle, padding: '32px' }}>
            <Alert variant="error" style={{ marginBottom: '20px' }}>
              <strong>Gagal Memproses Pembatalan:</strong> Dana pinjaman sebesar Rp 148.500.000 telah masuk ke tahap kliring bank penerima. Pembatalan otomatis tidak lagi dapat dilakukan.
            </Alert>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Untuk bantuan rekonsiliasi manual atau pengembalian dana, silakan hubungi tim Finance Operations PaDi UMKM dengan menyebutkan ID Transaksi.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="solid">Hubungi Helpdesk</Button>
              <Button variant="outline" onClick={() => setActiveState('default')}>Coba Muat Ulang</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

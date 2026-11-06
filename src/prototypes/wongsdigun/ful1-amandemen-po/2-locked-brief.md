---
studioId: nvs95af4d4q6qnt0
---
# Stage 1: Locked Brief & Scope Contract

> **Initiative:** [Fulfillment] Amandemen PO (`FUL#1`)  
> **Squad:** Fulfillment  
> **Author:** Frans, Widy, wongsdigun  
> **Date Locked:** 2026-11-06  
> **Status:** 🔒 Locked for Prototype Implementation

---

## 1. Executive Summary & Business Goals

- **Objective:** Mengakomodasi kebutuhan perubahan transaksi nyata di lapangan (misal penyesuaian ketersediaan stok fisik barang, pengurangan kuantitas kebutuhan proyek BUMN, atau penyesuaian ongkos kirim) tanpa membatalkan Purchase Order secara keseluruhan.
- **Target Impact:** Meningkatkan **Transaction Success Rate** sebesar 15% pada transaksi B2B PaDi UMKM dan mengurangi beban retur / pengembalian dana.

---

## 2. In-Scope vs. Out-of-Scope Contract

### In Scope
- Form permohonan amandemen kuantitas dan harga satuan pada tabel daftar barang.
- Komparasi nilai sebelum vs sesudah amandemen (Subtotal, PPN 11%, Ongkos Kirim, Total Transaksi).
- Alur persetujuan Seller dengan modal konfirmasi dan input alasan penolakan bila ditolak.
- Indikator status amandemen (`Draft`, `Menunggu Persetujuan Seller`, `Disetujui`, `Ditolak`).
- 4 State interaktif (`default`, `loading`, `empty`, `error`).
- Integrasi `<PadiInspectorHUD />` untuk validasi token DOM real-time (`Alt + D`).

### Out of Scope
- Penandatanganan digital materai elektronik Peruri (ditangani di modul e-Sign terpisah).
- Perubahan nomor rekening bank penerima pencairan (diatur via modul Identity).

---

## 3. Core Acceptance Criteria

1. Pengguna dapat mengubah kuantitas item dalam rentang 1 sampai kuantitas PO awal.
2. Komponen tabel menampilkan delta perubahan dengan indikator visual (merah untuk pengurangan, hijau untuk penambahan, oranye untuk perubahan harga).
3. Total nominal amandemen terhitung otomatis termasuk kalkulasi PPN 11%.
4. Zero raw drift: Seluruh tombol, badge, dan modal memanfaatkan komponen resmi PaDi Design System.

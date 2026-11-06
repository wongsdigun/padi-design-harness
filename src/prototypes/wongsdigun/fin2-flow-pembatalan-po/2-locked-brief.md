---
studioId: 5hr27mh8kvk39md5
---
# Stage 1: Locked Brief & Scope Contract

> **Initiative:** Flow Pembatalan PO Financing (`FIN#2`)  
> **Squad:** Financing  
> **Author:** wongsdigun (Admin)  
> **Date Locked:** 2026-11-06  
> **Status:** 🔒 Locked for Prototype Implementation

---

## 1. Business Objective & Target Value

Mengurangi risiko sengketa transaksi dan menekan angka Non-Performing Loan (NPL) pada program Invoice & PO Financing PaDi UMKM dengan menyediakan alur pembatalan yang transparan, aman, dan tersinkronisasi antara Buyer, Mimin PaDi, dan Mitra Financier.

---

## 2. Target Personas & Core User Journey

1. **Buyer / BUMN PIC:** Mengajukan permohonan pembatalan PO Financing dengan melampirkan alasan dan dokumen berita acara.
2. **Mimin PaDi (Admin Operasional):** Memeriksa kelayakan administrasi dan meneruskan tiket pembatalan ke Financier.
3. **Mitra Financier:** Mengambil keputusan approval atau penolakan berdasarkan status disbursement di rekening escrow.

---

## 3. Scope Boundaries

### In Scope
- Form pengajuan pembatalan dengan validasi lampiran dokumen (PDF/JPG maks 5MB).
- Stepper status verifikasi pembatalan: `Diajukan` -> `Review Mimin` -> `Approval Financier` -> `Selesai / Ditolak`.
- Modal konfirmasi bertingkat untuk mencegah kesalahan input.
- Notifikasi status real-time menggunakan komponen `Alert` dan `Snackbar` PaDi DS.
- 4 State prototipe lengkap (`default`, `loading`, `empty`, `error`).

### Out of Scope
- Integrasi API perbankan langsung (menggunakan mock data status transaksi).
- Penyesuaian skema suku bunga berjalan (ditangani oleh Finance Ops offline).

---

## 4. Locked Business Rules

| Rule ID | Parameter | Locked Value |
|---|---|---|
| **BR-01** | Batas Waktu Pembatalan | Maksimal H-1 sebelum tanggal estimasi pencairan dana |
| **BR-02** | Pemulihan Limit | Otomatis 1x24 jam pasca approval final Financier |
| **BR-03** | Error Handling | Error modal dengan direct link WhatsApp CS PaDi |

---

## 5. Sign-off

- [x] Product Manager (Hana / Widy) — *Confirmed via Stage 1 Steering*
- [x] Lead Designer (wongsdigun) — *Locked*
- [x] Design Harness Gatekeeper — *Passed Stage 1 Gate*

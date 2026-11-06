---
studioId: r3nhth9qjqy6av2x
---
# Stage 1: Pre-Design Readiness Gate

> **Task:** [Fulfillment] Amandemen PO  
> **WBS Code:** `FUL#1` | **Squad:** Fulfillment  
> **Assignees:** Frans, Widy  
> **Evaluated At:** 2026-11-06  
> **Verdict:** `🟢 PROCEED TO PROTOTYPE`

---

## 1. WBS & Alignment Check

- **Official WBS Code:** `FUL#1`
- **Product Goals:** Improve Transaction Success Rate (Menekan pembatalan transaksi akibat revisi item belanja / nominal PO)
- **Proposed Solution:** Amandemen PO (Fitur revisi kuantitas, harga satuan, dan penghapusan item PO dengan persetujuan kedua belah pihak)
- **Roadmap Sprints:** S2 (Dev) / S1–S2 (Design)
- **Drop Status:** 🟢 Active in Q4 Roadmap

---

## 2. Source Documents Audit

| Document | Source Link | Status |
|---|---|---|
| **PRD / Specs** | [Google Docs PRD](https://docs.google.com/document/d/1n9FyNk4ojjS_u5pwaMgknDabBaAHCZhof5Sz2Igpp8k/edit?usp=sharing) | ✅ Found |
| **Figma Master** | [Figma Design Canvas](https://www.figma.com/design/ZpKwhiyxCDiaGyBMjNZxub/Amandemen-PO?node-id=0-1&p=f&t=oasWnbm8NZeZ2FDT-0) | ✅ Found |
| **Supporting Presentation** | [Google Slides Spec](https://docs.google.com/presentation/d/1_mph35IFPMVShp3YYwuW3xVLN0y4v92yJlplqGFzTBc/edit?usp=sharing) | ✅ Found |

---

## 3. Five-Pillar Specification Audit

### Pillar 1: User Personas & Scenarios
- **Buyer (BUMN / Retail):** Mengajukan request perubahan pada baris pesanan sebelum status pesanan "Dikirim".
- **Seller (UMKM):** Menerima permohonan amandemen, mereview perubahan nominal atau kuantitas, lalu menyetujui atau menolak.

### Pillar 2: User Flows & State Completeness
- [x] **Happy Path:** Buyer buka Detail PO -> Klik "Ajukan Amandemen" -> Ubah kuantitas/harga -> Review Ringkasan Selisih -> Kirim ke Seller -> Seller Approve -> Status PO diperbarui.
- [x] **Error States:**
  - Perubahan nominal melebihi sisa pagu / budget anggaran Buyer.
  - Seller menolak pengajuan amandemen (status kembali ke PO awal).
  - Timeout saat sinkronisasi nominal pajak PPN/PPh ke ERP Merah Putih.
- [x] **Empty States:** PO tidak memiliki riwayat amandemen (tampilkan status awal).
- [x] **Validation Rules:**
  - Kuantitas item tidak boleh 0 (gunakan tombol hapus item bila dibatalkan).
  - Harga satuan tidak boleh lebih tinggi dari harga penawaran awal e-Procurement tanpa addendum kontrak.

### Pillar 3: Role & Permission Matrix
- Buyer dapat mengajukan dan membatalkan draft permohonan.
- Seller hanya dapat memilih "Setujui Amandemen" atau "Tolak Amandemen" dengan catatan wajib.

### Pillar 4: Technical & Data Dependencies
- Sinkronisasi nominal ke modul Payment Gateway dan Invoice Financing (`FIN#1` / `FIN#2`).
- Dokumen Berita Acara Amandemen otomatis digenerate dalam format PDF.

### Pillar 5: Responsiveness & Tokens
- Fully responsive untuk desktop review dan mobile approval.
- Menggunakan komponen native `@frontend-shared/padi-ds`: `Table`, `Badge`, `Button`, `Card`, `Modal`, `Alert`.

---

## 4. Final Gate Verdict

> [!NOTE]
> **Verdict:** `🟢 PROCEED TO PROTOTYPE`  
> Persyaratan Stage 1 lengkap dengan PRD dan Figma master aktif. Ruang lingkup telah dikunci pada `2-locked-brief.md`. Siap untuk implementasi prototipe interaktif Stage 2.

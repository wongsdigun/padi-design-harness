# PaDi UMKM Q4 2026: Product WBS vs Design Kanban Alignment Audit

> **Generated:** 2026-11-06T01:44:43.097Z  
> **Source 1:** `data/product-wbs-q4.csv` (Funnel Roadmaps, S1-S7 Schedules, Goals & Solutions)  
> **Source 2:** `data/notion-kanban-q4.csv` (43 Design Kanban Cards)  
> **Active Sprint:** `S3 (Nov 2 – Nov 13, 2026)`

---

## 1. Executive Summary

| Metric | Value | Status |
|---|---|---|
| **Product Initiatives Tracked** | 32 | ✅ Complete |
| **Sprints in Scope** | S1 – S7 (Oct 5 – Dec 30, 2026) | 🏃 S3 Active |
| **Design Lead Cadence** | ~1 Sprint ahead of Engineering | 📐 Confirmed |
| **Dropped WBS Code Collisions** | 1 | ⚠️ Needs Fix |
| **Squad/WBS Code Mismatches** | 1 | ⚠️ Needs Fix |
| **Upcoming Design Tasks Missing Cards** | 11 | 📋 Action Required |

---

## 2. Active Discrepancies & Governance Flags


### [HIGH] DROPPED_WBS_IN_ACTIVE_CARD: `[eProc] Template penawaran tender kilat`
- **Assigned WBS Code:** `EPC#2`
- **Finding:** Card uses code "EPC#2" which is marked DROP in Product WBS ("Multiple Winner TK"). Verify if actual initiative is EPC#3 ("Procurement Category Template") or similar.


### [MEDIUM] WBS_CODE_MISMATCH: `[Identity] Registration SPPKP & Bank Account`
- **Assigned WBS Code:** `IDE#1`
- **Finding:** Card tagged IDE#1, but Product WBS assigns "Registration SPPKP & Bank Account" to OPS#1.


---

## 3. Current & Upcoming Sprint Coverage (Design Row)

The Product WBS schedules Design ~1 sprint ahead of Dev execution. Below is the alignment check for current sprint (**S3**) through **S7**:


### Sprint S3 ( – )
- [ ] **Vendor KBLI OSS Verification** — 🔴 **MISSING DESIGN CARD**
- [ ] **Procurement Category Template** — 🔴 **MISSING DESIGN CARD**
- [ ] **Fulfillment Process Enhancement** — 🔴 **MISSING DESIGN CARD**


### Sprint S4 ( – )
- [ ] **Disbursement System Enhancement** — 🔴 **MISSING DESIGN CARD**
- [ ] **Streamlined Financier Registration** — 🔴 **MISSING DESIGN CARD**
- [ ] **Seller Store Collection** — 🔴 **MISSING DESIGN CARD**
- [ ] **Ideasi Seller Dashboard** — 🔴 **MISSING DESIGN CARD**


### Sprint S5 ( – )
- [ ] **Finance Role Optimization** — 🔴 **MISSING DESIGN CARD**
- [ ] **TK Negotiation Enhancement** — 🔴 **MISSING DESIGN CARD**


### Sprint S6 ( – )
- [ ] **Transaction Flow User Enablement** — 🔴 **MISSING DESIGN CARD**


### Sprint S7 ( – )
- [ ] **Transaction Flow User Enablement** — 🔴 **MISSING DESIGN CARD**


---

## 4. Product Backlog Initiatives Catalog (Goals & Solution Context)

Below are the official Product WBS initiatives with business goals and proposed solutions:

| Code | Squad / Funnel | Simple Wording | Status | Goals Summary |
|---|---|---|---|---|
| `PAY#1` | Payment #1 | Payment Gateway Migration | 🟢 Active | Menghilangkan dependensi ke 1PG |
| `FUL#1` | Fulfillment #1 | Amandemen PO | 🟢 Active | Improve Transaction Success Rate |
| `DIS#1` | Disbursement #1 | Financing-Disbursement System | 🟢 Active | Mempercepat proses disbursement |
| `OPS#5` | Ops #5 | SLA Information Clarity | 🟢 Active | pemahaman ekspektasi SLA Disbursement ke Seller |
| `DSC#2` | Design #2 | Streamlined Product Upload | 🟢 Active | Memudahkan upload produk |
| `RSC#2` | Riset #2 | Feature and Info Research | 🟢 Active | Adoption Fitur dan Peraturan PaDi |
| `FIN#1` | Financing #1 | Borrower Scoring System | 🟢 Active | Meningkatkan visibilitas data assessment kepada financier |
| `OPS#1` | Ops #1 | Registration SPPKP & Bank Account | 🟢 Active | Seller lebih comply |
| `COR#1` | Chat #1 | In-Chat Action Buttons | 🟢 Active | Mempermudah action transaksi via chat |
| `DIS#2` | Disbursement #2 | Improve Disbursement Tools | 🟢 Active | Mempercepat proses rekon finops |
| `IDE#1` | Identity #1 | Vendor Compliance Tiering | 🟢 Active | Meningkatkan seller compliance |
| `OPS#4` | Ops #4 | Operational Transaction Compliance | 🟢 Active | compliance terhadap transaksi berjalan |
| `RSC#1` | Riset #1 | Active Seller Badge | 🟢 Active | Menurunkan persentase batal otomatis akibat seller tidak memproses pesanan |
| `IDE#2` | Identity #2 | Vendor KBLI OSS Verification | 🟢 Active | Seller jualan sesuai KBLI nya |
| `DSC#2` | Discovery #2 | Streamlined Product Upload | 🟢 Active | Meningkatkan Kualitas Validitas Product Tayang |
| `TRX#1` | Transaction #1 | Streamlined PR Revision | 🟢 Active | Meningkatkan konversi PR menjadi PO |
| `EPC#2` | eProc #2 | Multiple Winner TK | 🔴 **DROP** | Mengakomodasi apabila ada 2 pemenang dalam 1 Tender Kilat |
| `DSC#2` | Ops #2 | Catalog Compliance Optimization | 🟢 Active | Product sesuai compliance |
| `DIS#3` | Disbursement #3 | Disbursement System Enhancement | 🟢 Active | Enhance data quality and reliability |
| `PAY#2` | Payment #2 | Finance Role Optimization | 🟢 Active | Mengoptimalkan convert invoice to paid |
| `OPS#3` | Ops #3 | Transaction Flow User Enablement | 🟢 Active | Mempercepat flow transaksi |
| `FUL#2` | Fulfillment #2 | Fulfillment Process Enhancement | 🟢 Active | Improve Customer Satisfaction and Customer Excellence |
| `FIN#2` | Financing #2 | - | 🟢 Active | Menekan angka non performing loan IF PaDi |
| `COR#2` | Open API #2 | Streamlined Open API | 🟢 Active | Menambah kapabilitas Open API |
| `FIN#3` | Financing #3 | Streamlined Financier Registration | 🟢 Active | Memudahkan onboard financier baru ke ekosistem PaDi |
| `COR#3` | Open API #3 | Seller Open API | 🟢 Active | Scaleup Integrasi ke sisi Vendor |
| `FIN#3` | Design #1 | Design System Implementation | 🟢 Active | Implementasi Design Sistem |
| `EPC#3` | eProc #3 | Procurement Category Template | 🟢 Active | Memberikan PaDi sebagai top of mind pengadaan suatu kategori unggulan |
| `COR#4` | CT #1 | User Insights and Analysis | 🟢 Active | Memberikan insight data kepada user |
| `RSC#3` | Riset #3 | Saldo Refund Research | 🟢 Active | Meningkatkan adopsi fitur saldo refund |
| `DSC#1` | Discovery #1 | Seller Store Collection | 🟢 Active | Memudahkan pengelompokkan Product |
| `EPC#1` | eProc #1 | TK Negotiation Enhancement | 🟢 Active | Memastikan conversation terjadi di platform agar auditable |

---

## 5. Recommended Actions for Designers & PMs

1. **Re-tag `[eProc] Template penawaran tender kilat`:** Change code from `EPC#2` (dropped) to `EPC#3` (`Procurement Category Template`).
2. **Re-tag `Registration SPPKP & Bank Account`:** Align with Product WBS `OPS#1` instead of `IDE#1`.
3. **Scaffold Sprint 3 & 4 Cards:** Create cards for `Vendor KBLI OSS Verification` (`IDE#2`) and `Fulfillment Process Enhancement` (`FUL#2`) to prevent design lead lag.

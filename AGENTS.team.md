# Team Guidance: PaDi UMKM Design Harness

## 1. System & Design Scope Rules
- **Default & Sole System:** `padi` (`src/systems/padi/`, `studioId: "pnwxw7a9qemg0kg4"`). All prototypes created under `src/prototypes/wongsdigun/` must use this system.
- **Strict Isolation & Zero Tailwind:** Never use Tailwind utility classes (`bg-blue-500`, `p-4`, etc.) inside PaDi prototype views. Prototype styling must use CSS Modules (`*.module.css`) or inline styles consuming native PaDi CSS tokens (`var(--padi-color-*)`, `var(--padi-shadow-*)`, `var(--padi-radius-*)`).
- **Base UI & Portals:** Popover, Select, Modal, and Tooltip components must render inside `.padi-theme` using the harness portal wrappers.

## 2. Governance & Workflow Lifecycle
- **Stage 1 (Pre-Design Readiness Gate):**
  - Run `node scripts/sync-wbs-tasks.mjs init <task-code>` to scaffold the prototype.
  - Audit source documents (PRD, Figma, Taiga) and Product WBS goals/schedules using `rubrics/readiness-gate.md`.
  - Issue verdict in `1-readiness.md`: `PROCEED TO PROTOTYPE`, `BLOCKED: MISSING ERROR STATES`, `BLOCKED: SCOPE CREEP`, or `BLOCKED: UNRESOLVED DEPENDENCY`.
  - Finalize `2-locked-brief.md` before coding.
- **Stage 2 (Interactive Prototype Implementation):**
  - Build interactive views in `main.tsx` with 4 supported states: `default`, `loading`, `empty`, `error`.
  - Mount `<PadiInspectorHUD />` (`Alt + D`) for real-time DOM token inspection and spec export.
  - Run `node scripts/audit-ds-governance.mjs` to verify 0 raw drift.
- **Stage 3 (5-Gate DS Graduation):**
  - Track upgrades and new component proposals in `src/systems/padi/ds-ledger.json`.
  - Graduate approved proposals to upstream `@frontend-shared/padi-ds` following the 5-Gate pipeline.

## 3. Data Integrity & Sync Constraints
- **Zero-Edit Live SharePoint:** The live SharePoint WBS workbook remains strictly zero-edit / read-only.
- **Supabase Backbone:** Task context is synced to Supabase `public.tasks` and `data/product-wbs-q4.json`.
- **Notion Cutoff:** Notion sync operates behind `ENABLE_NOTION_SYNC` and will be permanently retired upon cutover.

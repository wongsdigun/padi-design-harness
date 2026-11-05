# PaDi Design Harness: Master Engineering Plan

## 1. Mission & Architecture

`padi-design-harness` is the unified engineering and design environment for **PaDi UMKM**. It bridges Product Requirements (WBS & PRDs), Design System Governance (`@frontend-shared/padi-ds`), and Interactive Prototypes built with high-fidelity React components and native tokens, verified directly against Figma via the `figma-console` MCP.

```
+-----------------------------------------------------------------------------------+
|                            PaDi Product Ecosystem                                 |
|                                                                                   |
|  [Product Team WBS]       [PaDi Notion Kanban]       [Figma Design Library]       |
|  SharePoint Excel Q4      Supabase public.tasks      PaDi-DS-v3.0 (eJ2zmG6e6...)  |
|  (Summary Q4 S1-S7)       (feat/supabase-adapter)    (figma-console MCP)          |
+-------------------------------------+---------------------------------------------+
                                      |
                     one-way sync via | scripts/fetch-task.mjs
                     removable script | (ENABLE_NOTION_SYNC=false on cutoff)
                                      v
+-----------------------------------------------------------------------------------+
|                         padi-design-harness (Vite Studio)                         |
|                                                                                   |
|  +-------------------------+  +------------------------------------------------+  |
|  | Stage 1: Readiness Gate |  | Stage 2: 4-Output Artifact Delivery            |  |
|  | - PRD & User Stories    |  | 1. UX Spec + States (3-ux-spec.md)             |  |
|  | - Edge & Error Cases    |  | 2. Interactive Prototype (main.tsx)            |  |
|  | - System Scope Check    |  |    * 100% Native padi-ds CSS Custom Properties |  |
|  | - Ambiguity Gate Report |  | 3. Figma Components (Pushed via MCP)           |  |
|  |   (1-readiness.md)      |  | 4. Design QA & Drift Audit (4-qa-report.md)    |  |
|  +-------------------------+  +------------------------------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | 5-State DS Governance Engine                                                |  |
|  | 🟢 Production  🟡 Improvement  🔵 Proposed  🟠 Override  🔴 Raw Drift (FAIL) |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Dedicated System: src/systems/padi/                                         |  |
|  | - 24 @base-ui/react components wrapped in usePortalContainer() & data-padi |  |
|  | - 165 CSS Custom Properties scoped strictly under .padi-theme               |  |
|  | - Zero Tailwind CSS leaks into prototype views                              |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Strategic Sequencing

Execution is divided into three distinct phases to ensure zero disruption to live delivery:

### Phase 1: Core Harness Scaffolding (Current)
1. **Milestone 1**: Seed from `design-studio`, preserve git history and `.agents/skills/stack-diagram`, initialize `PLAN.md` and `docs/ds-visibility-spec.md`, generate architecture topology diagrams, and verify external tool integrations (PaDi DS Storybook, Figma MCP, Supabase).
2. **Milestone 2**: Implement `src/systems/padi/` system with `@frontend-shared/padi-ds`, token synchronization (`scripts/sync-padi-css.mjs`), local `Ubuntu` webfonts, portal isolation wrappers (`usePortalContainer`), and clean removal of default dummy systems (`product`, `marketing`).
3. **Milestone 3**: Build DS Visibility & Governance surfaces (`intro.tsx` Improvement Board, `<ComparisonSplit />`, `<PadiInspectorHUD />` `Alt+D`), WBS synchronization, readiness gate rubrics, and the removable Notion sync script (`ENABLE_NOTION_SYNC`).

### Phase 2: Pilot Validation & Calibration
4. **Milestone 4**: Run 3–5 real Q4 tasks through the harness end-to-end:
   - `FIN#3` / `ALL`: PaDi Design System Core & Token Baseline
   - `IDE#2`: Vendor KBLI OSS Verification (Fresh S3 task)
   - `TRX#1`: Revisi PR (Transaction enhancement)
   - Verify `4-qa-report.md`, zero `🔴 raw-drift`, and Figma sync via MCP.

### Phase 3: PaDi Notion UI & Permanent Notion Cutoff
5. **Milestone 5**: Unfreeze `gr8r-studio` (PaDi Notion), implement UI Gate Badges and direct Supabase write-back (`POST`/`PATCH`). Flip `ENABLE_NOTION_SYNC=false`, decommission Notion intake entirely, making PaDi Notion + Harness the sole source of truth.

---

## 3. The 5-State Design System Governance

Every UI element rendered in a prototype must be classified into one of five explicit states in `ds-ledger.json`:

| State | Badge | Description | Build Gate Rule |
| :--- | :--- | :--- | :--- |
| **Production** | 🟢 `padi-ds-production` | Native component from `@frontend-shared/padi-ds` used with official tokens. | Pass |
| **Improvement** | 🟡 `padi-ds-improvement` | Existing component modified; upstream PR filed or pending against `padi-ds`. | Pass (tracked) |
| **Proposed** | 🔵 `padi-ds-proposed` | Brand-new component required for feature; documented for inclusion in `padi-ds`. | Pass (tracked) |
| **Override** | 🟠 `padi-ds-override` | Feature-specific style override justified and documented in `3-ux-spec.md`. | Pass (audited) |
| **Raw Drift** | 🔴 `raw-drift` | Unregistered CSS, inline ad-hoc colors, or rogue Tailwind classes. | **HARD FAIL (Blocks build)** |

---

## 4. 2-Stage Task Execution

Every task in `src/prototypes/<contributor>/<task-slug>/` progresses through two stages:

### Stage 1: Pre-Design Readiness & Ambiguity Gate
A task cannot proceed to UI prototyping until an explicit verdict is issued:
- `1-readiness.md`: Complete audit of PRD completeness, error states, and edge cases.
- `2-locked-brief.md`: Signed-off requirements lock.
- **Verdicts**: `PROCEED TO PROTOTYPE`, `BLOCKED: MISSING ERROR STATES`, `BLOCKED: SCOPE CREEP`, `BLOCKED: UNRESOLVED DEPENDENCY`.

### Stage 2: 4-Output Artifact Delivery
Once cleared, the designer and coding agent deliver:
1. `3-ux-spec.md`: User flow, state transition tables, edge cases, microcopy.
2. `main.tsx` + `_main.module.css`: High-fidelity interactive React prototype using 100% native `padi-ds` tokens inside `.padi-theme`.
3. Figma Component Push: Direct frame/component synchronization via `figma-console` MCP.
4. `4-qa-report.md`: Automated parity audit comparing prototype DOM tokens against Figma styles.

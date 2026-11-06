---
name: figma-to-padi-view
description: "Build interactive PaDi UMKM prototype views from locked briefs and Figma specs with 100% native PaDi DS tokens and zero drift."
---

# Figma to PaDi Prototype View

Use this skill during **Stage 2** to implement interactive screens and flows under the `padi` design system.

## Prerequisites

- Task has passed Stage 1 Readiness Gate (`1-readiness.md` has verdict `PROCEED TO PROTOTYPE`).
- Scope contract is signed in `2-locked-brief.md`.

## Procedure

1. **UX Spec & Visual Architecture (`3-ux-spec.md`):**
   - Document the state matrix (`default`, `loading`, `empty`, `error`).
   - If flow complexity warrants a visual topology diagram, invoke the `stack-diagram` skill to render self-contained HTML/PNG diagrams into `_diagrams/`.
   - Embed state tables and transition logic in `3-ux-spec.md`.

2. **Prototype View Implementation (`main.tsx`):**
   - Import components strictly from `#systems/padi/components` (e.g. `Button`, `Card`, `Select`, `Modal`, `Alert`, `Badge`, `Tabs`).
   - Use CSS Modules (`*.module.css`) or inline CSS variables. **Zero Tailwind classes are allowed.**
   - All custom styles must reference native PaDi CSS tokens (`var(--padi-color-*)`, `var(--padi-shadow-*)`, `var(--padi-radius-*)`).
   - Mount `<PadiInspectorHUD />` from `#systems/padi/governance` to enable live token inspection via `Alt + D`.
   - Implement the interactive State Switcher to demonstrate all 4 states (`default`, `loading`, `empty`, `error`).

3. **Design System Gap Detection:**
   - If a requested UI pattern cannot be built with stock `@frontend-shared/padi-ds` components:
     - Check `src/systems/padi/ds-ledger.json` for existing proposals or improvements.
     - If new, record a `🔵 New Proposal` or `🟡 Improvement` entry in `ds-ledger.json`.
     - Build the prototype variation locally inside the prototype folder or system governance folder.

4. **Audit and Parity Verification:**
   - Run `node scripts/audit-ds-governance.mjs` to ensure `0` raw drift.
   - Run `figma_check_design_parity` via `figma-console` against the Figma master frame.
   - Complete `4-qa-report.md` with coverage %, parity score, and accessibility verification.

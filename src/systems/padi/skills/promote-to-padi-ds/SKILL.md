---
name: promote-to-padi-ds
description: "Promote an approved prototype improvement or proposal through the 5-Gate graduation pipeline into @frontend-shared/padi-ds."
---

# Promote to PaDi Design System (5-Gate Pipeline)

Use this skill when graduating an improvement or proposal from `src/systems/padi/ds-ledger.json` into the upstream `@frontend-shared/padi-ds` package.

## 5-Gate Graduation Requirements

To graduate from `🟡 Improvement` or `🔵 Proposal` to `🟢 Production`:

1. **Gate 1: Source & Barrel Structure:**
   - Component exported from `packages/padi-ds/src/components/<ComponentName>/index.ts`.
   - Root `index.ts` re-exports the component.
   - Client components declared with `'use client'`.

2. **Gate 2: Storybook CSF3 & Documentation:**
   - Storybook story created at `packages/padi-ds/src/components/<ComponentName>/<ComponentName>.stories.tsx`.
   - All variants (`primary`, `secondary`, `subtle`, `disabled`, `loading`) covered with play functions.
   - Verifiable via Storybook at `http://localhost:6006`.

3. **Gate 3: Vitest & Accessibility (A11y) Verification:**
   - Unit tests pass with `pnpm test` in `packages/padi-ds`.
   - `axe-core` accessibility audit returns 0 violations.
   - Keyboard interaction (Tab, Enter, Space, Escape) verified.

4. **Gate 4: Figma Parity Check:**
   - Component inspected in Figma master (`PaDi-DS-v3.0`).
   - Run `figma_check_design_parity` to ensure token, padding, and font consistency with design specs.

5. **Gate 5: Harness Re-sync & Ledger Update:**
   - Run `pnpm padi:sync` to rebuild CSS variables and regenerate wrappers.
   - Update `src/systems/padi/ds-ledger.json` moving the item to `productionComponents`.
   - Verify that `/systems/padi` Improvement Board reflects the newly graduated production status.

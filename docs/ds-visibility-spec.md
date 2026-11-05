# PaDi Design System: Visibility & Governance Specification

This specification defines the four visibility surfaces and automated auditing engines that ensure 100% token compliance and bidirectional governance between prototypes in `padi-design-harness` and the upstream design system `@frontend-shared/padi-ds`.

---

## Surface 1: `/systems/padi` Improvement Board (`intro.tsx`)

Located at the system root overview page:
- Reads `ds-ledger.json` across all active prototypes.
- Displays four filtered status columns:
  - 🟢 **Production Inventory**: Live usage counts and links to Storybook docs for all 24 production components.
  - 🟡 **Pending Upstream Improvements**: Components modified in prototypes awaiting merge into `@frontend-shared/padi-ds`.
  - 🔵 **New Component Proposals**: Components authored in prototypes nominated for DS inclusion.
  - 🟠 **Documented Overrides**: Approved feature-specific overrides with justification links.
- Emits a prominent warning banner if any `🔴 raw-drift` exists anywhere in the repository.

---

## Surface 2: Side-by-Side Comparator (`_compare.tsx` / `<ComparisonSplit />`)

Every component documentation page under `src/systems/padi/components/<name>/` includes a comparison split:
- **Left Panel (Production Baseline)**: Renders the unaltered component from `@frontend-shared/padi-ds` with default props and official Storybook variants.
- **Right Panel (Prototype / Proposed State)**: Renders the active version in the prototype with real props and modified styles.
- **Delta Inspector**: Automatically diffs computed CSS styles (`font-family`, `font-size`, `color`, `background-color`, `border-radius`, `padding`) and highlights discrepancies with color-coded badges.

---

## Surface 3: Live Prototype HUD (`_instrument.tsx` / `<PadiInspectorHUD />`)

Injected into the prototype layout wrapper and toggleable via **`Alt + D`**:
- **DOM Inspector**: Hovering any element reveals its `data-padi-ds` tag and the underlying CSS variable (e.g., `var(--primary-500)`).
- **Drift Counter**: Floating pill showing real-time token audit:
  - `🟢 100% Padi Tokens` or `🔴 2 Unmapped Values Detected`.
- **Figma Parity Shortcut**: One-click button to trigger `figma-console` parity verification against the task's linked Figma node.
- **Export to Spec**: Dumps current state props and token assignments into clipboard for pasting into `3-ux-spec.md`.

---

## Surface 4: 5-Gate Promotion Pipeline (`promote-to-padi-ds`)

Automated CLI workflow (`pnpm padi:promote <component-name>`) for promoting prototype components to the core library:

```
[Prototype Component]
         |
         v
+------------------+     +------------------+     +------------------+
| Gate 1: Contract | --> | Gate 2: Tokens   | --> | Gate 3: A11y     |
| Base UI primitives|    | 100% CSS var()   |    | ARIA & Keyboard  |
+------------------+     +------------------+     +------------------+
                                                           |
                                                           v
+------------------+     +------------------+     +------------------+
| Upstream PR      | <-- | Gate 5: Figma    | <-- | Gate 4: Test     |
| packages/padi-ds |     | Code Connect sync|     | Unit & Visual QA |
+------------------+     +------------------+     +------------------+
```

1. **Gate 1 (API Contract)**: Component must wrap official `@base-ui/react` primitives and expose clean composable props.
2. **Gate 2 (Token Fidelity)**: Zero hardcoded hex, rem, or pixel values; must use strictly `var(--*)` custom properties from `src/styles/tokens.css`.
3. **Gate 3 (Accessibility)**: Full keyboard navigation, focus visible rings (`--focus-ring`), and screen-reader compliant attributes.
4. **Gate 4 (Testing)**: Visual regression snapshot test against Storybook baseline.
5. **Gate 5 (Figma Sync)**: Figma component mapping verified via `figma-console` MCP.

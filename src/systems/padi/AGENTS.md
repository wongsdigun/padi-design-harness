# PaDi Design System (`padi`) Instructions

This system's components, theme, assets, context and skills support prototypes assigned to it. Follow the repository's platform working context.

## System Characteristics
- **Studio ID:** `pnwxw7a9qemg0kg4`
- **Theme Class:** `.padi-theme`
- **Color Mode:** Light
- **Styling Paradigm:** Custom tokens (`var(--padi-*)`), CSS Modules (`*.module.css`), zero Tailwind utility classes.
- **Upstream Package:** `@frontend-shared/padi-ds` v1.0.3 + `@base-ui/react` primitives.

## Components & Portals
- All 23 production components are exported from `#systems/padi/components`:
  `Accordion`, `Alert`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Card`, `Checkbox`, `ChipFilter`, `Container`, `DatePicker`, `Divider`, `Dropdown`, `Input`, `Modal`, `Pagination`, `Radio`, `Select`, `Skeleton`, `Snackbar`, `Table`, `Tabs`, `Tooltip`.
- Popover, Select, Modal, and Tooltip elements automatically mount inside `.padi-theme` using `usePortalContainer()` wrappers.

## 5-State Governance & Improvement Board
- All components and prototype proposals are tracked in `src/systems/padi/ds-ledger.json`.
- The Improvement Board is mounted live at `/systems/padi` (`intro.tsx`).
- In-prototype inspection is enabled with `<PadiInspectorHUD />` (`Alt + D` or `?ds=1`).

## System Skills
- `task-readiness-gate`: Stage 1 Pre-Design Ambiguity Gate and PRD audit.
- `figma-to-padi-view`: Stage 2 Interactive prototype implementation in `.padi-theme`.
- `promote-to-padi-ds`: Stage 3 5-Gate graduation pipeline into `@frontend-shared/padi-ds`.

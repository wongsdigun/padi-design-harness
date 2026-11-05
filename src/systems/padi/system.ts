import type { SystemSpec } from '#studio/system';

// PaDi Design System: select source key padi in creation controls. Prototype metadata stores this installation’s permanent studioId.
export default {
  status: 'active',
  role: 'prototype',
  label: 'PaDi Design System',
  themeClass: 'padi-theme',
  styling: 'custom',
  colorModes: ['light'],
  docs: 'warn',
  libraries: [
    {
      kind: 'package',
      id: 'padi-ds',
      label: 'PaDi Design System',
      package: '@frontend-shared/padi-ds',
      description: 'Official PaDi UMKM component library and design tokens',
      docs: 'https://padiumkm.id'
    },
    {
      kind: 'package',
      id: 'base-ui',
      label: 'Base UI',
      package: '@base-ui/react',
      description: 'Accessible unstyled UI primitives powering padi-ds',
      docs: 'https://base-ui.com'
    }
  ],
  origin: null,
  studioId: "pnwxw7a9qemg0kg4",
} satisfies SystemSpec;

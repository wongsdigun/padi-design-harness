import type { SystemIntro } from '#studio/system';

export default {
  summary: 'Official PaDi UMKM Design System: 23 synchronized components, 5-State token governance, and strict theme isolation under .padi-theme.',
  overview: {
    guidance: 'All prototypes built with PaDi Design System must enforce 100% token fidelity under .padi-theme with zero Tailwind classes. Overlay components (Modal, Select, Tooltip) use usePortalContainer() to preserve scope.',
    code: 'Powered by @frontend-shared/padi-ds v1.0.3 and @base-ui/react, providing Ubuntu typography, Tosca brand tokens, and accessible interactive primitives.',
    curation: {
      stage: 'ready',
      summary: '23 PaDi DS components wrapped with data-padi-ds and portal scoping. Synchronized with Figma v3.0 tokens.',
      nextStep: 'Build interactive prototypes in src/prototypes/wongsdigun/ with 100% native PaDi DS components.',
      sources: [
        { label: 'PaDi DS Storybook', url: 'http://localhost:6006' },
        { label: 'PaDi DS Repository', url: 'https://github.com/wongsdigun/padi-design-harness' },
      ],
    },
  },
} satisfies SystemIntro;

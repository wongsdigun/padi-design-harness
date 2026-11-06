/// <reference types="vite/client" />
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';
// Next's asset pipeline hands back `{ src, height, width, blurDataURL }` rather
// than a bare URL, so unwrap it before putting it on an `<img>`.
import padiNew from '../assets/logos/padi-new.svg';
import toraseraDefault from '../assets/logos/torasera-default.svg';
import toraseraLogogram from '../assets/logos/torasera-logogram.svg';
import padiseraRetail from '../assets/logos/padisera-retail.svg';
import padiseraBisnis from '../assets/logos/padisera-bisnis.svg';

type LogoSrc = string | { src: string };

const url = (source: LogoSrc) => (typeof source === 'string' ? source : source.src);

const meta: Meta = {
  title: 'Assets/Logos',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/** Figma page `logo`. Files live in `src/assets/logos` — no component, no registry. */
const logos: { name: string; file: string; src: LogoSrc }[] = [
  { name: 'logo padi new', file: 'padi-new.svg', src: padiNew },
  { name: 'logo torasera — Default', file: 'torasera-default.svg', src: toraseraDefault },
  { name: 'logo torasera — logogram', file: 'torasera-logogram.svg', src: toraseraLogogram },
  { name: 'logo padisera — retail', file: 'padisera-retail.svg', src: padiseraRetail },
  { name: 'logo padisera — bisnis', file: 'padisera-bisnis.svg', src: padiseraBisnis },
];

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
        fontFamily: 'Ubuntu, sans-serif',
      }}
    >
      {logos.map((logo) => (
        <figure
          key={logo.file}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            margin: 0,
            padding: '16px',
            border: '1px solid #D5D7D9',
            borderRadius: '12px',
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'grid', placeItems: 'center', height: '120px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- a story, not app markup */}
            <img
              src={url(logo.src)}
              alt={logo.name}
              data-logo={logo.file}
              style={{ maxWidth: '100%', maxHeight: '120px' }}
            />
          </div>
          <figcaption style={{ fontSize: '12px', lineHeight: '18px', color: '#444B55' }}>
            {logo.name}
            <br />
            <code style={{ color: '#8C9197' }}>{logo.file}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const images = [...canvasElement.querySelectorAll<HTMLImageElement>('img[data-logo]')];
    expect(images).toHaveLength(logos.length);

    // Every export must actually decode — catches a truncated or empty SVG.
    await waitFor(() => {
      for (const image of images) {
        expect(image.naturalWidth).toBeGreaterThan(0);
      }
    });
  },
};

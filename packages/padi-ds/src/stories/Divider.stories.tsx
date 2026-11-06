import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Divider } from '../components/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Border line style',
    },
    color: {
      control: 'select',
      options: ['primary', 'dark', 'light'],
      description: 'Color theme token',
    },
    textPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position of text label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => (
    <div>
      <p style={{ margin: 0, fontSize: '14px' }}>Content above divider</p>
      <Divider {...args} />
      <p style={{ margin: 0, fontSize: '14px' }}>Content below divider</p>
    </div>
  ),
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const divider = canvasElement.querySelector('.ds-divider--horizontal');
    expect(divider).not.toBeNull();
  },
};

export const WithText: Story = {
  render: (args) => (
    <div>
      <p style={{ margin: 0, fontSize: '14px' }}>Daftar dengan Google</p>
      <Divider {...args}>atau</Divider>
      <p style={{ margin: 0, fontSize: '14px' }}>Daftar dengan Email</p>
    </div>
  ),
  args: {
    orientation: 'horizontal',
    textPosition: 'center',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const dividerText = canvasElement.querySelector('.ds-divider__text');
    expect(dividerText).not.toBeNull();
    expect(dividerText?.textContent).toBe('atau');
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
      <span>Beranda</span>
      <Divider {...args} />
      <span>Produk</span>
      <Divider {...args} />
      <span>Tentang Kami</span>
    </div>
  ),
  args: {
    orientation: 'vertical',
    variant: 'solid',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const divider = canvasElement.querySelector('.ds-divider--vertical');
    expect(divider).not.toBeNull();
  },
};

export const LineStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '12px', color: '#686e76' }}>Solid</span>
      <Divider variant="solid" />
      <span style={{ fontSize: '12px', color: '#686e76' }}>Dashed</span>
      <Divider variant="dashed" />
      <span style={{ fontSize: '12px', color: '#686e76' }}>Dotted</span>
      <Divider variant="dotted" />
    </div>
  ),
};

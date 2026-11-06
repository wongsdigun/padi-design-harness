import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { Checkbox } from '../components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size variant',
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Setujui Syarat & Ketentuan',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('.ds-checkbox-root');
    expect(checkbox).not.toBeNull();
    if (checkbox) {
      await userEvent.click(checkbox);
    }
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Notifikasi Email',
    description: 'Dapatkan pemberitahuan transaksi terbaru langsung ke email Anda.',
    size: 'md',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Pilih Semua Item',
    indeterminate: true,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const indicator = canvasElement.querySelector('.ds-checkbox__indicator');
    expect(indicator).not.toBeNull();
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="sm" label="Small Checkbox (16px box, 12px text)" defaultChecked />
      <Checkbox size="md" label="Medium Checkbox (20px box, 14px text)" defaultChecked />
      <Checkbox size="lg" label="Large Checkbox (24px box, 16px text)" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Default unchecked" />
      <Checkbox label="Default checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Error state" error="Harap centang persetujuan ini." />
    </div>
  ),
};

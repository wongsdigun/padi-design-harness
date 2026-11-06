import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { TextField } from '../components/TextField';

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'TextField size (sm=36px, md=44px, lg=52px)',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Nama Lengkap',
    placeholder: 'Masukkan nama lengkap Anda...',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    expect(input).not.toBeNull();
    if (input) {
      await userEvent.type(input, 'Ahmad');
      expect(input.value).toBe('Ahmad');
    }
  },
};

export const WithIconAndClear: Story = {
  args: {
    label: 'Pencarian Produk',
    placeholder: 'Cari produk UMKM...',
    leftIcon: <SearchIcon />,
    clearable: true,
    defaultValue: 'Batik Tulis',
    size: 'md',
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    label: 'Harga Produk',
    prefixText: 'Rp',
    suffixText: ',00',
    placeholder: '0',
    defaultValue: '150.000',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <TextField size="sm" label="Small (36px)" placeholder="Size sm..." />
      <TextField size="md" label="Medium (44px)" placeholder="Size md..." />
      <TextField size="lg" label="Large (52px)" placeholder="Size lg..." />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <TextField label="Default" placeholder="Input normal..." description="Petunjuk pengisian input." />
      <TextField label="Success State" defaultValue="ahmad@telkom.co.id" success="Format email valid." />
      <TextField label="Error State" defaultValue="email-salah" error="Format email tidak valid. Harap periksa kembali." />
      <TextField label="Disabled Field" defaultValue="Nilai terkunci" disabled />
    </div>
  ),
};

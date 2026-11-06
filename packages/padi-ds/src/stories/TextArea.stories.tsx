import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { TextArea } from '../components/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    showCount: {
      control: 'boolean',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Catatan Pengiriman',
    placeholder: 'Tuliskan catatan khusus untuk kurir...',
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const textarea = canvasElement.querySelector('textarea');
    expect(textarea).not.toBeNull();
    if (textarea) {
      await userEvent.type(textarea, 'Tolong titip di pos security');
      expect(textarea.value).toBe('Tolong titip di pos security');
    }
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Deskripsi Produk',
    placeholder: 'Jelaskan spesifikasi dan keunggulan produk Anda...',
    maxLength: 200,
    showCount: true,
    defaultValue: 'Batik katun premium dengan motif khas nusantara.',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      <TextArea
        label="Normal"
        placeholder="Input text area biasa..."
        description="Maksimal 500 karakter."
      />
      <TextArea
        label="Success State"
        defaultValue="Alamat pengiriman lengkap sudah diverifikasi oleh kurir."
        success="Alamat valid dan terjangkau layanan kurir."
      />
      <TextArea
        label="Error State"
        defaultValue="Singkat"
        error="Deskripsi terlalu pendek. Harap masukkan minimal 20 karakter."
      />
      <TextArea
        label="Disabled"
        defaultValue="Deskripsi produk ini tidak dapat diubah lagi."
        disabled
      />
    </div>
  ),
};

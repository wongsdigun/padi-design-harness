import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Alert } from '../components/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Figma variant',
    },
    icon: { control: false },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Title',
    description: 'Description',
  },
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector('.ds-alert--info');
    expect(alert).not.toBeNull();
    expect(alert?.getAttribute('role')).toBe('status');
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        variant="info"
        title="Info"
        description="Rekening akan diverifikasi dalam 1x24 jam."
      />
      <Alert
        variant="success"
        title="Berhasil"
        description="Transfer sebesar Rp1.500.000 telah dikirim."
      />
      <Alert
        variant="warning"
        title="Perhatian"
        description="Sesi Anda akan berakhir dalam 5 menit."
      />
      <Alert
        variant="error"
        title="Gagal"
        description="Nomor rekening tujuan tidak valid."
      />
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Perhatian',
    description: 'Sesi Anda akan berakhir dalam 5 menit.',
    actionLabel: 'Perpanjang',
    onAction: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Perpanjang' }));
    expect(args.onAction).toHaveBeenCalledOnce();
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Title',
    description: 'Description',
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Tutup' }));
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const ErrorIsAssertive: Story = {
  args: {
    variant: 'error',
    title: 'Gagal',
    description: 'Nomor rekening tujuan tidak valid.',
  },
  play: async ({ canvasElement }) => {
    // Errors are announced immediately, everything else waits its turn.
    expect(canvasElement.querySelector('.ds-alert')?.getAttribute('role')).toBe(
      'alert'
    );
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Tersimpan',
    description: 'Perubahan Anda sudah disimpan.',
    icon: null,
  },
};

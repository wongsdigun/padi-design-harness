import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { Switch } from '../components/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size variant',
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Aktifkan Notifikasi',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const switchRoot = canvasElement.querySelector('.ds-switch-root');
    expect(switchRoot).not.toBeNull();
    if (switchRoot) {
      await userEvent.click(switchRoot);
    }
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Mode Gelap Otomatis',
    description: 'Sesuaikan tema aplikasi secara otomatis dengan sistem operasi Anda.',
    size: 'md',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch size="sm" label="Small Switch (28px x 16px)" defaultChecked />
      <Switch size="md" label="Medium Switch (36px x 20px)" defaultChecked />
      <Switch size="lg" label="Large Switch (44px x 24px)" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Default Inactive" />
      <Switch label="Default Active" defaultChecked />
      <Switch label="Disabled Inactive" disabled />
      <Switch label="Disabled Active" disabled defaultChecked />
      <Switch label="Label on the Left" labelPosition="left" defaultChecked />
    </div>
  ),
};

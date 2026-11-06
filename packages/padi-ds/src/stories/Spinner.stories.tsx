import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Spinner } from '../components/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'sm=20px, md=40px, lg=60px',
    },
    color: {
      control: 'select',
      options: ['primary', 'reverse'],
      description: 'primary = tosca gradient, reverse = light gradient',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('.ds-spinner--md');
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute('role')).toBe('status');
    expect(spinner?.getAttribute('aria-label')).toBe('Loading');
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Spinner size="md" color="primary" />
        <code>primary</code>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: 'var(--color-text-primary, #444B55)',
        }}
      >
        <Spinner size="md" color="reverse" />
        <code style={{ color: '#fff' }}>reverse</code>
      </div>
    </div>
  ),
};

export const Decorative: Story = {
  args: {
    label: null,
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('.ds-spinner');
    expect(spinner).not.toBeNull();
    // Inside a control that already exposes `aria-busy`, the spinner stays out
    // of the accessibility tree so the label is not announced twice.
    expect(spinner?.getAttribute('aria-hidden')).toBe('true');
  },
};

export const WithLabel: Story = {
  args: {
    size: 'sm',
    label: 'Memuat data transaksi',
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('.ds-spinner');
    expect(spinner?.getAttribute('aria-label')).toBe('Memuat data transaksi');
  },
};

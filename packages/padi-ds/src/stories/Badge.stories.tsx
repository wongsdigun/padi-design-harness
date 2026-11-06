import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size (sm=14px, md=16px)',
    },
    count: {
      control: 'number',
      description: 'Count value',
    },
    maxCount: {
      control: 'number',
      description: 'Max count before showing +',
    },
    dot: {
      control: 'boolean',
      description: 'Render as dot indicator',
    },
    showZero: {
      control: 'boolean',
      description: 'Whether to show when count is 0',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector('.ds-badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe('5');
  },
};

export const Small: Story = {
  args: {
    count: 3,
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector('.ds-badge--sm');
    expect(badge).not.toBeNull();
  },
};

export const Overflow: Story = {
  args: {
    count: 120,
    maxCount: 99,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector('.ds-badge');
    expect(badge?.textContent).toBe('99+');
  },
};

export const Dot: Story = {
  args: {
    dot: true,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector('.ds-badge--dot');
    expect(badge).not.toBeNull();
  },
};

export const AnchoredOnButton: Story = {
  render: (args) => (
    <Badge {...args}>
      <Button type="outline" size="sm">
        Notifikasi
      </Button>
    </Badge>
  ),
  args: {
    count: 8,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('.ds-badge-container');
    expect(container).not.toBeNull();
    const badge = canvasElement.querySelector('.ds-badge--anchored');
    expect(badge).not.toBeNull();
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#686e76' }}>Small (14px)</span>
        <Badge size="sm" count={4} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#686e76' }}>Medium (16px)</span>
        <Badge size="md" count={12} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#686e76' }}>Dot (sm)</span>
        <Badge size="sm" dot />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#686e76' }}>Dot (md)</span>
        <Badge size="md" dot />
      </div>
    </div>
  ),
};

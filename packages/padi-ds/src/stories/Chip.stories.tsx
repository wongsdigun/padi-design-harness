import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Chip } from '../components/Chip';

const SampleCheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['soft', 'solid', 'outline'],
      description: 'Chip visual style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size (sm=24px, md=32px, lg=40px)',
    },
    color: {
      control: 'select',
      options: ['tosca', 'grey', 'green', 'red', 'orange', 'blue', 'dark blue'],
      description: 'Color theme from Figma palette',
    },
    disabled: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Label Chip',
    type: 'soft',
    color: 'tosca',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const chip = canvasElement.querySelector('.ds-chip');
    expect(chip).not.toBeNull();
    expect(chip?.textContent).toContain('Label Chip');
  },
};

export const Solid: Story = {
  args: {
    children: 'Solid Chip',
    type: 'solid',
    color: 'tosca',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const chip = canvasElement.querySelector('.ds-chip--solid');
    expect(chip).not.toBeNull();
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Chip',
    type: 'outline',
    color: 'tosca',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const chip = canvasElement.querySelector('.ds-chip--outline');
    expect(chip).not.toBeNull();
  },
};

export const WithIcons: Story = {
  args: {
    children: 'Verified',
    type: 'soft',
    color: 'green',
    size: 'md',
    leftIcon: <SampleCheckIcon />,
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('.ds-chip__icon--left');
    expect(icon).not.toBeNull();
  },
};

export const WithDelete: Story = {
  args: {
    children: 'Removable Filter',
    type: 'soft',
    color: 'tosca',
    size: 'md',
    onDelete: () => alert('Deleted!'),
  },
  play: async ({ canvasElement }) => {
    const deleteBtn = canvasElement.querySelector('.ds-chip__delete-btn');
    expect(deleteBtn).not.toBeNull();
  },
};

export const AllColors: Story = {
  render: () => {
    const colors = ['tosca', 'grey', 'green', 'red', 'orange', 'blue', 'dark blue'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#686e76' }}>Soft</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {colors.map((c) => (
              <Chip key={c} type="soft" color={c}>
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#686e76' }}>Solid</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {colors.map((c) => (
              <Chip key={c} type="solid" color={c}>
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#686e76' }}>Outline</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {colors.map((c) => (
              <Chip key={c} type="outline" color={c}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Chip size="sm" type="soft" color="tosca">
        Small (24px)
      </Chip>
      <Chip size="md" type="soft" color="tosca">
        Medium (32px)
      </Chip>
      <Chip size="lg" type="soft" color="tosca">
        Large (40px)
      </Chip>
    </div>
  ),
};

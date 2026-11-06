import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { ChipFilter } from '../components/ChipFilter';

const meta: Meta<typeof ChipFilter> = {
  title: 'Components/ChipFilter',
  component: ChipFilter,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'xs=24, sm=36, md=44, lg=52 tall',
    },
    icon: { control: false },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ChipFilter>;

export const Default: Story = {
  args: {
    children: 'Status',
  },
  play: async ({ canvasElement }) => {
    const chip = canvasElement.querySelector('.ds-chip-filter');
    expect(chip).not.toBeNull();
    expect(chip?.getAttribute('data-active')).toBeNull();
    expect(
      canvasElement.querySelector('.ds-chip-filter__button')?.getAttribute('aria-pressed')
    ).toBe('false');
  },
};

export const Active: Story = {
  args: {
    children: 'Status',
    active: true,
  },
  play: async ({ canvasElement }) => {
    const chip = canvasElement.querySelector('.ds-chip-filter');
    expect(chip?.getAttribute('data-active')).not.toBeNull();
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <ChipFilter size="xs">xs</ChipFilter>
      <ChipFilter size="sm">sm</ChipFilter>
      <ChipFilter size="md" active>
        md
      </ChipFilter>
      <ChipFilter size="lg" active>
        lg
      </ChipFilter>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    return (
      <ChipFilter
        active={active}
        onToggle={() => setActive((prev) => !prev)}
        onDelete={() => setActive(false)}
      >
        Status
      </ChipFilter>
    );
  },
  play: async ({ canvasElement }) => {
    const chip = canvasElement.querySelector('.ds-chip-filter');
    const toggle = canvasElement.querySelector('.ds-chip-filter__button');

    await userEvent.click(toggle as HTMLElement);
    expect(chip?.getAttribute('data-active')).not.toBeNull();

    await userEvent.click(canvasElement.querySelector('.ds-chip-filter__close') as HTMLElement);
    expect(chip?.getAttribute('data-active')).toBeNull();
  },
};

export const WithDelete: Story = {
  args: {
    children: 'Status',
    active: true,
    onDelete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const close = canvasElement.querySelector('.ds-chip-filter__close');
    expect(close?.getAttribute('aria-label')).toBe('Remove');
    await userEvent.click(close as HTMLElement);
    expect(args.onDelete).toHaveBeenCalledOnce();
  },
};

export const WithCustomIcon: Story = {
  args: {
    children: 'Jumlah',
    active: true,
    icon: (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 5h12M2 8h8M2 11h10"
          stroke="currentColor"
          strokeWidth="1.33"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

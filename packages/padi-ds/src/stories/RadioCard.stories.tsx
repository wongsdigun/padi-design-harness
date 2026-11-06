import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { RadioGroup } from '../components/Radio';
import { RadioCard } from '../components/RadioCard';

const meta: Meta<typeof RadioCard> = {
  title: 'Components/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="reguler" aria-label="Pilih kurir">
      <div style={{ display: 'flex', gap: '12px' }}>
        <RadioCard
          value="reguler"
          label="Reguler"
          description="Estimasi 2-3 hari"
        />
        <RadioCard
          value="same-day"
          label="Same Day"
          description="Tiba hari ini"
        />
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('.ds-radio-card');
    expect(cards.length).toBe(2);
    expect(cards[0].hasAttribute('data-checked')).toBe(true);

    await userEvent.click(cards[1] as HTMLElement);
    expect(cards[1].hasAttribute('data-checked')).toBe(true);
    expect(cards[0].hasAttribute('data-checked')).toBe(false);
  },
};

export const RadioRight: Story = {
  render: () => (
    <RadioGroup defaultValue="reguler" aria-label="Pilih kurir">
      <RadioCard
        value="reguler"
        label="Reguler"
        description="Estimasi 2-3 hari"
        radioSide="right"
      />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('.ds-radio-card') as HTMLElement;
    expect(card.getAttribute('data-radio-side')).toBe('right');
    expect(getComputedStyle(card).flexDirection).toBe('row-reverse');
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="reguler" aria-label="Pilih kurir">
      <RadioCard value="reguler" label="Reguler" description="Estimasi 2-3 hari" disabled />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelector('.ds-radio-card')?.hasAttribute('data-disabled')).toBe(true);
  },
};

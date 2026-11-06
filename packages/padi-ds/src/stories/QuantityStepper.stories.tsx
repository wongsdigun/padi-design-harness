import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { QuantityStepper } from '../components/QuantityStepper';

const meta: Meta<typeof QuantityStepper> = {
  title: 'Components/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof QuantityStepper>;

export const Default: Story = {
  render: () => <QuantityStepper label="Jumlah" defaultValue={1} min={1} max={10} />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('.ds-quantity-stepper__input') as HTMLInputElement;
    expect(input.value).toBe('1');

    const buttons = canvasElement.querySelectorAll('.ds-quantity-stepper__action');
    await userEvent.click(buttons[1] as HTMLElement);
    expect(input.value).toBe('2');

    await userEvent.click(buttons[0] as HTMLElement);
    expect(input.value).toBe('1');
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <QuantityStepper label="Jumlah" size="sm" defaultValue={1} />
      <QuantityStepper label="Jumlah" size="md" defaultValue={1} />
      <QuantityStepper label="Jumlah" size="lg" defaultValue={1} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const sizes = [...canvasElement.querySelectorAll('.ds-quantity-stepper')].map((node) =>
      node.getAttribute('data-size')
    );
    expect(sizes).toEqual(['sm', 'md', 'lg']);
  },
};

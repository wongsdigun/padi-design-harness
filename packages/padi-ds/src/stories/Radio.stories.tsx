import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { Radio, RadioGroup } from '../components/Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="bca">
      <Radio value="bca" label="Bank BCA" description="Transfer manual ke rekening BCA" />
      <Radio value="mandiri" label="Bank Mandiri" description="Transfer otomatis via Virtual Account" />
      <Radio value="bni" label="Bank BNI" description="Transfer via Virtual Account BNI" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const radioElements = canvasElement.querySelectorAll('.ds-radio-root');
    expect(radioElements.length).toBe(3);
    if (radioElements[1]) {
      await userEvent.click(radioElements[1]);
    }
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <RadioGroup defaultValue="opt1">
        <Radio size="sm" value="opt1" label="Small Radio (16px box, 12px text)" />
      </RadioGroup>
      <RadioGroup defaultValue="opt2">
        <Radio size="md" value="opt2" label="Medium Radio (20px box, 14px text)" />
      </RadioGroup>
      <RadioGroup defaultValue="opt3">
        <Radio size="lg" value="opt3" label="Large Radio (24px box, 16px text)" />
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" defaultValue="laki">
      <Radio value="laki" label="Laki-laki" />
      <Radio value="perempuan" label="Perempuan" />
    </RadioGroup>
  ),
};

export const States: Story = {
  render: () => (
    <RadioGroup defaultValue="checked">
      <Radio value="unchecked" label="Default unchecked" />
      <Radio value="checked" label="Default checked" />
      <Radio value="disabled" label="Disabled unchecked" disabled />
      <Radio value="checked-disabled" label="Disabled checked" disabled />
      <Radio value="error" label="With Error" error="Harap pilih salah satu opsi pembayaran." />
    </RadioGroup>
  ),
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import {
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectSearch,
  SelectTrigger,
} from '../components/Select';

const items = [
  { value: 'jne', label: 'JNE Reguler', description: 'Estimasi 2-3 hari' },
  { value: 'sicepat', label: 'SiCepat HALU', description: 'Estimasi 1-2 hari' },
  { value: 'anteraja', label: 'AnterAja Same Day', description: 'Tiba hari ini' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Trigger: Story = {
  render: () => (
    <Select items={items} defaultValue={items[0]}>
      <SelectTrigger />
      <SelectContent search={<SelectSearch placeholder="Cari kurir" />}>
        {(item: (typeof items)[number]) => (
          <SelectItem
            key={item.value}
            value={item}
            label={item.label}
            description={item.description}
          />
        )}
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('.ds-select__trigger') as HTMLElement);

    await waitFor(() => expect(document.querySelectorAll('.ds-select__item').length).toBe(3));
    expect(document.querySelector('.ds-select__search')).not.toBeNull();

    const last = document.querySelectorAll('.ds-select__item')[2] as HTMLElement;
    await userEvent.click(last);

    await waitFor(() =>
      expect(canvasElement.querySelector('.ds-select__value')?.textContent).toContain('AnterAja')
    );
  },
};

export const Field: Story = {
  render: () => (
    <Select items={items}>
      <SelectInput label="Kurir" placeholder="Pilih kurir" hint="Ongkir dihitung otomatis" />
      <SelectContent emptyLabel="Kurir tidak ditemukan">
        {(item: (typeof items)[number]) => (
          <SelectItem key={item.value} value={item} label={item.label} />
        )}
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('.ds-text-field__input') as HTMLInputElement;
    expect(canvasElement.querySelector('.ds-text-field__label')?.textContent).toBe('Kurir');

    await userEvent.click(input);
    await waitFor(() => expect(document.querySelectorAll('.ds-select__item').length).toBe(3));
  },
};

export const Multiple: Story = {
  render: () => (
    <Select items={items} multiple defaultValue={[items[0]]}>
      <SelectTrigger>Pilih kurir</SelectTrigger>
      <SelectContent multiple search={<SelectSearch placeholder="Cari" />}>
        {(item: (typeof items)[number]) => (
          <SelectItem key={item.value} value={item} label={item.label} />
        )}
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('.ds-select__trigger') as HTMLElement);

    const popup = await waitFor(() => {
      const node = document.querySelector('.ds-select__list') as HTMLElement | null;
      expect(node).not.toBeNull();
      return node as HTMLElement;
    });
    expect(popup.hasAttribute('data-mode-multiple')).toBe(true);
    expect(document.querySelectorAll('.ds-select__indicator').length).toBe(1);
  },
};

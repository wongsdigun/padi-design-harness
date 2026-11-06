import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Table, type TableColumn } from '../components/Table';

interface Row {
  id: string;
  name: string;
  status: string;
  price: string;
}

const rows: Row[] = [
  { id: '1', name: 'Kopi Susu', status: 'Aktif', price: 'Rp18.000' },
  { id: '2', name: 'Teh Melati', status: 'Draft', price: 'Rp12.000' },
  { id: '3', name: 'Air Mineral', status: 'Aktif', price: 'Rp5.000' },
];

const columns: TableColumn<Row>[] = [
  { header: 'Nama Produk', cell: (row) => row.name },
  { header: 'Harga', cell: (row) => row.price },
  { header: 'Status', cell: (row) => <Chip size="sm">{row.status}</Chip> },
  { header: 'Aksi', cell: () => <Button type="outline" size="sm">Detail</Button> },
];

const meta: Meta<typeof Table<Row>> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table<Row>>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '900px' }}>
      <Table columns={columns} rows={rows} rowKey={(row) => row.id} caption="Daftar produk" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const headers = canvasElement.querySelectorAll('.ds-table__header-cell');
    const cells = canvasElement.querySelectorAll('.ds-table__cell');

    expect(headers.length).toBe(4);
    expect(cells.length).toBe(12);
    expect(headers[0].getAttribute('scope')).toBe('col');
    expect(canvasElement.querySelector('.ds-table__caption')?.textContent).toBe('Daftar produk');

    // Figma shades every second row #F9FAFA.
    const first = getComputedStyle(cells[0] as HTMLElement).backgroundColor;
    const secondRow = getComputedStyle(cells[4] as HTMLElement).backgroundColor;
    expect(first).toBe('rgb(255, 255, 255)');
    expect(secondRow).toBe('rgb(249, 250, 250)');
  },
};

export const Empty: Story = {
  render: () => (
    <div style={{ width: '900px' }}>
      <Table columns={columns} rows={[]} rowKey={(row) => row.id} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelectorAll('.ds-table__header-cell').length).toBe(4);
    expect(canvasElement.querySelectorAll('.ds-table__cell').length).toBe(0);
  },
};

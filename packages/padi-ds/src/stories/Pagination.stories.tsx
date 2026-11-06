import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { Pagination } from '../components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const labels = (canvasElement: HTMLElement) =>
  [...canvasElement.querySelectorAll('.ds-pagination__page, .ds-pagination__ellipsis')].map(
    (node) => node.textContent
  );

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);

    return (
      <div style={{ width: '800px' }}>
        <Pagination
          page={page}
          pageCount={10}
          total={100}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onPageChange={setPage}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const arrows = canvasElement.querySelectorAll('.ds-pagination__arrow');
    const previous = arrows[0] as HTMLButtonElement;
    const next = arrows[1] as HTMLButtonElement;

    // Figma `Number=10` at page 1: first, gap, last.
    expect(labels(canvasElement)).toEqual(['1', '...', '10']);
    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);
    expect(canvasElement.querySelector('.ds-pagination__total')?.textContent).toContain('100');

    await userEvent.click(next);
    expect(labels(canvasElement)).toEqual(['1', '2', '...', '10']);
    expect(canvasElement.querySelector('[aria-current="page"]')?.textContent).toBe('2');

    await userEvent.click(canvasElement.querySelectorAll('.ds-pagination__page')[2] as HTMLElement);
    expect(labels(canvasElement)).toEqual(['1', '...', '10']);
    expect(next.disabled).toBe(true);
  },
};

export const Many: Story = {
  render: () => {
    const [page, setPage] = React.useState(6);
    return (
      <div style={{ width: '800px' }}>
        <Pagination page={page} pageCount={15} total={300} onPageChange={setPage} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // Neighbours appear mid-range, exactly like Figma `Number=Many`.
    expect(labels(canvasElement)).toEqual(['1', '...', '5', '6', '7', '...', '15']);
    expect(canvasElement.querySelector('[aria-current="page"]')?.textContent).toBe('6');
  },
};

export const PageSize: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    const [pageSize, setPageSize] = React.useState(10);

    return (
      <div style={{ width: '800px' }}>
        <Pagination
          page={page}
          pageCount={5}
          total={50}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onPageChange={setPage}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // 5 pages or fewer are all rendered, like Figma `Number=5`.
    expect(labels(canvasElement)).toEqual(['1', '2', '3', '4', '5']);

    await userEvent.click(canvasElement.querySelector('.ds-pagination__size') as HTMLElement);
    await waitFor(() => expect(document.querySelectorAll('.ds-select__item').length).toBe(4));
    await userEvent.click(document.querySelectorAll('.ds-select__item')[1] as HTMLElement);

    await waitFor(() =>
      expect(
        canvasElement.querySelector('.ds-pagination__size .ds-select__value')?.textContent
      ).toBe('20')
    );
  },
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { Button } from '../components/Button';
import { SnackbarProvider, useSnackbar } from '../components/Snackbar';
import type { SnackbarType } from '../components/Snackbar';

const meta: Meta<typeof SnackbarProvider> = {
  title: 'Components/Snackbar',
  component: SnackbarProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SnackbarProvider>;

function Trigger({
  type,
  action,
  label = 'Tampilkan snackbar',
}: {
  type?: SnackbarType;
  action?: boolean;
  label?: string;
}) {
  const snackbar = useSnackbar();

  return (
    <Button
      onClick={() =>
        snackbar.add({
          type,
          title: 'Berhasil disimpan',
          description: 'Perubahan kamu sudah tersimpan.',
          ...(action
            ? { actionProps: { children: 'Urungkan', onClick: () => undefined } }
            : null),
        })
      }
    >
      {label}
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <SnackbarProvider>
      <Trigger type="success" />
    </SnackbarProvider>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('button') as HTMLElement);

    const snackbar = document.querySelector('.ds-snackbar');
    expect(snackbar).not.toBeNull();
    expect(snackbar?.getAttribute('data-type')).toBe('success');
    expect(snackbar?.textContent).toContain('Berhasil disimpan');
    expect(document.querySelector('.ds-snackbar__icon')).not.toBeNull();
  },
};

export const Types: Story = {
  render: () => (
    <SnackbarProvider>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Trigger type="success" label="Success" />
        <Trigger type="warning" label="Warning" />
        <Trigger type="error" label="Error" />
      </div>
    </SnackbarProvider>
  ),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll('button');
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    await userEvent.click(buttons[2]);

    // Base UI renders the frontmost toast first, so the DOM order is newest
    // first rather than insertion order.
    const types = [...document.querySelectorAll('.ds-snackbar')].map((n) =>
      n.getAttribute('data-type')
    );
    expect(types).toContain('success');
    expect(types).toContain('warning');
    expect(types).toContain('error');
    expect(types.length).toBe(3);
  },
};

export const WithAction: Story = {
  render: () => (
    <SnackbarProvider>
      <Trigger type="error" action />
    </SnackbarProvider>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('button') as HTMLElement);
    expect(document.querySelector('.ds-snackbar__action')?.textContent).toBe('Urungkan');
  },
};

export const Dismiss: Story = {
  render: () => (
    <SnackbarProvider>
      <Trigger type="success" />
    </SnackbarProvider>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('button') as HTMLElement);
    const close = document.querySelector('.ds-snackbar__close');
    expect(close?.getAttribute('aria-label')).toBe('Tutup');
  },
};

export const BottomCenter: Story = {
  render: () => (
    <SnackbarProvider position="bottom-center">
      <Trigger type="warning" />
    </SnackbarProvider>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('button') as HTMLElement);
    const viewport = document.querySelector('.ds-snackbar__viewport');
    expect(viewport?.getAttribute('data-position')).toBe('bottom-center');
  },
};

export const Stacked: Story = {
  render: () => {
    const Snackbars = () => {
      const snackbar = useSnackbar();
      return (
        <Button
          onClick={() => {
            snackbar.add({ type: 'success', title: 'Pertama' });
            snackbar.add({ type: 'warning', title: 'Kedua' });
            snackbar.add({ type: 'error', title: 'Ketiga' });
            snackbar.add({ type: 'success', title: 'Keempat' });
          }}
        >
          Tampilkan 4 snackbar
        </Button>
      );
    };

    return (
      <SnackbarProvider>
        <Snackbars />
      </SnackbarProvider>
    );
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('button') as HTMLElement);
    const snackbars = document.querySelectorAll('.ds-snackbar');
    expect(snackbars.length).toBe(4);
    // The 4th exceeds the default limit of 3 and is parked with data-limited.
    expect(document.querySelectorAll('.ds-snackbar[data-limited]').length).toBe(1);
  },
};

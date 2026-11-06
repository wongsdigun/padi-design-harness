import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import {
  Modal,
  ModalActions,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTrigger,
} from '../components/Modal';
import { Tabs, TabsList, TabsPanel, TabsTab } from '../components/Tabs';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger render={<Button />}>Buka modal</ModalTrigger>
      <ModalContent>
        <ModalHeader title="Konfirmasi" />
        <ModalBody>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '21px' }}>
            Apakah kamu yakin ingin melanjutkan? Tindakan ini tidak bisa dibatalkan.
          </p>
        </ModalBody>
        <ModalActions>
          <Button type="outline">Batal</Button>
          <Button>Lanjutkan</Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('button') as HTMLElement);

    const modal = document.querySelector('.ds-modal');
    expect(modal).not.toBeNull();
    expect(modal?.querySelector('.ds-modal__title')?.textContent).toBe('Konfirmasi');
    expect(document.querySelector('.ds-modal__backdrop')).not.toBeNull();
    expect(modal?.querySelectorAll('.ds-modal__actions > *').length).toBe(2);
  },
};

export const Closes: Story = {
  render: () => (
    <Modal defaultOpen>
      <ModalContent>
        <ModalHeader title="Tutup modal" />
        <ModalBody>Konten</ModalBody>
      </ModalContent>
    </Modal>
  ),
  play: async () => {
    const close = document.querySelector('.ds-modal__close');
    expect(close?.getAttribute('aria-label')).toBe('Tutup');

    await userEvent.click(close as HTMLElement);
    await waitFor(() => expect(document.querySelector('.ds-modal')).toBeNull());
  },
};

export const MobileSheet: Story = {
  render: () => (
    <Modal defaultOpen>
      <ModalContent mobile>
        <ModalHeader title="Filter" />
        <ModalBody>
          <p style={{ margin: 0, fontSize: '14px' }}>Konten sheet.</p>
        </ModalBody>
        <ModalActions>
          <Button>Terapkan</Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  ),
  play: async () => {
    const modal = document.querySelector('.ds-modal');
    expect(modal?.hasAttribute('data-mode-mobile')).toBe(true);
    expect(modal?.querySelectorAll('.ds-modal__actions > *').length).toBe(1);
  },
};

export const Form: Story = {
  render: () => (
    <Modal defaultOpen>
      <ModalContent>
        <ModalHeader title="Tambah data" />
        <ModalBody>
          <Tabs defaultValue="umum">
            <TabsList aria-label="Bagian form">
              <TabsTab value="umum">Umum</TabsTab>
              <TabsTab value="detail">Detail</TabsTab>
            </TabsList>
            <TabsPanel value="umum">
              <TextField label="Nama" placeholder="Nama lengkap" />
            </TabsPanel>
            <TabsPanel value="detail">
              <TextField label="Catatan" placeholder="Opsional" />
            </TabsPanel>
          </Tabs>
        </ModalBody>
        <ModalActions>
          <Button type="outline">Batal</Button>
          <Button>Simpan</Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  ),
  play: async () => {
    const modal = document.querySelector('.ds-modal');
    expect(modal?.querySelectorAll('.ds-tabs__tab').length).toBe(2);
    expect(modal?.querySelector('.ds-modal__body')).not.toBeNull();
  },
};

export const StackedActions: Story = {
  render: () => (
    <Modal defaultOpen>
      <ModalContent>
        <ModalHeader title="Pilih tindakan" />
        <ModalBody>Tiga tombol, sesuai varian Figma `Content=3 button a`.</ModalBody>
        <ModalActions layout="stack">
          <Button>Simpan dan lanjut</Button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="outline">Lewati</Button>
            <Button type="outline">Batal</Button>
          </div>
        </ModalActions>
      </ModalContent>
    </Modal>
  ),
  play: async () => {
    const actions = document.querySelector('.ds-modal__actions');
    expect(actions?.getAttribute('data-layout')).toBe('stack');
    expect(actions?.querySelectorAll('button').length).toBe(3);
  },
};

export const CustomIcon: Story = {
  render: () => (
    <Modal defaultOpen>
      <ModalContent>
        <ModalHeader
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 2L4 8l6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Rincian pesanan"
        />
        <ModalBody>Header dengan ikon kiri.</ModalBody>
      </ModalContent>
    </Modal>
  ),
  play: async () => {
    expect(document.querySelector('.ds-modal__icon')).not.toBeNull();
    expect(document.querySelector('.ds-modal__title')?.textContent).toBe('Rincian pesanan');
  },
};

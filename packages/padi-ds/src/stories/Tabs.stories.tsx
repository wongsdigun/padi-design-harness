import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { Tabs, TabsList, TabsPanel, TabsTab } from '../components/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="overview">
      <TabsList aria-label="Contoh tab">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="detail">Detail</TabsTab>
        <TabsTab value="riwayat">Riwayat</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Konten overview</TabsPanel>
      <TabsPanel value="detail">Konten detail</TabsPanel>
      <TabsPanel value="riwayat">Konten riwayat</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('.ds-tabs__tab');
    expect(tabs.length).toBe(3);
    expect(tabs[0].getAttribute('data-active')).not.toBeNull();

    await userEvent.click(tabs[1]);
    expect(tabs[1].getAttribute('data-active')).not.toBeNull();
    expect(canvasElement.textContent).toContain('Konten detail');
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Tabs defaultValue="a">
        <TabsList size="md" aria-label="Tab md">
          <TabsTab value="a">Tab md</TabsTab>
          <TabsTab value="b">Kedua</TabsTab>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="a">
        <TabsList size="lg" aria-label="Tab lg">
          <TabsTab value="a">Tab lg</TabsTab>
          <TabsTab value="b">Kedua</TabsTab>
        </TabsList>
      </Tabs>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabsList aria-label="Tab dengan badge">
        <TabsTab value="all">Semua</TabsTab>
        <TabsTab value="pending" badge={3}>
          Pending
        </TabsTab>
        <TabsTab value="done" badge={12}>
          Selesai
        </TabsTab>
      </TabsList>
      <TabsPanel value="all">Semua transaksi</TabsPanel>
      <TabsPanel value="pending">Transaksi pending</TabsPanel>
      <TabsPanel value="done">Transaksi selesai</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector('.ds-tabs__badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe('3');
  },
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="first">
      <TabsList aria-label="Tab dengan disabled">
        <TabsTab value="first">First</TabsTab>
        <TabsTab value="second" disabled>
          Disabled
        </TabsTab>
      </TabsList>
      <TabsPanel value="first">Konten first</TabsPanel>
      <TabsPanel value="second">Konten second</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const disabled = canvasElement.querySelectorAll('.ds-tabs__tab')[1];
    // Base UI marks disabled tabs with data-disabled rather than the native
    // attribute, so the styling hooks off that.
    expect(disabled.getAttribute('data-disabled')).not.toBeNull();
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Tabs defaultValue="first">
      <TabsList aria-label="Tab keyboard">
        <TabsTab value="first">First</TabsTab>
        <TabsTab value="second">Second</TabsTab>
      </TabsList>
      <TabsPanel value="first">Konten first</TabsPanel>
      <TabsPanel value="second">Konten second</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('.ds-tabs__tab');
    tabs[0].focus();
    // Enter activates the focused tab.
    await userEvent.keyboard('{ArrowRight}{Enter}');
    expect(tabs[1].getAttribute('data-active')).not.toBeNull();
  },
};

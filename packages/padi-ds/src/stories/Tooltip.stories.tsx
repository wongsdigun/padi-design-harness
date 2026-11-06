import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { Tooltip, TooltipInfo } from '../components/Tooltip';
import { Button } from '../components/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'tooltip_content',
    delay: 0,
    side: 'top',
    align: 'center',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button type="solid">Hover me</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('button');
    expect(trigger).not.toBeNull();
    if (trigger) {
      await userEvent.hover(trigger);
    }
    await waitFor(() => {
      const popup = document.querySelector('.ds-tooltip');
      expect(popup).not.toBeNull();
      expect(popup?.textContent).toContain('tooltip_content');
    });
  },
};

export const Sides: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '48px',
        padding: '64px',
      }}
    >
      <Tooltip content="side=top" side="top" delay={0}>
        <Button type="outline">top</Button>
      </Tooltip>
      <Tooltip content="side=bottom" side="bottom" delay={0}>
        <Button type="outline">bottom</Button>
      </Tooltip>
      <Tooltip content="side=right" side="right" delay={0}>
        <Button type="outline">right</Button>
      </Tooltip>
      <Tooltip content="side=left" side="left" delay={0}>
        <Button type="outline">left</Button>
      </Tooltip>
      <Tooltip content="align=start" side="top" align="start" delay={0}>
        <Button type="outline">align=start</Button>
      </Tooltip>
      <Tooltip content="align=end" side="top" align="end" delay={0}>
        <Button type="outline">align=end</Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutArrow: Story = {
  args: {
    content: 'Tanpa arrow',
    arrow: false,
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button type="outline">No arrow</Button>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  args: {
    content: 'Tidak akan muncul',
    disabled: true,
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button type="outline">Disabled</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger) {
      await userEvent.hover(trigger);
    }
    expect(document.querySelector('.ds-tooltip')).toBeNull();
  },
};

export const Info: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '14px' }}>Nominal transfer</span>
      <TooltipInfo
        content="Maksimal Rp50.000.000 per transaksi"
        delay={0}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('.ds-tooltip-info');
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute('aria-label')).toBe(
      'Maksimal Rp50.000.000 per transaksi'
    );
    if (trigger) {
      await userEvent.hover(trigger);
    }
    await waitFor(() => {
      expect(document.querySelector('.ds-tooltip')).not.toBeNull();
    });
  },
};

export const InfoPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '48px' }}>
      <TooltipInfo content="Position=Top" side="top" delay={0} />
      <TooltipInfo content="Position=Right" side="right" delay={0} />
      <TooltipInfo content="Position=Left" side="left" delay={0} />
      <TooltipInfo content="Position=Bottom" side="bottom" delay={0} />
    </div>
  ),
};

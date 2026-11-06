import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { Uploader, UploadedFile } from '../components/Uploader';

const meta: Meta<typeof Uploader> = {
  title: 'Components/Uploader',
  component: Uploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Uploader>;

export const Default: Story = {
  render: () => {
    const [names, setNames] = React.useState<string[]>([]);

    return (
      <div style={{ width: '564px' }}>
        <Uploader
          accept="image/*"
          multiple
          onFiles={(files) => setNames([...files].map((file) => file.name))}
        >
          {names.map((name) => (
            <UploadedFile
              key={name}
              name={name}
              size="546 KB"
              onRemove={() => setNames(names.filter((n) => n !== name))}
            />
          ))}
        </Uploader>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('.ds-uploader__input') as HTMLInputElement;
    await userEvent.upload(input, new File(['x'], 'foto.jpg', { type: 'image/jpeg' }));

    await waitFor(() =>
      expect(canvasElement.querySelector('.ds-uploader__file-name')?.textContent).toBe('foto.jpg')
    );

    await userEvent.click(canvasElement.querySelector('.ds-uploader__file-action') as HTMLElement);
    await waitFor(() => expect(canvasElement.querySelector('.ds-uploader__file')).toBeNull());
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '564px' }}>
      <UploadedFile name="foto.jpg" size="546 KB" state="progress" progress={50} onRemove={() => undefined} />
      <UploadedFile name="dokumen.pdf" size="1 MB" onRemove={() => undefined} />
      <UploadedFile name="video.mov" size="10 MB" state="failed" onRetry={() => undefined} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('.ds-uploader__file');
    expect(rows.length).toBe(3);
    expect(rows[1].getAttribute('data-state')).toBe('success');
    expect(rows[2].getAttribute('data-state')).toBe('failed');
    expect(
      canvasElement.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')
    ).toBe('50');
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '564px' }}>
      <Uploader disabled onFiles={() => undefined} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(
      (canvasElement.querySelector('.ds-uploader__input') as HTMLInputElement).disabled
    ).toBe(true);
  },
};

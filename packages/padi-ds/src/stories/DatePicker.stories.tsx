import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { DatePicker } from '../components/DatePicker';
import type { DateRange } from '../components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const popup = (canvasElement: HTMLElement) =>
  canvasElement.ownerDocument.querySelector<HTMLElement>('.ds-date-picker__popup');

const dayByNumber = (canvasElement: HTMLElement, numbers: number[], index = 0) =>
  [...(popup(canvasElement)?.querySelectorAll<HTMLButtonElement>('.ds-date-picker__day') ?? [])].filter(
    (button) => Number(button.textContent) === numbers[index]
  )[index];

export const Single: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(null);

    return (
      <div style={{ width: '383px' }}>
        <DatePicker
          label="Tanggal"
          hint="Pilih tanggal transaksi"
          value={value}
          onValueChange={setValue}
          defaultMonth={new Date(2026, 0, 1)}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('.ds-date-picker__trigger') as HTMLElement;
    expect(trigger.textContent).toContain('dd/mm/yy');

    await userEvent.click(trigger);
    await waitFor(() => expect(popup(canvasElement)).toBeTruthy());

    // Figma `<Month>`: "Januari 2026" between the two 24px arrows.
    expect(popup(canvasElement)?.querySelector('.ds-date-picker__title')?.textContent).toBe('Januari 2026');
    // Figma week starts on Sen and ends on Min.
    expect(
      [...(popup(canvasElement)?.querySelectorAll('.ds-date-picker__weekday') ?? [])].map((n) => n.textContent)
    ).toEqual(['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']);
    // 6 rows of 7, leading days from the previous month.
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day')).toHaveLength(42);
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day[data-outside]').length).toBeGreaterThan(0);
    // Weekends are the default red days.
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day[data-holiday]').length).toBeGreaterThan(0);

    await userEvent.click(dayByNumber(canvasElement, [14]));
    await waitFor(() => expect(popup(canvasElement)).toBeNull());
    expect(trigger.textContent).toContain('14/01/26');
  },
};

export const MonthAndYearViews: Story = {
  render: () => (
    <div style={{ width: '383px' }}>
      <DatePicker label="Tanggal" defaultMonth={new Date(2026, 0, 1)} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('.ds-date-picker__trigger') as HTMLElement);
    await waitFor(() => expect(popup(canvasElement)).toBeTruthy());

    const title = popup(canvasElement)?.querySelector('.ds-date-picker__title') as HTMLElement;

    // day -> month
    await userEvent.click(title);
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__grid--month .ds-date-picker__cell')).toHaveLength(12);
    expect(popup(canvasElement)?.querySelector('.ds-date-picker__title')?.textContent).toBe('Januari 2026');

    // month -> year, 12 years per page
    await userEvent.click(title);
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__grid--year .ds-date-picker__cell')).toHaveLength(12);
    expect(title.textContent).toMatch(/^\d{4} - \d{4}$/);
    const pageStart = Number(title.textContent?.split(' - ')[0]);

    // year -> month, then month -> day (the title only cycles day -> month -> year)
    await userEvent.click(popup(canvasElement)?.querySelectorAll('.ds-date-picker__cell')[8] as HTMLElement);
    expect(title.textContent).toBe(`Januari ${pageStart + 8}`);
    await userEvent.click(popup(canvasElement)?.querySelectorAll('.ds-date-picker__cell')[3] as HTMLElement);
    expect(title.textContent).toBe(`April ${pageStart + 8}`);
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day')).toHaveLength(42);
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = React.useState<DateRange>({ start: null, end: null });

    return (
      <div style={{ width: '383px' }}>
        <DatePicker
          selectionMode="range"
          label="Periode"
          value={value}
          onValueChange={setValue}
          defaultMonth={new Date(2026, 1, 1)}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('.ds-date-picker__trigger') as HTMLElement;

    await userEvent.click(trigger);
    await waitFor(() => expect(popup(canvasElement)).toBeTruthy());
    await userEvent.click(dayByNumber(canvasElement, [10]));
    // First click arms the range and keeps the popup open.
    expect(popup(canvasElement)).toBeTruthy();

    await userEvent.click(dayByNumber(canvasElement, [20]));
    await waitFor(() => expect(popup(canvasElement)).toBeNull());

    expect(trigger.textContent).toContain('10/02/26 - 20/02/26');
    expect(canvasElement.querySelector('.ds-date-picker__value')?.textContent).toBe('10/02/26 - 20/02/26');

    await userEvent.click(trigger);
    await waitFor(() => expect(popup(canvasElement)).toBeTruthy());
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day[data-range-start]')).toHaveLength(1);
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day[data-range-end]')).toHaveLength(1);
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day[data-in-range]')).toHaveLength(9);
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '383px' }}>
      <DatePicker
        label="Tanggal"
        disabled
        defaultMonth={new Date(2026, 0, 1)}
        isDateDisabled={(date) => date.getDate() === 15}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect((canvasElement.querySelector('.ds-date-picker__trigger') as HTMLButtonElement).disabled).toBe(true);
  },
};

export const States: Story = {
  render: () => (
    <div style={{ width: '383px' }}>
      <DatePicker
        label="Tanggal"
        defaultValue={new Date(2026, 0, 14)}
        defaultMonth={new Date(2026, 0, 1)}
        isDateDisabled={(date) => date.getDate() === 20}
        footer={<span>Waktu</span>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.querySelector('.ds-date-picker__trigger') as HTMLElement);
    await waitFor(() => expect(popup(canvasElement)).toBeTruthy());

    const selected = popup(canvasElement)?.querySelectorAll('.ds-date-picker__day[data-selected]');
    expect(selected).toHaveLength(1);
    expect(selected?.[0].textContent).toBe('14');
    expect(popup(canvasElement)?.querySelectorAll('.ds-date-picker__day:disabled')).toHaveLength(1);
    expect(popup(canvasElement)?.querySelector('.ds-date-picker__footer')?.textContent).toBe('Waktu');
  },
};

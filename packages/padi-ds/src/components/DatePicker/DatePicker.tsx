'use client';

import * as React from 'react';
import { Popover } from '@base-ui/react/popover';

export type DateRange = { start: Date | null; end: Date | null };
export type DatePickerView = 'day' | 'month' | 'year';

interface DatePickerBaseProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange' | 'value' | 'onValueChange' | 'selectionMode'
  > {
  /** Label above the field. */
  label?: React.ReactNode;

  /** Helper text below the field. */
  hint?: React.ReactNode;

  /** @default 'dd/mm/yy' */
  placeholder?: string;

  /** BCP-47 tag for weekday / month names. @default 'id-ID' */
  locale?: string;

  /** 0 = Sunday. @default 1 — Figma starts the week on `Sen`. */
  weekStartsOn?: number;

  /** Red days. @default Saturday and Sunday. */
  isHoliday?: (date: Date) => boolean;

  isDateDisabled?: (date: Date) => boolean;

  /** Rendered under the calendar — Figma's `Waktu` row. */
  footer?: React.ReactNode;

  disabled?: boolean;

  name?: string;

  /** Trigger text for one date. @default `dd/mm/yy` via `Intl`. */
  formatDate?: (date: Date) => string;

  /** Month shown first. @default today */
  defaultMonth?: Date;
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  selectionMode?: 'single';
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  selectionMode: 'range';
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

/** 42 days, `weekStartsOn` first — Figma draws 6 rows of 7. */
function monthGrid(month: Date, weekStartsOn: number): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(first);
  start.setDate(1 - offset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2.75" y="4.25" width="14.5" height="13" rx="1.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.75 8.25h14.5M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Figma `date picker`: text-field trigger + a day / month / year popup. */
export function DatePicker(props: DatePickerProps) {
  const {
    selectionMode = 'single',
    label,
    hint,
    placeholder = 'dd/mm/yy',
    locale = 'id-ID',
    weekStartsOn = 1,
    isHoliday = isWeekend,
    isDateDisabled,
    footer,
    disabled = false,
    name,
    formatDate,
    defaultMonth,
    className = '',
    // Pulled off `props` so the union types never reach the DOM spread.
    value: rawValue,
    defaultValue: rawDefault,
    onValueChange,
    ...rest
  } = props;

  const rangeMode = selectionMode === 'range';
  const value = rawValue as DateRange | Date | null | undefined;
  const initial = rawDefault as DateRange | Date | null | undefined;
  const change = onValueChange as ((next: unknown) => void) | undefined;

  const format =
    formatDate ??
    ((date: Date) =>
      new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date));

  const [inner, setInner] = React.useState<DateRange>(() => {
    if (rangeMode) {
      const range = initial as DateRange | null | undefined;
      return { start: range?.start ?? null, end: range?.end ?? null };
    }
    return { start: (initial as Date | null | undefined) ?? null, end: null };
  });

  const controlled = value !== undefined;
  const current: DateRange = controlled
    ? rangeMode
      ? {
          start: (value as DateRange | null)?.start ?? null,
          end: (value as DateRange | null)?.end ?? null,
        }
      : { start: (value as Date | null) ?? null, end: null }
    : inner;

  const commit = (next: DateRange) => {
    if (!controlled) {
      setInner(next);
    }
    change?.(rangeMode ? next : next.start);
  };

  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = React.useState(() => defaultMonth ?? current.start ?? today);
  const [view, setView] = React.useState<DatePickerView>('day');
  const [open, setOpen] = React.useState(false);

  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long' }).format(viewDate);
  const monthNames = React.useMemo(
    () => Array.from({ length: 12 }, (_, index) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(2024, index, 1))),
    [locale]
  );
  const weekdayNames = React.useMemo(() => {
    const names = Array.from({ length: 7 }, (_, index) =>
      new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2024, 0, 7 + index))
    );
    return Array.from({ length: 7 }, (_, index) => names[(weekStartsOn + index) % 7]);
  }, [locale, weekStartsOn]);

  const step = (direction: 1 | -1) => {
    if (view === 'day') {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + direction, 1));
    } else if (view === 'month') {
      setViewDate(new Date(viewDate.getFullYear() + direction, viewDate.getMonth(), 1));
    } else {
      setViewDate(new Date(viewDate.getFullYear() + direction * 12, viewDate.getMonth(), 1));
    }
  };

  const select = (date: Date) => {
    if (rangeMode) {
      const { start, end } = current;
      if (!start || (start && end)) {
        commit({ start: date, end: null });
      } else {
        const ordered = date < start ? { start: date, end: start } : { start, end: date };
        commit(ordered);
        setOpen(false);
      }
      return;
    }
    commit({ start: date, end: null });
    setOpen(false);
  };

  const text = current.start
    ? current.end
      ? `${format(current.start)} - ${format(current.end)}`
      : format(current.start)
    : '';

  const dayDisabled = (date: Date) => disabled || !!isDateDisabled?.(date);

  const cellState = (date: Date) => {
    const { start, end } = current;
    const outside = date.getMonth() !== viewDate.getMonth();
    const inRange = !!start && !!end && date > start && date < end;
    return {
      outside,
      holiday: isHoliday(date),
      today: sameDay(date, today),
      selected: sameDay(date, start) || sameDay(date, end),
      'range-start': !!start && !!end && sameDay(date, start),
      'range-end': !!start && !!end && sameDay(date, end),
      'in-range': inRange,
    };
  };

  const cells = monthGrid(viewDate, weekStartsOn);
  const yearStart = Math.floor(viewDate.getFullYear() / 12) * 12;

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setView('day');
        }
      }}
    >
      <div
        className={['ds-date-picker', className].filter(Boolean).join(' ')}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {label ? <span className="ds-text-field__label">{label}</span> : null}
        {name ? <input type="hidden" name={name} value={text} readOnly /> : null}

        <Popover.Trigger
          className="ds-text-field-container ds-text-field-container--md ds-date-picker__trigger"
          disabled={disabled}
        >
          <span
            className="ds-text-field__input ds-date-picker__value"
            data-placeholder={text ? undefined : ''}
          >
            {text || placeholder}
          </span>
          <span className="ds-text-field__slot ds-date-picker__icon">
            <CalendarIcon />
          </span>
        </Popover.Trigger>

        {hint ? <span className="ds-text-field__description">{hint}</span> : null}
      </div>

      <Popover.Portal>
        <Popover.Positioner sideOffset={4} className="ds-date-picker__positioner">
          <Popover.Popup className="ds-date-picker__popup">
            <div className="ds-date-picker__header">
              <button
                type="button"
                className="ds-date-picker__nav"
                onClick={() => step(-1)}
                aria-label="Sebelumnya"
              >
                <Chevron direction="left" />
              </button>
              <button
                type="button"
                className="ds-date-picker__title"
                onClick={() => setView(view === 'day' ? 'month' : view === 'month' ? 'year' : 'day')}
                aria-label="Ubah tampilan"
              >
                {view === 'year' ? `${yearStart} - ${yearStart + 11}` : `${monthLabel} ${viewDate.getFullYear()}`}
              </button>
              <button
                type="button"
                className="ds-date-picker__nav"
                onClick={() => step(1)}
                aria-label="Berikutnya"
              >
                <Chevron direction="right" />
              </button>
            </div>

            {view === 'day' ? (
              <div className="ds-date-picker__grid" role="presentation">
                {weekdayNames.map((name) => (
                  <span key={name} className="ds-date-picker__weekday" aria-hidden="true">
                    {name}
                  </span>
                ))}
                {cells.map((date) => {
                  const state = cellState(date);
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      className="ds-date-picker__day"
                      data-outside={state.outside ? '' : undefined}
                      data-holiday={state.holiday ? '' : undefined}
                      data-today={state.today ? '' : undefined}
                      data-selected={state.selected ? '' : undefined}
                      data-range-start={state['range-start'] ? '' : undefined}
                      data-range-end={state['range-end'] ? '' : undefined}
                      data-in-range={state['in-range'] ? '' : undefined}
                      aria-pressed={state.selected}
                      aria-current={state.today ? 'date' : undefined}
                      disabled={dayDisabled(date)}
                      onClick={() => select(date)}
                    >
                      <span className="ds-date-picker__day-label">{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                className={`ds-date-picker__grid ds-date-picker__grid--wide ds-date-picker__grid--${view}`}
                role="presentation"
              >
                {view === 'month'
                  ? monthNames.map((name, index) => (
                      <button
                        key={name}
                        type="button"
                        className="ds-date-picker__cell"
                        data-selected={
                          current.start &&
                          current.start.getMonth() === index &&
                          current.start.getFullYear() === viewDate.getFullYear()
                            ? ''
                            : undefined
                        }
                        data-today={
                          today.getMonth() === index && today.getFullYear() === viewDate.getFullYear()
                            ? ''
                            : undefined
                        }
                        onClick={() => {
                          setViewDate(new Date(viewDate.getFullYear(), index, 1));
                          setView('day');
                        }}
                      >
                        {name}
                      </button>
                    ))
                  : Array.from({ length: 12 }, (_, index) => yearStart + index).map((year) => (
                      <button
                        key={year}
                        type="button"
                        className="ds-date-picker__cell"
                        data-selected={current.start?.getFullYear() === year ? '' : undefined}
                        data-today={today.getFullYear() === year ? '' : undefined}
                        onClick={() => {
                          setViewDate(new Date(year, viewDate.getMonth(), 1));
                          setView('month');
                        }}
                      >
                        {year}
                      </button>
                    ))}
              </div>
            )}

            {footer ? <div className="ds-date-picker__footer">{footer}</div> : null}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

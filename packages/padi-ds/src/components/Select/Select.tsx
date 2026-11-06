'use client';

import * as React from 'react';
import { Combobox } from '@base-ui/react/combobox';

export type SelectProps = React.ComponentProps<typeof Combobox.Root>;
export type SelectTriggerProps = React.ComponentProps<typeof Combobox.Trigger>;
export type SelectSearchProps = React.ComponentProps<typeof Combobox.Input>;

export interface SelectInputProps
  extends Omit<React.ComponentProps<typeof Combobox.Input>, 'children'> {
  /** Label above the field. */
  label?: React.ReactNode;

  /** Helper text below the field. */
  hint?: React.ReactNode;
}

export interface SelectItemProps
  extends Omit<React.ComponentProps<typeof Combobox.Item>, 'children'> {
  /** Item text — Figma's `Label` (14/21 medium). */
  label: React.ReactNode;

  /** Optional second line — Figma's `Description` (12/18). */
  description?: React.ReactNode;
}

export interface SelectContentProps
  extends Omit<React.ComponentProps<typeof Combobox.Popup>, 'children'> {
  /**
   * Mirrors `Select`'s `multiple` so the CSS can swap the tick circle for a
   * checkbox. Applied as `data-mode-multiple`.
   */
  multiple?: boolean;

  /**
   * Rendered above the list — pass a `<SelectSearch />` for Figma's
   * searchable `select list`.
   */
  search?: React.ReactNode;

  /**
   * Shown when filtering leaves no matches.
   * @default 'Tidak ada hasil'
   */
  emptyLabel?: React.ReactNode;

  /** Render-prop over `Select`'s `items`; annotate the parameter yourself. */
  children?: React.ReactNode | ((item: never) => React.ReactNode);
}

const Chevron = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5.5 8.25L10 12.75l4.5-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Groups all parts of the select. Renders no element of its own. */
export const Select = Combobox.Root;

/**
 * Figma `select button` — a 44px outline button showing the selected value.
 * Pair with `<SelectContent>` (and usually `<SelectSearch>`).
 */
export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className = '', children, ...props }, ref) {
    return (
      <Combobox.Trigger
        ref={ref}
        className={['ds-select__trigger', className].filter(Boolean).join(' ')}
        {...props}
      >
        <span className="ds-select__value">
          {children ?? <Combobox.Value placeholder="Pilih" />}
        </span>
        <Combobox.Icon className="ds-select__icon">
          <Chevron />
        </Combobox.Icon>
      </Combobox.Trigger>
    );
  }
);

/**
 * Figma `select field` — label, text input and hint, the input acting as the
 * trigger.
 */
export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  function SelectInput({ label, hint, className = '', ...props }, ref) {
    return (
      <div className="ds-select__field">
        {/* `as never` bridges the duplicate @types/react copies (package React 19
            types vs the root React 18 types Base UI uses). */}
        {label ? (
          <Combobox.Label className="ds-text-field__label">{label as never}</Combobox.Label>
        ) : null}

        <Combobox.InputGroup className="ds-text-field-container ds-text-field-container--md ds-select__input-group">
          <Combobox.Input
            ref={ref}
            className={['ds-text-field__input', className].filter(Boolean).join(' ')}
            {...props}
          />
          <Combobox.Trigger className="ds-select__chevron" aria-label="Buka pilihan">
            <Chevron />
          </Combobox.Trigger>
        </Combobox.InputGroup>

        {hint ? <span className="ds-text-field__description">{hint}</span> : null}
      </div>
    );
  }
);

/** Figma `select list` — the popup. */
export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(
    { multiple = false, search, emptyLabel, className = '', children, ...props },
    ref
  ) {
    return (
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4} className="ds-select__positioner">
          <Combobox.Popup
            ref={ref}
            className={['ds-select__list', className].filter(Boolean).join(' ')}
            data-mode-multiple={multiple ? '' : undefined}
            {...props}
          >
            {search as never}
            <Combobox.List className="ds-select__items">{children as never}</Combobox.List>
            {/* Figma has no empty state; this keeps filtered-to-nothing honest. */}
            <Combobox.Empty className="ds-select__empty">
              {(emptyLabel ?? 'Tidak ada hasil') as never}
            </Combobox.Empty>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    );
  }
);

/** Search box shown above the list (Figma's in-list `text field`). */
export const SelectSearch = React.forwardRef<HTMLInputElement, SelectSearchProps>(
  function SelectSearch({ className = '', ...props }, ref) {
    return (
      <Combobox.Input
        ref={ref}
        className={['ds-select__search', className].filter(Boolean).join(' ')}
        {...props}
      />
    );
  }
);

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ label, description, className = '', ...props }, ref) {
    return (
      <Combobox.Item
        ref={ref}
        className={['ds-select__item', className].filter(Boolean).join(' ')}
        {...props}
      >
        <span className="ds-select__text">
          <span className="ds-select__item-label">{label}</span>
          {description ? (
            <span className="ds-select__item-description">{description}</span>
          ) : null}
        </span>
        <Combobox.ItemIndicator className="ds-select__indicator">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path
              d="M1 4l2.6 2.6L9 1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Combobox.ItemIndicator>
      </Combobox.Item>
    );
  }
);

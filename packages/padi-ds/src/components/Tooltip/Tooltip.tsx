'use client';

import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';

export type TooltipSide =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'inline-start'
  | 'inline-end';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  /**
   * Tooltip body. Keep it short — Figma's tooltip is a single 12px/18px line.
   */
  content: React.ReactNode;

  /**
   * The trigger element. Must accept a ref and spread props (every component in
   * this package does). Figma ships 8 arrow placements; here you pick `side`
   * and `align` instead and the arrow follows.
   */
  children: React.ReactElement;

  /**
   * Which side of the trigger the tooltip opens on.
   * @default 'top'
   */
  side?: TooltipSide;

  /**
   * Alignment along the chosen side.
   * @default 'center'
   */
  align?: TooltipAlign;

  /**
   * How long to hover before opening, in milliseconds.
   * @default 600
   */
  delay?: number;

  /**
   * How long to hover off before closing, in milliseconds.
   * @default 0
   */
  closeDelay?: number;

  /**
   * Prevent the tooltip from opening.
   * @default false
   */
  disabled?: boolean;

  /**
   * Render the arrow. Only turn this off when the tooltip is flush against an
   * edge and the arrow would be clipped.
   * @default true
   */
  arrow?: boolean;

  /**
   * Accessible name for the trigger. Tooltips are visual-only, so an icon-only
   * trigger needs this to stay reachable by screen readers. Omit it when the
   * trigger already has a text label.
   */
  ariaLabel?: string;

  className?: string;
}

export function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  delay,
  closeDelay,
  disabled = false,
  arrow = true,
  ariaLabel,
  className = '',
}: TooltipProps) {
  // ponytail: this workspace resolves two copies of @types/react (18 at the
  // root for @base-ui, 19 in this package), so ReactNode cannot cross the
  // Base UI boundary structurally. Casts stay confined to these two nodes;
  // drop them once the duplicates are deduped.
  const trigger = children as never;
  const body = content as never;

  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger
        render={trigger}
        delay={delay}
        closeDelay={closeDelay}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          className="ds-tooltip-positioner"
          side={side}
          align={align}
          sideOffset={arrow ? 6 : 8}
        >
          <BaseTooltip.Popup
            className={['ds-tooltip', className].filter(Boolean).join(' ')}
          >
            {arrow ? <BaseTooltip.Arrow className="ds-tooltip__arrow" /> : null}
            {body}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export interface TooltipInfoProps
  extends Omit<TooltipProps, 'children' | 'ariaLabel'> {
  /**
   * Accessible name for the info button. Defaults to the content when the
   * content is a plain string.
   */
  ariaLabel?: string;
}

/**
 * Figma `tooltip info`: an info-circle icon whose tooltip carries the copy.
 */
export const TooltipInfo = React.forwardRef<HTMLButtonElement, TooltipInfoProps>(
  function TooltipInfo(
    { content, ariaLabel, side = 'top', align = 'center', className = '', ...props },
    ref
  ) {
    const label =
      ariaLabel ?? (typeof content === 'string' ? content : 'Informasi');

    return (
      <Tooltip content={content} side={side} align={align} {...props}>
        <button
          ref={ref}
          type="button"
          className={['ds-tooltip-info', className].filter(Boolean).join(' ')}
          aria-label={label}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 7.25V11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="4.75" r="0.875" fill="currentColor" />
          </svg>
        </button>
      </Tooltip>
    );
  }
);

TooltipInfo.displayName = 'TooltipInfo';

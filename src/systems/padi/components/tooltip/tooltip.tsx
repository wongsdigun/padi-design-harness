import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { TooltipInfo as PadiTooltipInfo } from '@frontend-shared/padi-ds';
import type { TooltipProps as PadiTooltipProps, TooltipInfoProps, TooltipSide, TooltipAlign } from '@frontend-shared/padi-ds';
import { usePortalContainer } from '#studio/runtime';

export interface TooltipProps extends PadiTooltipProps {
  container?: HTMLElement | null;
}

export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  delay,
  closeDelay,
  disabled = false,
  arrow = true,
  ariaLabel,
  className = '',
  container,
}: TooltipProps) {
  const portalContainer = usePortalContainer();
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger
        render={children as never}
        delay={delay}
        closeDelay={closeDelay}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      />
      <BaseTooltip.Portal container={container ?? portalContainer ?? undefined}>
        <BaseTooltip.Positioner
          className="ds-tooltip-positioner"
          side={side}
          align={align}
          sideOffset={arrow ? 6 : 8}
        >
          <BaseTooltip.Popup
            data-padi-ds="Tooltip"
            className={['ds-tooltip', className].filter(Boolean).join(' ')}
          >
            {arrow ? <BaseTooltip.Arrow className="ds-tooltip__arrow" /> : null}
            {content as never}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export function TooltipInfo(props: TooltipInfoProps) {
  return <PadiTooltipInfo data-padi-ds="TooltipInfo" {...props} />;
}

export type { TooltipInfoProps, TooltipSide, TooltipAlign };

'use client';

import * as React from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerColor = 'primary' | 'dark' | 'light' | string;
export type DividerTextPosition = 'left' | 'center' | 'right';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the divider:
   * - `horizontal`: Full width horizontal line
   * - `vertical`: Inline vertical line
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Border line style:
   * - `solid`
   * - `dashed`
   * - `dotted`
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Color variant or custom CSS color:
   * - `primary`: Default neutral border (#D5D7D9)
   * - `dark`: Darker border (#B1B4B8)
   * - `light`: Subtle border (#F6F9FC)
   * @default 'primary'
   */
  color?: DividerColor;

  /**
   * Optional text position when children are provided in a horizontal divider
   * @default 'center'
   */
  textPosition?: DividerTextPosition;

  /**
   * Optional text/label displayed inside the horizontal divider
   */
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      variant = 'solid',
      color = 'primary',
      textPosition = 'center',
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) {
    const isNamedColor = ['primary', 'dark', 'light'].includes(color);
    const hasChildren = Boolean(children) && orientation === 'horizontal';

    const dividerClasses = [
      'ds-divider',
      `ds-divider--${orientation}`,
      `ds-divider--${variant}`,
      isNamedColor ? `ds-divider--color-${color}` : '',
      hasChildren ? `ds-divider--with-text ds-divider--text-${textPosition}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle: React.CSSProperties = {
      ...(!isNamedColor && color ? { borderColor: color } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={dividerClasses}
        style={customStyle}
        {...props}
      >
        {hasChildren && <span className="ds-divider__text">{children}</span>}
      </div>
    );
  }
);

Divider.displayName = 'Divider';

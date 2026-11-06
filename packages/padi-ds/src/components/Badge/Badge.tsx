'use client';

import * as React from 'react';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge size:
   * - `sm`: height 14px, font 10px
   * - `md`: height 16px, font 12px
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Number or content to display in the badge
   */
  count?: React.ReactNode;

  /**
   * Maximum count to display before truncating with '+' (e.g. 99+)
   * @default 99
   */
  maxCount?: number;

  /**
   * Whether to render as a standalone dot without text
   * @default false
   */
  dot?: boolean;

  /**
   * Whether to display the badge when count is 0
   * @default false
   */
  showZero?: boolean;

  /**
   * Custom badge background color override
   */
  color?: string;

  /**
   * Custom text color override
   */
  textColor?: string;

  /**
   * When wrapping a child element (e.g. Button or Icon), the badge is anchored
   * at the top-right corner of the wrapped child.
   */
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      size = 'md',
      count,
      maxCount = 99,
      dot = false,
      showZero = false,
      color,
      textColor,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) {
    // Determine whether the badge should be rendered
    const isZero = count === 0;
    const isHidden = (count === undefined || count === null || (isZero && !showZero)) && !dot;

    // Format count display
    let displayCount: React.ReactNode = count;
    if (typeof count === 'number' && maxCount !== undefined && count > maxCount) {
      displayCount = `${maxCount}+`;
    }

    const badgeStyle: React.CSSProperties = {
      ...(color ? { backgroundColor: color } : {}),
      ...(textColor ? { color: textColor } : {}),
      ...style,
    };

    const badgeClasses = [
      'ds-badge',
      `ds-badge--${size}`,
      dot ? 'ds-badge--dot' : '',
      children ? 'ds-badge--anchored' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (children) {
      return (
        <span className="ds-badge-container">
          {children}
          {!isHidden && (
            <span
              ref={ref}
              className={badgeClasses}
              style={badgeStyle}
              {...props}
            >
              {!dot && displayCount}
            </span>
          )}
        </span>
      );
    }

    if (isHidden) {
      return null;
    }

    return (
      <span
        ref={ref}
        className={badgeClasses}
        style={badgeStyle}
        {...props}
      >
        {!dot && displayCount}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

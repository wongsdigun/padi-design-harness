'use client';

import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';

export type TabsSize = 'md' | 'lg';
export type TabsProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root>;

/** Groups the tab list and its panels. Renders a `<div>`. */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs({ className = '', ...props }, ref) {
  return (
    <BaseTabs.Root
      ref={ref}
      className={['ds-tabs', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
  /**
   * Tab row size from Figma:
   * - `md`: label 14/21
   * - `lg`: label 16/24
   * @default 'md'
   */
  size?: TabsSize;
}

/** The tab row. Renders a `<div role="tablist">`. */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ size = 'md', className = '', ...props }, ref) {
    return (
      <BaseTabs.List
        ref={ref}
        className={['ds-tabs__list', `ds-tabs__list--${size}`, className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  }
);

export interface TabsTabProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
  /**
   * Optional count rendered in a 16px pill after the label.
   */
  badge?: React.ReactNode;
}

/** A single tab button. Renders a `<button>`. */
export const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  function TabsTab({ badge, className = '', children, ...props }, ref) {
    return (
      <BaseTabs.Tab
        ref={ref}
        className={['ds-tabs__tab', className].filter(Boolean).join(' ')}
        {...props}
      >
        <span className="ds-tabs__tab-label">{children}</span>
        {badge !== undefined && badge !== null ? (
          <span className="ds-tabs__badge">{badge}</span>
        ) : null}
      </BaseTabs.Tab>
    );
  }
);

export type TabsPanelProps =
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>;

/** The panel shown for the matching tab value. Renders a `<div>`. */
export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  function TabsPanel({ className = '', ...props }, ref) {
  return (
    <BaseTabs.Panel
      ref={ref}
      className={['ds-tabs__panel', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTab.displayName = 'TabsTab';
TabsPanel.displayName = 'TabsPanel';

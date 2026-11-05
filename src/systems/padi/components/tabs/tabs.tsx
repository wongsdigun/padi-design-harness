import {
  Tabs as PadiTabs,
  TabsList as PadiTabsList,
  TabsTab as PadiTabsTab,
  TabsPanel as PadiTabsPanel,
} from '@frontend-shared/padi-ds';
import type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsPanelProps,
  TabsSize,
} from '@frontend-shared/padi-ds';

export function Tabs(props: TabsProps) {
  return <PadiTabs data-padi-ds="Tabs" {...props} />;
}
export function TabsList(props: TabsListProps) {
  return <PadiTabsList data-padi-ds="TabsList" {...props} />;
}
export function TabsTab(props: TabsTabProps) {
  return <PadiTabsTab data-padi-ds="TabsTab" {...props} />;
}
export function TabsPanel(props: TabsPanelProps) {
  return <PadiTabsPanel data-padi-ds="TabsPanel" {...props} />;
}

export type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsPanelProps,
  TabsSize,
};

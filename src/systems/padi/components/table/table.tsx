import { Table as PadiTable } from '@frontend-shared/padi-ds';
import type { TableProps, TableColumn } from '@frontend-shared/padi-ds';

export function Table<T>(props: TableProps<T>) {
  return <PadiTable data-padi-ds="Table" {...props} />;
}

export type { TableProps, TableColumn };

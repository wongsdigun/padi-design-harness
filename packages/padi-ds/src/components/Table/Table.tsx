'use client';

import * as React from 'react';

export interface TableColumn<Row> {
  /** Header cell — Figma `cell_header_value` (Ubuntu Medium 14/21). */
  header: React.ReactNode;

  /** Body cell — Figma `cell_value`, or any component (Chip / Button / Checkbox). */
  cell: (row: Row, index: number) => React.ReactNode;
}

export interface TableProps<Row>
  extends Omit<React.HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<Row>[];
  rows: Row[];

  /** Stable React key for a row. */
  rowKey: (row: Row, index: number) => React.Key;

  /** Optional `<caption>`, rendered above the header. */
  caption?: React.ReactNode;
}

/**
 * Figma `table column`: 56px rows, 8/16 cell padding, 1px #DEE3ED row rules,
 * a #F9FAFA header over #8C9197, and #F9FAFA shading on every second row.
 *
 * ponytail: fixed 56px rows and no column widths — add `width` to `TableColumn`
 * when a table needs to size columns itself.
 */
export function Table<Row>({
  columns,
  rows,
  rowKey,
  caption,
  className = '',
  ...props
}: TableProps<Row>) {
  return (
    <table className={['ds-table', className].filter(Boolean).join(' ')} {...props}>
      {caption ? <caption className="ds-table__caption">{caption}</caption> : null}

      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} scope="col" className="ds-table__header-cell">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowKey(row, rowIndex)}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex} className="ds-table__cell">
                {column.cell(row, rowIndex)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

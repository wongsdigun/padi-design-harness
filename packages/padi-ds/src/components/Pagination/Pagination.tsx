'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../Select';

type PageItem = number | 'gap';

/**
 * Figma draws three windows: 1..5 as-is, `1 … 15` at 6/15, and `1 … 5 6 7 … 15`
 * mid-range — so neighbours only appear when the page is at least 3 from either
 * end.
 */
function pageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const visible = new Set<number>([1, pageCount, page]);
  if (page > 2 && page < pageCount - 1) {
    visible.add(page - 1);
    visible.add(page + 1);
  }

  const items: PageItem[] = [];
  let previous = 0;
  for (const number of [...visible].sort((a, b) => a - b)) {
    if (previous && number - previous > 1) {
      items.push('gap');
    }
    items.push(number);
    previous = number;
  }
  return items;
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onPageChange'> {
  /** Current page, 1-based. */
  page: number;

  pageCount: number;

  /** Drives Figma's "dari {total} Data". */
  total?: number;

  /** Noun after the total. @default 'Data' */
  totalLabel?: string;

  /** Current page size, shown in the size select. */
  pageSize?: number;

  /** @default [10, 20, 50, 100] */
  pageSizeOptions?: number[];

  /** Renders the page-size select. Omit to hide it. */
  onPageSizeChange?: (size: number) => void;

  onPageChange: (page: number) => void;

  /** @default 'Sebelumnya' */
  previousLabel?: string;

  /** @default 'Berikutnya' */
  nextLabel?: string;
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

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100];

/** Figma `pagination`: a page-size select plus prev / numbers / next. */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      pageCount,
      total,
      totalLabel = 'Data',
      pageSize,
      pageSizeOptions = DEFAULT_PAGE_SIZES,
      onPageSizeChange,
      onPageChange,
      previousLabel = 'Sebelumnya',
      nextLabel = 'Berikutnya',
      className = '',
      ...props
    },
    ref
  ) {
    const sizeItems = React.useMemo(
      () => pageSizeOptions.map((value) => ({ value, label: String(value) })),
      [pageSizeOptions]
    );

    return (
      <nav
        ref={ref}
        className={['ds-pagination', className].filter(Boolean).join(' ')}
        aria-label="Navigasi halaman"
        {...props}
      >
        <div className="ds-pagination__data-count">
          {onPageSizeChange ? (
            <Select
              items={sizeItems}
              value={sizeItems.find((item) => item.value === pageSize) ?? null}
              onValueChange={(value) => {
                const selected = value as { value: number } | null;
                if (selected) {
                  onPageSizeChange(selected.value);
                }
              }}
            >
              <SelectTrigger className="ds-pagination__size" aria-label="Data per halaman" />
              <SelectContent>
                {(item: { value: number; label: string }) => (
                  <SelectItem key={item.value} value={item} label={item.label} />
                )}
              </SelectContent>
            </Select>
          ) : null}

          <span className="ds-pagination__total">
            dari {total} {totalLabel}
          </span>
        </div>

        <div className="ds-pagination__pages">
          <button
            type="button"
            className="ds-pagination__arrow"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label={previousLabel}
          >
            <Chevron direction="left" />
          </button>

          {pageItems(page, pageCount).map((item, index) =>
            item === 'gap' ? (
              <span key={`gap-${index}`} className="ds-pagination__ellipsis" aria-hidden="true">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className="ds-pagination__page"
                data-current={item === page ? '' : undefined}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            className="ds-pagination__arrow"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            aria-label={nextLabel}
          >
            <Chevron direction="right" />
          </button>
        </div>
      </nav>
    );
  }
);

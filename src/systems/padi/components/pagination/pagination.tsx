import { Pagination as PadiPagination } from '@frontend-shared/padi-ds';
import type { PaginationProps } from '@frontend-shared/padi-ds';

export function Pagination(props: PaginationProps) {
  return <PadiPagination data-padi-ds="Pagination" {...props} />;
}

export type { PaginationProps };

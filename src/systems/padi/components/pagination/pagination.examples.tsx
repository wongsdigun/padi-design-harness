import { useState } from 'react';
import { Pagination } from './pagination';

export function Interactive() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={10}
      onPageChange={setPage}
    />
  );
}

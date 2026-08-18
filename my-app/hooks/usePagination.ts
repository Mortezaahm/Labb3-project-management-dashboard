"use client";

import { useCallback, useMemo, useState } from "react";

export function usePagination<T>(
  items: T[],
  pageSize: number = 6
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(items.length / pageSize)
  );

  const pagedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return items.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [items, currentPage, pageSize]);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(
        Math.min(
          Math.max(page, 1),
          totalPages
        )
      );
    },
    [totalPages]
  );

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    pagedItems,
    goToPage,
    resetPage,
  };
}

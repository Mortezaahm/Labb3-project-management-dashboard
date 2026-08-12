type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Projects pagination"
      className="mt-6 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-40 dark:border-gray-600"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-40 dark:border-gray-600"
      >
        Next
      </button>
    </nav>
  );
}

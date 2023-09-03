import React from "react";

interface PagerProps {
  currentPage: number;
  total_pages: number;
  onNext: () => void;
  onPrevious: () => void;
  jumpToPage: (page: number) => void;
  isDisabled: boolean;
  numPagesToShow?: number;
}

const Pager: React.FC<PagerProps> = ({
  currentPage,
  total_pages,
  onNext,
  onPrevious,
  jumpToPage,
  isDisabled,
  numPagesToShow = 10, // Default to 10 if not provided
}) => {
  const halfRange = Math.floor(numPagesToShow / 2);

  let startPage = Math.max(currentPage - halfRange, 1);
  let endPage = Math.min(startPage + numPagesToShow - 1, total_pages);

  if (endPage - startPage + 1 < numPagesToShow) {
    startPage = Math.max(endPage - numPagesToShow + 1, 1);
  }

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center mt-4 space-x-1">
      {/* First button */}
      <button
        onClick={() => jumpToPage(1)}
        disabled={isDisabled || currentPage === 1}
      >
        First
      </button>
      {/* Previous button */}
      <button onClick={onPrevious} disabled={isDisabled || currentPage <= 1}>
        Previous
      </button>

      {/* Page number buttons */}
      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => {
            if (page !== currentPage) jumpToPage(page);
          }}
          disabled={isDisabled || page === currentPage}
          className={`px-2 py-1 rounded ${
            page === currentPage
              ? "bg-blue-500 text-white cursor-default"
              : "text-blue-500 hover:bg-blue-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={isDisabled || currentPage >= total_pages}
      >
        Next
      </button>
      {/* Last button */}
      <button
        onClick={() => jumpToPage(total_pages)}
        disabled={isDisabled || currentPage === total_pages}
      >
        Last
      </button>
    </div>
  );
};

export default Pager;

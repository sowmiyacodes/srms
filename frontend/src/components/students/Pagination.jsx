import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Pagination({
  page,
  pageSize,
  totalPages,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}) {
  const currentPage = Number(page) || 1;
  const pages = Number(totalPages) || 1;
  const records = Number(totalRecords) || 0;
  const size = Number(pageSize) || 10;

  const fromRecord =
    records === 0 ? 0 : (currentPage - 1) * size + 1;

  const toRecord = Math.min(currentPage * size, records);

  const pageSizeOptions = [10, 20, 50, 100];

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (pages <= 7) {
      for (let i = 1; i <= pages; i += 1) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    }

    pageNumbers.push(1);

    if (currentPage > 4) {
      pageNumbers.push("left-ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(pages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i += 1) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < pages - 3) {
      pageNumbers.push("right-ellipsis");
    }

    if (!pageNumbers.includes(pages)) {
      pageNumbers.push(pages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const goToPage = (targetPage) => {
    if (
      targetPage < 1 ||
      targetPage > pages ||
      targetPage === currentPage
    ) {
      return;
    }

    onPageChange(targetPage);
  };

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Records Information */}
      <div className="text-xs font-medium text-slate-500">
        Showing{" "}
        <span className="font-bold text-slate-800">
          {fromRecord}
        </span>{" "}
        to{" "}
        <span className="font-bold text-slate-800">
          {toRecord}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-800">
          {records}
        </span>{" "}
        records
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        {/* Rows Per Page */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>Rows per page:</span>

          <select
            value={size}
            onChange={(event) =>
              onPageSizeChange(Number(event.target.value))
            }
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          {/* First Page */}
          <button
            type="button"
            onClick={() => goToPage(1)}
            disabled={currentPage <= 1}
            title="First Page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-600"
          >
            <ChevronsLeft size={15} />
          </button>

          {/* Previous Page */}
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            title="Previous Page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-600"
          >
            <ChevronLeft size={15} />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((pageNumber, index) => {
            if (
              pageNumber === "left-ellipsis" ||
              pageNumber === "right-ellipsis"
            ) {
              return (
                <span
                  key={`${pageNumber}-${index}`}
                  className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-slate-400"
                >
                  ...
                </span>
              );
            }

            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => goToPage(pageNumber)}
                className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "border border-transparent text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Page */}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pages}
            title="Next Page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-600"
          >
            <ChevronRight size={15} />
          </button>

          {/* Last Page */}
          <button
            type="button"
            onClick={() => goToPage(pages)}
            disabled={currentPage >= pages}
            title="Last Page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-600"
          >
            <ChevronsRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
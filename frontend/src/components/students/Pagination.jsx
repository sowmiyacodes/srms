import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  page,
  pageSize,
  totalPages,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}) {
  const fromRecord = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const toRecord = Math.min(page * pageSize, totalRecords);

  const pageSizeOptions = [10, 20, 50, 100];

  return (
    <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Records Info */}
      <div className="text-xs text-slate-500 font-semibold">
        Showing <span className="text-slate-800 font-bold">{fromRecord}</span> to{' '}
        <span className="text-slate-800 font-bold">{toRecord}</span> of{' '}
        <span className="text-slate-800 font-bold">{totalRecords}</span> records
      </div>

      <div className="flex items-center gap-6 font-semibold">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500/20"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={`p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer ${
              page <= 1 ? 'opacity-40 cursor-not-allowed hover:bg-white' : ''
            }`}
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <span className="text-xs text-slate-700 font-bold px-2">
            Page {page} of {totalPages || 1}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={`p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer ${
              page >= totalPages ? 'opacity-40 cursor-not-allowed hover:bg-white' : ''
            }`}
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

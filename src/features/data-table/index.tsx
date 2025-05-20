// src/shared/ui/DataTable.tsx
import type { DataResponse } from "@/pages/tablepage/model/types";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export interface DataTableProps<T, F> {
  columns: ColumnDef<T, any>[];
  filters: F;
  fetchQuery: (
    filters: F,
    pagination: { pageNumber: number; pageSize: number }
  ) => UseQueryResult<DataResponse<T>, Error>;
  initialPageSize?: number;
}

export function DataTable<T, F>({
  columns,
  filters,
  fetchQuery,
  initialPageSize = 10,
}: DataTableProps<T, F>) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setPageNumber(1);
  }, [filters]);

  const { data, isLoading, isFetching, error } = fetchQuery(filters, {
    pageNumber,
    pageSize,
  });

  const rows = useMemo(() => data?.content ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5; // تعداد صفحات قابل نمایش
    let start = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <>
      <>
        <table className="min-w-full divide-y divide-gray-200 overflow-auto   rounded-lg shadow-md ">
          <thead className="  bg-[var(--primary)]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 ">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 text-center">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4">
                  در حال بارگذاری...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4">
                  خطا
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex flex-col sm:flex-row items-center  justify-center  gap-4 mt-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageNumber(1)}
              disabled={pageNumber === 1 || isFetching}
              className=" disabled:opacity-50"
            >
              <ChevronsRight />
            </button>
            <button
              onClick={() => setPageNumber((n) => Math.max(1, n - 1))}
              disabled={pageNumber === 1 || isFetching}
              className=" disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {getPageRange().map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                disabled={isFetching}
                className={`px-3 py-1 rounded ${
                  pageNumber === page
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            {totalPages > getPageRange()[getPageRange().length - 1] && (
              <span className="px-2">...</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageNumber((n) => Math.min(totalPages, n + 1))}
              disabled={pageNumber >= totalPages || isFetching}
              className=" disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setPageNumber(totalPages)}
              disabled={pageNumber === totalPages || isFetching}
              className=" disabled:opacity-50"
            >
              <ChevronsLeft />
            </button>
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
            className="border rounded p-1"
          >
            {[10, 20, 50].map((sz) => (
              <option key={sz} value={sz}>
                {sz} آیتم
              </option>
            ))}
          </select>
        </div>
      </>
    </>
  );
}

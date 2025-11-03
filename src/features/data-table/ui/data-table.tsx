
import type { DataResponse } from "@/pages/tablepage/model/types";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
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
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  onDataChange?: (data: T[]) => void; // ✅ اضافه شد
}

export function DataTable<T, F>({
  columns,
  filters,
  fetchQuery,
  initialPageSize = 10,
  enableRowSelection,
  onRowSelectionChange,
  onDataChange, // ✅ اضافه شد
}: DataTableProps<T, F>) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    setPageNumber(1);
  }, [filters]);

  const { data, isLoading, isFetching, error } = fetchQuery(filters, {
    pageNumber,
    pageSize,
  });

  const rows = useMemo(() => data?.content ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;


  useEffect(() => {
    if (onDataChange && rows.length > 0) {
      onDataChange(rows);
    }
  }, [rows])

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: enableRowSelection,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
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

  useEffect(() => {
    if (enableRowSelection && onRowSelectionChange) {
      const selected = table
        .getSelectedRowModel()
        .flatRows.map((row) => row.original);
      onRowSelectionChange(selected);
    }
  }, [rowSelection, enableRowSelection, onRowSelectionChange, table]);

  return (
    <>
      <div className="overflow-x-auto w-full">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[var(--table-header)]">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center justify-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-3 py-4 text-sm text-center"
                    >
                      در حال بارگذاری...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-3 py-4 text-sm text-center text-red-500"
                    >
                      خطا در دریافت داده‌ها
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-3 py-4 text-sm text-center"
                    >
                      داده‌ای یافت نشد
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap text-center"
                        >
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
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            نمایش {(pageNumber - 1) * pageSize + 1} تا{" "}
            {Math.min(pageNumber * pageSize, data?.totalElements || 0)} از{" "}
            {data?.totalElements || 0} نتیجه
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPageNumber(1)}
              disabled={pageNumber === 1 || isFetching}
              className="p-1 rounded-md border disabled:opacity-50"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPageNumber((n) => Math.max(1, n - 1))}
              disabled={pageNumber === 1 || isFetching}
              className="p-1 rounded-md border disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {getPageRange().map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                disabled={isFetching}
                className={`px-2 py-1 text-xs sm:text-sm rounded ${
                  pageNumber === page
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
            {totalPages > getPageRange()[getPageRange().length - 1] && (
              <span className="px-1">...</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPageNumber((n) => Math.min(totalPages, n + 1))}
              disabled={pageNumber >= totalPages || isFetching}
              className="p-1 rounded-md border disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPageNumber(totalPages)}
              disabled={pageNumber === totalPages || isFetching}
              className="p-1 rounded-md border disabled:opacity-50"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNumber(1);
          }}
          className="border rounded p-1 text-sm"
        >
          {[10, 20, 50].map((sz) => (
            <option key={sz} value={sz}>
              {sz} آیتم
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

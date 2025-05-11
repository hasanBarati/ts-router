// src/shared/ui/DataTable.tsx
import type { DataResponse } from "@/pages/tablepage/model/types";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
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
  // 1. همۀ هوک‌ها بدون شرط
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setPageNumber(1);
  }, [filters]);

  // اینجا useQuery (داخل fetchQuery) هم یک hook است
  const { data, isLoading, isFetching, error } = fetchQuery(filters, {
    pageNumber,
    pageSize,
  });

  // useMemo هم hook نیست اما useReactTable زیر تعداد ثابت هوک‌ها را حفظ می‌کند
  const rows = useMemo(() => data?.content ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;

  // این هم یک hook است: همیشه صدا زده شود
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 2. تنها یکبار return داریم و داخلش شرطی رندر می‌کنیم
  return (
    <>
      {isLoading ? (
        <div>در حال بارگذاری...</div>
      ) : error ? (
        <div>خطا: {error.message}</div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="px-6 py-3 text-left">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setPageNumber((n) => Math.max(1, n - 1))}
              disabled={pageNumber === 1 || isFetching}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              قبلی
            </button>

            <span>
              صفحه {pageNumber} از {totalPages}
            </span>

            <button
              onClick={() => setPageNumber((n) => Math.min(totalPages, n + 1))}
              disabled={pageNumber >= totalPages || isFetching}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              بعدی
            </button>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded p-2"
            >
              {[10, 20, 50].map((sz) => (
                <option key={sz} value={sz}>
                  {sz} آیتم
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
}

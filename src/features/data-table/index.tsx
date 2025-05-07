// src/shared/ui/data-table.tsx
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { usePaginationStore } from "./model/usePaginationStore";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  filters: any;
  fetchData: (
    filters: any,
    pagination: { pageNumber: number; pageSize: number }
  ) => {
    data: T[];
    totalElements: number;
    totalPages: number;
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;
  };
  initialPageSize?: number;
}

export function DataTable<T>({
  columns,
  filters,
  fetchData,
  initialPageSize = 10,
}: DataTableProps<T>) {
  const { pageNumber, pageSize, setPage, setPageSize, reset } =
    usePaginationStore();


  useEffect(() => {
    setPageSize(initialPageSize);

  }, []);


  useEffect(() => {
    reset();
  }, [filters, reset]);


  const { data, totalElements, totalPages, isLoading, isFetching, error } =
    fetchData(filters, { pageNumber, pageSize });

 
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error.message}</div>;

  return (
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
          onClick={() => setPage(pageNumber - 1)}
          disabled={pageNumber === 1 || isFetching}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          قبلی
        </button>

        <span>
          صفحه {pageNumber} از {totalPages}
        </span>

        <button
          onClick={() => setPage(pageNumber + 1)}
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
  );
}

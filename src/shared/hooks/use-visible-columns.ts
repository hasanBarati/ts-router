
import type { ColumnDef } from "@tanstack/react-table";
import type { TableColumn } from "@/features/filter-customization/model/type";

export function useVisibleColumns<T>(
  customizedColumns: TableColumn[],
  defaultColumns: TableColumn[],
  allColumns: ColumnDef<T>[]
): ColumnDef<T>[] {
  // 1. تعیین ستون‌های فعال (customized یا default)
  const activeColumns = customizedColumns.length > 0
    ? customizedColumns
    : defaultColumns;

  // 2. فیلتر کردن و مرتب‌سازی
  const orderedActiveColumns = activeColumns
    .filter(col => col.isVisible)
    .sort((a, b) => a.order - b.order);

  // 3. Map کردن ستون‌های ساده به تعاریف کامل ColumnDef
  const result = orderedActiveColumns.map(col => {
    const foundColumn = allColumns.find(c => {
      // منطق پیدا کردن ستون (بر اساس id یا accessorKey)
      if (c.id) {
        return c.id === col.id;
      }
      if ('accessorKey' in c) {
        return c.accessorKey === col.id;
      }
      return false;
    });

    if (!foundColumn) {
      console.warn(`⚠️ Column not found for id: ${col.id}`);
    }

    return foundColumn;
  }).filter(Boolean); // حذف null/undefinedها

  return result as ColumnDef<T>[];
}

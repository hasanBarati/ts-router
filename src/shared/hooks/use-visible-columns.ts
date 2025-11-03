

import type { ColumnDef } from "@tanstack/react-table";
import type { TableColumn } from "@/features/filter-customization/model/type";

export function useVisibleColumns<T>(
  customizedColumns: TableColumn[],
  defaultColumns: TableColumn[],
  allColumns: ColumnDef<T>[]
): ColumnDef<T>[] {



  const activeColumns = customizedColumns.length > 0
    ? customizedColumns
    : defaultColumns;


  const orderedActiveColumns = activeColumns
    .filter(col => col.isVisible)
    .sort((a, b) => a.order - b.order);


  const result = orderedActiveColumns.map(col => {
    const foundColumn = allColumns.find(c => {
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
  }).filter(Boolean); 

  return result as ColumnDef<T>[];
}

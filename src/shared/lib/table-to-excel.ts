// src/shared/lib/table-to-excel.ts

import type { ColumnDef } from "@tanstack/react-table";

export function convertColumnsToExcelMapper<T>(
  columns: ColumnDef<T>[]
): (item: T) => Record<string, any> {
  return (item: T) => {
    const row: Record<string, any> = {};

    columns
      .filter(col => col.id !== 'select' && col.id !== 'actions')
      .forEach(column => {
        const header = typeof column.header === 'string' ? column.header : column.id || '';
        
        if ('accessorKey' in column && column.accessorKey) {
          const value = (item as any)[column.accessorKey];
          
          // اگه cell function داشت، ازش استفاده کن
          if (column.cell && typeof column.cell === 'function') {
            // شبیه‌سازی cell context
            const cellValue = column.cell({
              row: { original: item },
              getValue: () => value,
            } as any);
            
            row[header] = cellValue;
          } else {
            row[header] = value;
          }
        }
      });

    return row;
  };
}

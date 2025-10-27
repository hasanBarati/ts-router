// src/shared/lib/export-excel.ts

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { ColumnDef } from "@tanstack/react-table";

/**
 * خروجی اکسل ساده
 */
export async function exportToExcel<T>(
  columns: ColumnDef<T>[],
  data: T[],
  options: {
    title?: string;
    fileName?: string;
  } = {}
) {
  const { title = 'گزارش', fileName = 'export' } = options;

  // ✅ فیلتر ستون‌های قابل اکسپورت
  const exportColumns = columns.filter(
    col => col.id !== 'select' && col.id !== 'actions'
  );

  // ✅ استخراج headers
  const headers = exportColumns.map(col => 
    typeof col.header === 'string' ? col.header : col.id || ''
  );

  // ✅ تبدیل داده‌ها
  const rows = data.map(item => {
    return exportColumns.map(column => {
      // اگه cell function داره
      if (column.cell && typeof column.cell === 'function') {
        const cellValue = column.cell({
          row: { original: item },
          getValue: () => {
            if ('accessorKey' in column && column.accessorKey) {
              const keys = String(column.accessorKey).split('.');
              return keys.reduce((obj, key) => obj?.[key], item as any);
            }
            return null;
          },
        } as any);
        
        // اگه object بود (مثل productGroup.text)
        if (typeof cellValue === 'object' && cellValue !== null) {
          return '';
        }
        return cellValue;
      }
      
      // اگه accessorKey داره
      if ('accessorKey' in column && column.accessorKey) {
        const keys = String(column.accessorKey).split('.');
        const value = keys.reduce((obj, key) => obj?.[key], item as any);
        
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return value.text || value.name || '';
        return value;
      }
      
      return '';
    });
  });

  // ✅ ایجاد فایل اکسل
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1', {
    views: [{ rightToLeft: true }],
  });

  // عنوان
  if (title) {
    worksheet.mergeCells(1, 1, 1, headers.length);
    const titleCell = worksheet.getCell(1, 1);
    titleCell.value = title;
    titleCell.font = { size: 14, bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };
    worksheet.getRow(1).height = 30;
  }

  // هدر
  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.height = 25;

  // داده‌ها
  rows.forEach(row => {
    const dataRow = worksheet.addRow(row);
    dataRow.eachCell(cell => {
      cell.alignment = { horizontal: 'right', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // عرض ستون‌ها
  worksheet.columns.forEach((column, index) => {
    let maxLength = headers[index].length;
    rows.forEach(row => {
      const cellLength = String(row[index] || '').length;
      if (cellLength > maxLength) maxLength = cellLength;
    });
    column.width = Math.min(Math.max(maxLength + 2, 10), 50);
  });

  // فریز هدر
  worksheet.views = [{
    rightToLeft: true,
    state: 'frozen',
    ySplit: title ? 2 : 1,
  }];

  // دانلود
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  
  const date = new Date().toLocaleDateString('fa-IR').replace(/\//g, '-');
  saveAs(blob, `${fileName}-${date}.xlsx`);
}

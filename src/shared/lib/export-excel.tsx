// src/shared/lib/export-excel.ts

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { ColumnDef } from "@tanstack/react-table";

export async function exportToExcel<T>(
  columns: ColumnDef<T>[],
  data: T[],
  options: {
    title?: string;
    fileName?: string;
  } = {}
) {
  const { title = 'گزارش', fileName = 'export' } = options;


  const exportColumns = columns.filter(
    col => col.id !== 'select' && col.id !== 'actions'
  );


  const headers = exportColumns.map(col => 
    typeof col.header === 'string' ? col.header : col.id || ''
  );

 
  const rows = data.map(item => {
    return exportColumns.map(column => {
 
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
        
        if (typeof cellValue === 'object' && cellValue !== null) {
          return '';
        }
        return cellValue;
      }
      

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


  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1', {
    views: [{ rightToLeft: true }],
  });


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


  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.height = 25;


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


  worksheet.columns.forEach((column, index) => {
    let maxLength = headers[index].length;
    rows.forEach(row => {
      const cellLength = String(row[index] || '').length;
      if (cellLength > maxLength) maxLength = cellLength;
    });
    column.width = Math.min(Math.max(maxLength + 2, 10), 50);
  });


  worksheet.views = [{
    rightToLeft: true,
    state: 'frozen',
    ySplit: title ? 2 : 1,
  }];


  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  
  const date = new Date().toLocaleDateString('fa-IR').replace(/\//g, '-');
  saveAs(blob, `${fileName}-${date}.xlsx`);
}

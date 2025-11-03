// filter-customization/model/type.ts

import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";
import type { ColumnDef } from "@tanstack/react-table";

// ✅ اضافه کردن constraint به T
export interface CustomizableField<
  T extends Record<string, any> = Record<string, any>
> {
  id: string;
  name: keyof T;
  header?: string;
  label?: string;
  order: number;
  isVisible: boolean;
  isInAdvanced: boolean;
  fieldConfig: FieldConfig<T>;
}

// export interface TableColumn<> {
//   id?: string;
//   header?: string ;
//   label?: string;
//   isVisible?: boolean;
//   order: number;
// }

export type TableColumn<T extends Record<string, any> = Record<string, any>> =
  ColumnDef<T> & {
    id?: string;
    header?: string;
    label?: string;
    isVisible?: boolean;
    order: number; // ✅ optional کردن
  };

// ✅ تنظیمات هر جدول
export interface TableCustomization<
  T extends Record<string, any> = Record<string, any>
> {
  fields: CustomizableField<T>[];
  columns: TableColumn[];
}

// ✅ State اصلی Store
export interface FilterCustomizationState {
  tables: Record<string, TableCustomization<any>>;
  // فیلدها
  initializeFromApi: (
    tableKey: string,
    apiData: string | null | undefined,
    defaultFields: CustomizableField<any>[],
    defaultColumns: TableColumn[]
  ) => void;

  updateFieldOrder: (
    tableKey: string,
    fields: CustomizableField<any>[]
  ) => void;

  toggleFieldLocation: (tableKey: string, fieldId: string) => void;

  getTableFields: <T extends Record<string, any>>(
    tableKey: string
  ) => CustomizableField<T>[];

  // ستون‌ها
  updateColumnOrder: (tableKey: string, columns: TableColumn[]) => void;

  toggleColumnVisibility: (tableKey: string, columnId: string) => void;

  getTableColumns: (tableKey: string) => TableColumn[];

  // بازنشانی
  resetTableToDefault: (
    tableKey: string,
    defaultFields: CustomizableField<any>[],
    defaultColumns: TableColumn[]
  ) => void;
}
export interface CustomizationApiResponse {
  customize: string;
}

export interface CustomizationApiRequest {
  customize: string;
  userId: number;
}

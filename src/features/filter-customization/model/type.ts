// filter-customization/model/type.ts

import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";


// ✅ اضافه کردن constraint به T
export interface CustomizableField<T extends Record<string, any> = Record<string, any>> {
  id: string;
  name: keyof T;
  header?: string;
  label?: string;
  order: number;
  isVisible: boolean;
  isInAdvanced: boolean;
  fieldConfig: FieldConfig<T>;
}


export interface TableColumn<T = any> {
  id?: string;
  header?: string | ((props: any) => any);
  label?: string;
  isVisible?: boolean;
  order?: number;
}

// ✅ تنظیمات هر جدول
export interface TableCustomization<T extends Record<string, any> = Record<string, any>> {
  fields: CustomizableField<T>[];
  columns: TableColumn<T>[];
}

// ✅ State اصلی Store
export interface FilterCustomizationState {
  tables: Record<string, TableCustomization>;

  // فیلدها
  initializeFromApi: (
    tableKey: string,
    apiData: string | null | undefined,
    defaultFields: CustomizableField<any>[],
    defaultColumns: TableColumn<any>[]
  ) => void;

  updateFieldOrder: (
    tableKey: string,
    fields: CustomizableField<any>[]
  ) => void;

  toggleFieldLocation: (
    tableKey: string,
    fieldId: string
  ) => void;

  getTableFields: <T extends Record<string, any>>(
    tableKey: string
  ) => CustomizableField<T>[];

  // ستون‌ها
  updateColumnOrder: (
    tableKey: string,
    columns: TableColumn<any>[]
  ) => void;

  toggleColumnVisibility: (
    tableKey: string,
    columnId: string
  ) => void;

  getTableColumns: <T = any>(tableKey: string) => TableColumn<T>[];

  // بازنشانی
  resetTableToDefault: (
    tableKey: string,
    defaultFields: CustomizableField<any>[],
    defaultColumns: TableColumn<any>[]
  ) => void;
}
export interface CustomizationApiResponse {
  customize: string;
}

export interface CustomizationApiRequest {
  customize: string;
  userId: number;
}

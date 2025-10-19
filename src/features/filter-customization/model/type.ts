import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";


// ✅ تایپ برای فیلدهای قابل شخصی‌سازی
export interface CustomizableField<T = any> {
  id: string;
  name: keyof T;
  header: string;
  label:string
  order: number;
  isVisible: boolean;
  isInAdvanced: boolean;
  fieldConfig: FieldConfig<T>;
}

// ✅ تایپ برای ستون‌های جدول
export interface TableColumn {
  id: string;
  header: string;
  isVisible: boolean;
  order: number;
}

// ✅ تنظیمات هر جدول
export interface TableCustomization<T = any> {
  fields: CustomizableField<T>[];
  columns: TableColumn[];
}

// ✅ State اصلی Store
export interface FilterCustomizationState {
  tables: Record<string, TableCustomization>;
  
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
  
  toggleFieldLocation: (
    tableKey: string,
    fieldId: string
  ) => void;
  
  getTableFields: <T>(tableKey: string) => CustomizableField<T>[];
  
  // ستون‌ها
  updateColumnOrder: (
    tableKey: string,
    columns: TableColumn[]
  ) => void;
  
  toggleColumnVisibility: (
    tableKey: string,
    columnId: string
  ) => void;
  
  getTableColumns: (tableKey: string) => TableColumn[];
  
  // بازنشانی
  resetTableToDefault: (
    tableKey: string,
    defaultFields: CustomizableField<any>[],
    defaultColumns: TableColumn[]
  ) => void;
}

// ✅ تایپ برای پاسخ API
export interface CustomizationApiResponse {
 payload:{
    customize: string; 
 }  
}

// ✅ تایپ برای ارسال به API
export interface CustomizationApiRequest {
  customize: string; // JSON string
  userId:number
}

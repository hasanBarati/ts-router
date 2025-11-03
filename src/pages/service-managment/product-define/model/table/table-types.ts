
import type { TableColumn } from "@/features/filter-customization/model/type";
import type { selectResponse } from "@/shared/types/global";
export interface ProductDefineFilters {
  code?: string | null;
  name?: string | null;
  productGroup?: selectResponse | null;
  isActive?: boolean;
}
export interface Product {
  id?: number;
  code: string;
  name: string;
  description: string;
  productGroup: selectResponse;
  attribute: [];
  isActive: boolean;
}

export interface FilterTableProps {
  defaultColumns: TableColumn[];
  onSubmit: (data: ProductDefineFilters) => void;
}

export interface TableProductActionsProps {
  onCreateNormal: () => void;
  onExportExcel: () => void;
  isActive: boolean;
  onActiveChange: (value: boolean) => void;
  tableData?: Product[];
}


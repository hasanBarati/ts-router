import { CustomizableFilterBar } from "@/features/filter-customization";
import React from "react";
import { defaultFields } from "../../model/table/table-filter-config";
import type { FilterTableProps, ProductDefineFilters } from "../../model/table/table-types";



export const FilterTable: React.FC<FilterTableProps> = ({
  defaultColumns,
  onSubmit,
}) => {
  return (
    <CustomizableFilterBar<ProductDefineFilters>
      tableKey="product-define-table"
      tableName="تعریف محصول"
      defaultFields={defaultFields}
      defaultColumns={defaultColumns}
      onSubmit={onSubmit}
    />
  );
};

import { CustomizableFilterBar } from "@/features/filter-customization";
import type {
  CustomizableField,
  TableColumn,
} from "@/features/filter-customization/model/type";
import React from "react";
import type { ProductDefineFilters } from "../../model/table/table-types";


const defaultFields: CustomizableField<ProductDefineFilters>[] = [
  {
    id: "p-1",
    name: "code",
    label: "کد",
    isVisible: true,
    isInAdvanced: false,
    order: 1,
    fieldConfig: {
      name: "code",
      label: "کد",
      type: "input",
      inputProps: {
        placeholder: "جستجوی شماره کیسه...",
      },
    },
  },
  {
    id: "p-2",
    name: "name",
    label: "عنوان",
    isVisible: true,
    isInAdvanced: false,
    order: 2,
    fieldConfig: {
      name: "name",
      label: "عنوان",
      type: "input",
      inputProps: {
        placeholder: "جستجوی شماره کیسه...",
      },
    },
  },
  {
    id: "p-3",
    name: "productGroup",
    label: "گروه بندی محصول",
    isVisible: true,
    isInAdvanced: false,
    order: 2,
    fieldConfig: {
      name: "productGroup",
      label: "گروه بندی محصول",
      type: "async-select",
      asyncSelectProps: {
        url: "core-api/productGroup/select",
        queryKey: ["selectBagTypes"],
        wrapperClassName: "filterInput",
      },
    },
  },
];

interface FilterTableProps {
  defaultColumns: TableColumn[];
  onSubmit: (data: ProductDefineFilters) => void;
}

export const FilterTable: React.FC<FilterTableProps> = ({
  defaultColumns,
  onSubmit,
}) => {
  return (
    <CustomizableFilterBar<ProductDefineFilters>
      tableKey="bag-table"
      tableName="کیسه‌ها"
      defaultFields={defaultFields}
      defaultColumns={defaultColumns}
      onSubmit={onSubmit}
    />
  );
};

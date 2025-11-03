import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";
import { CustomizableFilterBar } from "@/features/filter-customization";
import type { CustomizableField, TableColumn } from "@/features/filter-customization/model/type";
import React from "react";
import type { BagFilters } from "../model/types";


const defaultFields: CustomizableField<BagFilters>[] = [
  {

    id: "bag-1",
    name: "bagNumber",
    label: "شماره کیسه",
    isVisible: true,
    isInAdvanced: false,
    order: 1,
    fieldConfig: {
      name: "bagNumber",
      label: "شماره کیسه",
      type: "input",
      inputProps: {
        placeholder: "جستجوی شماره کیسه...",
  
      },
    },
  },
  {
    id: "bag-2",
    name: "bagType",
    label: "نوع کیسه",
    isVisible: true,
    isInAdvanced: false,
    order: 2,
    fieldConfig: {
      name: "bagType",
      label: "نوع کیسه",
      type: "async-select",
      asyncSelectProps: {
        url: "/core-api/bag/selectBagTypes",
        queryKey: ["selectBagTypes"],
        wrapperClassName: "filterInput",
      },
    } as FieldConfig<BagFilters>,
  },


  
];



interface FilterTableProps {
  defaultColumns: TableColumn[];
  onSubmit: (data: BagFilters) => void;
}

export const FilterTable: React.FC<FilterTableProps> = ({ defaultColumns,onSubmit }) => {

  return (
    <CustomizableFilterBar<BagFilters>
      tableKey="bag-table"
      tableName="کیسه‌ها"
      defaultFields={defaultFields}
      defaultColumns={defaultColumns}
      onSubmit={onSubmit}
    />
  );
};

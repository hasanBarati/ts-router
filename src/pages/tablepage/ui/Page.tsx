// TablePage.tsx
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FilterTable } from "./filter";
import { DataTable } from "@/features/data-table";
import { useOrderFilter } from "../model/usegetTableData";

import { FilterChips } from "@/features/chip";
import { FormAction } from "./form-action";
import type { Bag, BagFilters } from "../model/types";
import { columns } from "./coulmns";

export const TablePage: React.FC = () => {
  const methods = useForm<BagFilters>({
    defaultValues: {
      selectsourceHub: null,
      selectdestinationHub: null,
      isActive: true,
      bagNumber: null,
    },
  });
  const [appliedFilters, setAppliedFilters] = useState<BagFilters>(
    methods.getValues()
  );

  const onSubmit = (data: BagFilters) => {
    setAppliedFilters(data);
  };

  return (
    <>
      <h1 className="text-2xl mb-4">جدول سفارشات</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FilterTable />
          <FilterChips appliedFilters={appliedFilters} onApply={onSubmit} />
        </form>
      </FormProvider>
      <DataTable<Bag, BagFilters>
        columns={columns}
        filters={appliedFilters}
        fetchQuery={useOrderFilter}
        initialPageSize={10}
      />
      <FormAction />
    </>
  );
};

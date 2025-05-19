// TablePage.tsx
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { Order, OrderFilters } from "../model/types";
import { FilterTable } from "./filter";
import { DataTable } from "@/features/data-table";
import { useOrderFilter } from "../model/usegetTableData";
import { columns } from "./coulmns";
import { FilterChips } from "@/features/chip"; 

export const TablePage: React.FC = () => {
  const methods = useForm<OrderFilters>({
    defaultValues: {
      selectHub: { id: 2, text: "هاب تهران" },
      selectCustomer: null,
      orderDate: { day: 6, month: 6, year: 1403 },
    },
  });
  const [appliedFilters, setAppliedFilters] = useState<OrderFilters>(
    methods.getValues()
  );

  const onSubmit = (data: OrderFilters) => {
    setAppliedFilters(data);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-4">جدول سفارشات</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FilterTable />
          <FilterChips appliedFilters={appliedFilters} onApply={onSubmit} />
        </form>
      </FormProvider>
      <DataTable<Order, OrderFilters>
        columns={columns}
        filters={appliedFilters}
        fetchQuery={useOrderFilter}
        initialPageSize={10}
      />
    </div>
  );
};

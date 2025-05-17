// TablePage.tsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { Order, OrderFilters } from "../model/types";
import { FilterTable } from "./filter";
import { DataTable } from "@/features/data-table";
import { useOrderFilter } from "../model/usegetTableData";
import { columns } from "./coulmns";
import { FilterChips } from "@/features/chip"; // import { Chips } from "@/features/chip";

export const TablePage: React.FC = () => {
  const methods = useForm<OrderFilters>({
    defaultValues: {
      selectHub: { id: 2, text: "هاب تهران" },
      selectCustomer: null,
      orderDate: { day: 21, month: 2, year: 1404 },
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-4">جدول سفارشات</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <FilterTable />
          {/* <FilterChips<OrderFilters>
            customLabels={{
              selectHub: "هاب انتخابی",
              selectCustomer: "مشتری",
              orderDate: "تاریخ",
            }}
            formatValue={(fieldName, value) => {
              if (fieldName === "orderDate") {
                return `${value.year}/${value.month}/${value.day}`;
              }
              return value?.text || value;
            }}
          /> */}
        </form>
      </FormProvider>
      <DataTable<Order, OrderFilters>
        columns={columns}
        filters={methods.getValues()}
        fetchQuery={useOrderFilter}
        initialPageSize={10}
      />
    </div>
  );
};

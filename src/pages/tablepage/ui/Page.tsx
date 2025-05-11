// src/features/orders/components/TablePage.tsx
import React, { useState } from "react";

import type { Order, OrderFilters } from "../model/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FilterTable } from "./filter";
import { DataTable } from "@/features/data-table";
import { useOrderFilter } from "../model/usegetTableData";
import { columns } from "./coulmns";

export const TablePage: React.FC = () => {
  const { register, handleSubmit, reset, getValues } =
    useForm<OrderFilters>({
      defaultValues: {
        selectHub: {
          id: 2,
        },
        orderDate: {
          day: 21,
          month: 2,
          year: 1404,
        },
      },
    });

  // 2) state فیلترهای اعمال‌شده
  const [appliedFilters, setAppliedFilters] = useState<OrderFilters>({
    selectHub: {
      id: 2,
    },
    orderDate: {
      day: 21,
      month: 2,
      year: 1404,
    },
  });

  // وقتی Submit شد، state رو آپدیت کن
  const onSubmit: SubmitHandler<OrderFilters> = (values) => {
    setAppliedFilters(values);
  };

  console.log("getValuesgetValues", getValues());

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-4">جدول سفارشات</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mb-6"
        autoComplete="off"
      >
        <FilterTable register={register} />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          اعمال فیلتر
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-black rounded"
          onClick={() => {
            reset();
            setAppliedFilters({ selectHub: null, orderDate: null });
          }}
        >
          پاک کردن فیلتر
        </button>
      </form>

      <DataTable<Order, OrderFilters>
        columns={columns}
        filters={appliedFilters}
        fetchQuery={useOrderFilter}
        initialPageSize={10}
      />
    </div>
  );
};

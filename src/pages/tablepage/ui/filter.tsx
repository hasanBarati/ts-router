// src/features/orders/components/FilterTable.tsx
import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { OrderFilters } from "../model/types";
import { Input } from "@/shared/ui/input";

interface FilterTableProps {
  register: UseFormRegister<OrderFilters>;
}

export const FilterTable: React.FC<FilterTableProps> = ({ register }) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block mb-1">هاب</label>
      <Input {...register("selectHub")} placeholder="هاب" />
    </div>
    <div>
      <label className="block mb-1">تاریخ سفارش</label>
      <Input {...register("orderDate")} type="date" />
    </div>
  </div>
);

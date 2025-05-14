// filter.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { OrderFilters } from "../model/types";
import { Input } from "@/shared/ui/input";
import { AsyncSelect } from "@/features/async-select/async-select";

export const FilterTable: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useFormContext<OrderFilters>();

  return (
    <div className="space-y-6 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="selectHub"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              url="/core-api/hub/select"
              queryKey={["hubs"]}
              placeholder="هاب"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="selectCustomer"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              url="/core-api/customers"
              queryKey={["customers"]}
              placeholder="مشتری"
              value={field.value}
              onChange={field.onChange}
              mapResponse={(item) => ({
                id: item.customerId,
                text: item.fullName,
              })}
            />
          )}
        />

        <div>
          <label className="block mb-1">تاریخ سفارش</label>
          <Input {...register("orderDate")} type="date" />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          پاک کردن فیلتر
        </button>
        <button
          type="submit"
   
          // onClick={handleSubmit(()=>{})}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          اعمال فیلتر
        </button>
      </div>
    </div>
  );
};

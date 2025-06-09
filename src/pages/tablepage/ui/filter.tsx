import { AsyncPopoverSelect } from "@/features/async-select/async-select";
import { Input } from "@/shared/ui/input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { BagFilters } from "../model/types";

export const FilterTable: React.FC = () => {
  const { control, register, reset } = useFormContext<BagFilters>();

  return (
    <div className="space-y-6 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Controller
          name="selectsourceHub"
          control={control}
          render={({ field }) => (
            <AsyncPopoverSelect
              url="/core-api/hub/select"
              queryKey={["selectsourceHub"]}
              value={field.value}
              onChange={field.onChange}
              label="هاب مبدا"
            />
          )}
        />
        <Controller
          name="selectdestinationHub"
          control={control}
          render={({ field }) => (
            <AsyncPopoverSelect
              url="/core-api/hub/select"
              queryKey={["selectdestinationHub"]}
              value={field.value}
              onChange={field.onChange}
              label="هاب مقصد"
            />
          )}
        />

        <Input {...register("bagNumber")} label="شماره کیسه" />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          پاک کردن فیلتر
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          اعمال فیلتر
        </button>
      </div>
    </div>
  );
};

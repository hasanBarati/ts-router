import { AsyncPopoverSelect } from "@/features/async-select/async-select";
import { Input } from "@/shared/ui/input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { BagFilters } from "../model/types";
import { SearchButton } from "@/shared/ui/search-button";

export const FilterTable: React.FC = () => {
  const { control, register, reset } = useFormContext<BagFilters>();

  return (
    // <div className="space-y-6 mb-6">
    <div className="searchForm">
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
            wrapperClassName="filterInput"
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
            wrapperClassName="filterInput"
          />
        )}
      />

      <Input
        {...register("bagNumber")}
        label="شماره کیسه"
        wrapperClassName="filterInput"
      />
      <SearchButton />
    </div>
  );
};

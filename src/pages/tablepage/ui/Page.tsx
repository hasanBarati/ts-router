import React, { useState } from "react";
import { DataTable } from "@/features/data-table";
import useOrderFilter from "../model/usegetTableData";
import { columns } from "./coulmns";
import { Button } from "@/shared/ui/button";
import { FilterTable } from "./filter";

export const TablePage: React.FC = () => {
  const [filters, setFilters] = useState();



  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-4">جدول سفارشات</h1>
      {/* <Button
        title="dfdsfsd"
        onClick={() =>
          handleApplyFilters({
            ...filters,
            selectHub: { ...filters.selectHub, label: 'dfdsfsd'},
          })
        }
      >
        filter
      </Button> */}
      {/* <div className="mb-4">
        <input
          className="border p-2 rounded"
          placeholder="جستجو برچسب هاب"
          onChange={(e) =>
            handleApplyFilters({
              ...filters,
              selectHub: { ...filters.selectHub, label: e.target.value },
            })
          }
        />
      </div> */}
      <DataTable
        columns={columns}
        filters={filters}
        fetchData={(f, p) => useOrderFilter(f, p)}
        initialPageSize={10}
      />
      <FilterTable setFilters={setFilters} />
    </div>
  );
};

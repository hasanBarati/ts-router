import React from "react";

import { columns, type Payment } from "./coulmns";
import { DataTable } from "@/shared/ui/data-table";

export const TablePage: React.FC = () => (
  <div>
    <h1 className="text-2xl mb-4">Table page</h1>
    <DataTable data={data} columns={columns}  />
  </div>
);

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/shared/ui/button";
import { Edit, Trash2 } from "lucide-react";

import { Checkbox } from "@/shared/ui/checkbox";
import type { Product } from "./table-types";

interface ColumnsProps {
  onEdit?: (row: Product) => void;
  onDelete?: (row: number) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps = {}): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="انتخاب همه"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="انتخاب سطر"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "code",
    accessorKey: "code",
    header: "کد",
  },
  {
    id: "name",
    accessorKey: "name",
    header: "عنوان",
  },
  {
    id: "productGroup",
    accessorKey: "productGroup",
    header: "گروه بندی محصول",
    cell: ({ row }) => row.original.productGroup.text,
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "فعال" : "غیرفعال"),
  },
  {
    id: "description",
    accessorKey: "description",
    header: "توضیحات",
  },

  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row.original);
              }}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row.original.id!);
              }}
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export const columns = createColumns();

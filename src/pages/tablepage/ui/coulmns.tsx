"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/shared/ui/button";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import type { Bag } from "../model/types";
import { Checkbox } from "@/shared/ui/checkbox";

// ✅ اضافه کردن پراپ‌های callback برای عملیات
interface ColumnsProps {
  onEdit?: (row: Bag) => void;
  onDelete?: (row: number) => void;
}

export const createColumns = ({ onEdit, onDelete }: ColumnsProps = {}): ColumnDef<Bag>[] => [
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
    id: "bagNumber",
    accessorKey: "bagNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          شماره کیسه
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "selectSourceHub",
    accessorKey: "selectSourceHub",
    header: "هاب مبدا",
    cell: ({ row }) => row.original.selectSourceHub?.text,
  },
  {
    id: "selectDestinationHub",
    accessorKey: "selectDestinationHub",
    header: "هاب مقصد",
    cell: ({ row }) => row.original.selectDestinationHub?.text || "-",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => row.original.status.text,
  },
  {
    id: "selectCurrentHub",
    accessorKey: "selectCurrentHub",
    header: "هاب فعلی",
    cell: ({ row }) => row.original.selectCurrentHub?.text || "-",
  },
  {
    id:"weightCapacity",
    accessorKey: "weightCapacity",
    header: "ظرفیت وزن",
    cell: ({ row }) => `${row.original.weightCapacity} کیلوگرم`,
  },
  {
    id:"volumeCapacity",
    accessorKey: "volumeCapacity",
    header: "ظرفیت حجم",
    cell: ({ row }) => `${row.original.volumeCapacity} متر مکعب`,
  },
  {
    id:"allocatedWeight",
    accessorKey: "allocatedWeight",
    header: "وزن تخصیص یافته",
    cell: ({ row }) => `${row.original.allocatedWeight || 0} کیلوگرم`,
  },
  {
    id:"allocatedVolume",
    accessorKey: "allocatedVolume",
    header: "حجم تخصیص یافته",
    cell: ({ row }) => `${row.original.allocatedVolume || 0} متر مکعب`,
  },
  {
    id:"isActive",
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "فعال" : "غیرفعال"),
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

// ✅ برای سازگاری با کد قبلی (اگر جایی استفاده شده)
export const columns = createColumns();



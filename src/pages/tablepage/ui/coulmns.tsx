"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/shared/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { Bag } from "../model/types";

export const columns: ColumnDef<Bag>[] = [
  {
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
    accessorKey: "selectSourceHub",
    header: "هاب مبدا",
    cell: ({ row }) => row.original.selectSourceHub?.text,
  },
  {
    accessorKey: "selectDestinationHub",
    header: "هاب مقصد",
    cell: ({ row }) => row.original.selectDestinationHub?.text || "-",
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => row.original.status.text,
  },
  {
    accessorKey: "selectCurrentHub",
    header: "هاب فعلی",
    cell: ({ row }) => row.original.selectCurrentHub?.text || "-",
  },
  {
    accessorKey: "weightCapacity",
    header: "ظرفیت وزن",
    cell: ({ row }) => `${row.original.weightCapacity} کیلوگرم`,
  },
  {
    accessorKey: "volumeCapacity",
    header: "ظرفیت حجم",
    cell: ({ row }) => `${row.original.volumeCapacity} متر مکعب`,
  },
  {
    accessorKey: "allocatedWeight",
    header: "وزن تخصیص یافته",
    cell: ({ row }) => `${row.original.allocatedWeight || 0} کیلوگرم`,
  },
  {
    accessorKey: "allocatedVolume",
    header: "حجم تخصیص یافته",
    cell: ({ row }) => `${row.original.allocatedVolume || 0} متر مکعب`,
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "فعال" : "غیرفعال"),
  },
];


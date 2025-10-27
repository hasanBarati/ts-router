// src/pages/products/ui/product-actions.tsx

import React from "react";
import { TableActions } from "@/features/table-actions/ui";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import type { Product } from "../../model/table/table-types";
import { useProductActions } from "../../lib/hooks/use-product-actions";

interface ProductActionsProps {
  onCreateNormal: () => void;
  onExportExcel: () => void;
  isActive: boolean;
  onActiveChange: (value: boolean) => void;
  tableData?: Product[];
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  onCreateNormal,
  onExportExcel,
  isActive,
  onActiveChange,
  tableData,
}) => {
  const actions = useProductActions({
    onCreateNormal,
    onExportExcel,
    tableData,
  });

  return (
    <TableActions actions={actions}>
      <div className="flex items-center gap-2">
        <Label htmlFor="status-filter" className="cursor-pointer font-medium">
          {isActive ? "فعال" : "غیرفعال"}
        </Label>
        <Switch
          id="status-filter"
          checked={isActive}
          onCheckedChange={onActiveChange}
        />
      </div>
    </TableActions>
  );
};



import React from "react";
import { TableActions } from "@/features/table-actions/ui";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import type { TableProductActionsProps } from "../../model/table/table-types";
import { useProductActions } from "../../lib/hooks/use-product-actions";


export const TableProductActions: React.FC<TableProductActionsProps> = ({
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

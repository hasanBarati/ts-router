import React from "react";
import {
  FileDown,
  FileUp,
  PackageCheck,
  PackagePlus,
  Plus,
  Trash2,
} from "lucide-react";
import { PageActions } from "@/features/table-actions";

import { Label } from "@/shared/ui/label";
import { hasPermission } from "@/features/auth";
import { Switch } from "@/shared/ui/switch";

interface TableActionsProps {
  onCreateNormal: () => void;
  onCreateSpecial: () => void;
  onExport: () => void;
  onImport: () => void;
  onBulkDelete: () => void;
  isActive: boolean; // ✅ اضافه شد
  onActiveChange: (value: boolean) => void; // ✅ اضافه شد
}

export const TableActions: React.FC<TableActionsProps> = ({
  onCreateNormal,
  onCreateSpecial,
  onExport,
  onImport,
  onBulkDelete,
  isActive,
  onActiveChange,
}) => {
  return (
    <div className="flex items-center  gap-4">
      <PageActions
        primaryAction={{
          title: "افزودن",
          icon: Plus,
          onClick: onCreateNormal,
          permission: hasPermission(""),
          subActions: [
            {
              title: "کیسه عادی",
              icon: PackagePlus,
              onClick: onCreateNormal,
              permission: hasPermission(""),
            },
            {
              title: "کیسه ویژه",
              icon: PackageCheck,
              onClick: onCreateSpecial,
              permission: hasPermission(""),
            },
          ],
        }}
        secondaryActions={[
          {
            title: "خروجی اکسل",
            icon: FileDown,
            onClick: onExport,
            permission: hasPermission(""),
            variant: "outline",
          },
          {
            title: "ورود اطلاعات",
            icon: FileUp,
            onClick: onImport,
            permission: hasPermission(""),
            variant: "outline",
          },
          {
            title: "حذف گروهی",
            icon: Trash2,
            onClick: onBulkDelete,
            permission: hasPermission(""),
            variant: "destructive",
          },
        ]}
      />

      <div className="flex items-center gap-2" >
      <Label htmlFor="status-filter" className="cursor-pointer font-medium">
          {isActive ? "فعال" : "غیرفعال"}
        </Label>
        <Switch
          id="status-filter"
          checked={isActive}
          onCheckedChange={onActiveChange}
        />
    
      </div>

      
    </div>
  );
};

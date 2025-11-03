import {
  ACTION_TYPES,
  createAction,
  type ActionItem,
} from "@/features/table-actions/config/table-action-config";
import { hasPermission } from "@/features/auth";
import type { Product } from "../../model/table/table-types";

interface UseProductActionsProps {
  onCreateNormal: () => void;
  onExportExcel: () => void;
  tableData?: Product[];
}

export const useProductActions = ({
  onCreateNormal,
  onExportExcel,
}: UseProductActionsProps): ActionItem[] => {
  return [
    createAction(ACTION_TYPES.CREATE, onCreateNormal, {
      permission: hasPermission("product.create"),
      subActions: [
        createAction(ACTION_TYPES.CREATE, onCreateNormal, {
          permission: hasPermission("product.create"),
        }),
      ],
    }),
    createAction(ACTION_TYPES.EXPORT_EXCEL, onExportExcel, {
      permission: hasPermission("product.export"),
    }),
  ];
};

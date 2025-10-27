// src/shared/config/table-actions.config.ts

import {
    Plus,
    FileSpreadsheet,
    Upload,
    Trash2,
    FilePlus,
    Download,
    type LucideIcon,
  } from "lucide-react";
  
  export const ACTION_TYPES = {
    CREATE: "create",
    BULK_CREATE: "bulk_create",
    EXPORT_EXCEL: "export_excel",
    IMPORT_EXCEL: "import_excel",
    BULK_DELETE: "bulk_delete",
    EXPORT_PDF: "export_pdf",
  } as const;
  
  export type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];
  
  interface ActionConfig {
    title: string;
    icon: LucideIcon;
    variant?: "default" | "outline" | "destructive" | "ghost";
  }
  
  // ✅ Config ساده برای همه actions
  export const ACTION_CONFIGS: Record<ActionType, ActionConfig> = {
    [ACTION_TYPES.CREATE]: {
      title: "افزودن",
      icon: Plus,
      variant: "default",
    },
    [ACTION_TYPES.BULK_CREATE]: {
      title: "افزودن گروهی",
      icon: FilePlus,
      variant: "outline",
    },
    [ACTION_TYPES.EXPORT_EXCEL]: {
      title: "خروجی اکسل",
      icon: FileSpreadsheet,
      variant: "outline",
    },
    [ACTION_TYPES.IMPORT_EXCEL]: {
      title: "ورودی اکسل",
      icon: Upload,
      variant: "outline",
    },
    [ACTION_TYPES.BULK_DELETE]: {
      title: "حذف گروهی",
      icon: Trash2,
      variant: "destructive",
    },
    [ACTION_TYPES.EXPORT_PDF]: {
      title: "خروجی PDF",
      icon: Download,
      variant: "outline",
    },
  };
  
  // ✅ تایپ برای Action
  export interface ActionItem {
    type: ActionType;
    onClick: () => void;
    permission?: boolean;
    subActions?: ActionItem[];
  }
  
  // ✅ Helper برای ساخت action
  export function createAction(
    type: ActionType,
    onClick: () => void,
    options?: {
      permission?: boolean;
      subActions?: ActionItem[];
    }
  ): ActionItem {
    return {
      type,
      onClick,
      permission: options?.permission ?? true,
      subActions: options?.subActions,
    };
  }
  
// src/features/table-actions/ui/table-actions.tsx

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ChevronDown } from "lucide-react";
import { ACTION_CONFIGS, type ActionItem } from "../config/table-action-config";
import { cn } from "@/shared/lib/utils";

interface TableActionsProps {
  actions: ActionItem[];
  children?: React.ReactNode;
}

export const TableActions: React.FC<TableActionsProps> = ({
  actions,
  children,
}) => {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});

  const handlePopoverChange = (actionType: string, isOpen: boolean) => {
    setOpenPopovers((prev) => ({ ...prev, [actionType]: isOpen }));
  };

  const handleSubActionClick = (actionType: string, subAction: ActionItem) => {
    subAction.onClick();
    handlePopoverChange(actionType, false);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {actions
        .filter((action) => action.permission !== false)
        .map((action) => {
          const config = ACTION_CONFIGS[action.type];
          const Icon = config.icon;

          // ✅ اگه subActions داره، Popover نشون بده
          if (action.subActions && action.subActions.length > 0) {
            return (
              <Popover
                key={action.type}
                open={openPopovers[action.type] || false}
                onOpenChange={(isOpen) =>
                  handlePopoverChange(action.type, isOpen)
                }
              >
                <PopoverTrigger asChild>
                  <Button variant={config.variant} className="gap-2">
                    <Icon className="w-4 h-4" />
                    {config.title}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-56 p-2" align="start">
                  <div className="flex flex-col gap-1">
                    {action.subActions
                      .filter((sub) => sub.permission !== false)
                      .map((subAction) => {
                        const subConfig = ACTION_CONFIGS[subAction.type];
                        const SubIcon = subConfig.icon;

                        return (
                          <Button
                            key={subAction.type}
                            variant="ghost"
                            onClick={() =>
                              handleSubActionClick(action.type, subAction)
                            }
                            className={cn(
                              "w-full justify-start gap-2",
                              "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <SubIcon className="w-4 h-4" />
                            {subConfig.title}
                          </Button>
                        );
                      })}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          // ✅ اگه subActions نداره، Button معمولی
          return (
            <Button
              key={action.type}
              variant={config.variant}
              onClick={action.onClick}
              className="gap-2"
            >
              <Icon className="w-4 h-4" />
              {config.title}
            </Button>
          );
        })}

      {children}
    </div>
  );
};

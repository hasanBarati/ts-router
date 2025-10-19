import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Plus, ChevronDown, type LucideIcon } from "lucide-react";

interface ActionItem {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  permission?: boolean;
  variant?: "default" | "outline" | "destructive" | "ghost";
}

interface PrimaryAction extends ActionItem {
  subActions?: ActionItem[];
}

interface PageActionsProps {
  primaryAction?: PrimaryAction;
  secondaryActions?: ActionItem[];
}

export const PageActions: React.FC<PageActionsProps> = ({
  primaryAction,
  secondaryActions = [],
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const visibleSecondaryActions = secondaryActions.filter(
    (action) => action.permission !== false
  );

  if (primaryAction && primaryAction.permission === false) {
    return null;
  }

  const handleSubActionClick = (onClick: () => void) => {
    setPopoverOpen(false);
    onClick();
  };

  return (
    <div className="flex gap-2">
      {primaryAction && (
        <>
          {primaryAction.subActions && primaryAction.subActions.length > 0 ? (
            <Popover
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
              modal={false}
            >
              <PopoverTrigger asChild >
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  {primaryAction.title}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent  side="bottom" align="start" className=" w-full p-2">
                <div className="flex flex-col gap-1">
                  {primaryAction.subActions
                    .filter((sub) => sub.permission !== false)
                    .map((subAction, index) => {
                      const SubIcon = subAction.icon;
                      return (
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() =>
                            handleSubActionClick(subAction.onClick)
                          }
                          className="w-full justify-start gap-2 h-9"
                        >
                          <SubIcon className="h-4 w-4" />
                          {subAction.title}
                        </Button>
                      );
                    })}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                primaryAction.onClick();
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {primaryAction.title}
            </Button>
          )}
        </>
      )}
      {visibleSecondaryActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button
            key={index}
            variant={action.variant || "outline"}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
            }}
            className="gap-2"
          >
            <Icon className="h-4 w-4" />
            {action.title}
          </Button>
        );
      })}
    </div>
  );
};

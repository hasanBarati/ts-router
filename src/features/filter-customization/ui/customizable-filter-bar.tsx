import { Button } from "@/shared/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, type Path } from "react-hook-form";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover";
import { Settings, SlidersHorizontal, X } from "lucide-react";
import { useGetCustomization } from "../api/use-get-customization";
import { useFilterCustomizationStore } from "../model/use-filter-customization-store";
import { FilterCustomizationDialog } from "./filter-customization-dialog";

import { DynamicField } from "@/features/dynamic-form-fields/ui/dynamic-fileds";
import { SearchButton } from "@/shared/ui/search-button";
import { Skeleton } from "@/shared/ui/skelton";
import type { CustomizableField, TableColumn } from "../model/type";

interface CustomizableFilterBarProps<T> {
  tableKey: string;
  tableName: string;
  defaultFields: CustomizableField<T>[];
  defaultColumns: TableColumn[];
  onSubmit: (data: T) => void;
}

export function CustomizableFilterBar<T extends Record<string, any>>({
  tableKey,
  tableName,
  defaultFields,
  defaultColumns,
  onSubmit
}: CustomizableFilterBarProps<T>) {
  const form = useFormContext<T>();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const { initializeFromApi, getTableFields } = useFilterCustomizationStore();
  const watchedFields = form.watch();

  const { data: customizationData, isLoading } = useGetCustomization();

  useEffect(() => {
    if (!isLoading) {
      initializeFromApi(
        tableKey,
        customizationData,
        defaultFields,
        defaultColumns
      );
    }
  }, [isLoading, customizationData, tableKey, defaultFields, defaultColumns, initializeFromApi]);

  const fields = getTableFields<T>(tableKey);
  const activeFields = fields.length > 0 ? fields : defaultFields;

  const { mainFields, advancedFields } = useMemo(() => {
    const visibleFields = activeFields
      .filter((f) => f.isVisible)
      .sort((a, b) => a.order - b.order);

    const main = visibleFields.filter((f) => !f.isInAdvanced);
    const advanced = visibleFields.filter((f) => f.isInAdvanced);

    return { mainFields: main, advancedFields: advanced };
  }, [activeFields]);

  const activeAdvancedFiltersCount = advancedFields.filter((field) => {
    const value = watchedFields[field.name];
    return value !== null && value !== undefined && value !== "";
  }).length;

  const handleClearAdvanced = () => {
    advancedFields.forEach((field) => {
      form.setValue(field.name as Path<T>, null as any);
    });
  };

  const handleOpenCustomization = () => {
    setIsAdvancedOpen(false);
    setTimeout(() => setIsCustomizationOpen(true), 100);
  };

  if (isLoading) {
    return (
      <div className="searchForm">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="searchForm">
        {mainFields.map((field) => (
          <DynamicField
            key={field.id}
            field={field.fieldConfig}
            control={form.control}
            register={form.register}
            errors={form.formState.errors}
            trigger={form.trigger}
            watchedFields={watchedFields}
          />
        ))}

        {advancedFields.length > 0 && (
          <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="relative gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">جستجوی پیشرفته</span>
                {activeAdvancedFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {activeAdvancedFiltersCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="font-semibold text-lg">جستجوی پیشرفته</h3>
                  {activeAdvancedFiltersCount > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAdvanced}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                      پاک کردن
                    </Button>
                  )}
                </div>

                <div className="  grid grid-cols-2 gap-4">
                  {advancedFields.map((field) => (
                    <DynamicField
                      key={field.id}
                      field={field.fieldConfig}
                      control={form.control}
                      register={form.register}
                      errors={form.formState.errors}
                      trigger={form.trigger}
                      watchedFields={watchedFields}
                    />
                  ))}
                </div>

                <div className="flex gap-2 pt-3 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenCustomization}
                    className="gap-1.5"
                  >
                    <Settings className="w-4 h-4" />
                    شخصی سازی
                  </Button>

                  <div className="flex-1 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsAdvancedOpen(false)}
                    >
                      بستن
                    </Button>
                    <Button
                      type="button"
                      className="flex-1"
                      onClick={() => {
                        form.handleSubmit((data) => {
                            onSubmit(data); // ✅ بعد submit کن
                            setIsAdvancedOpen(false);
                          })();
                
                      }}
                    >
                      اعمال فیلترها
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <SearchButton />
      </div>

      <FilterCustomizationDialog
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        tableKey={tableKey}
        tableName={tableName}
        defaultFields={defaultFields}
        defaultColumns={defaultColumns}
      />
    </>
  );
}



import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSaveCustomization } from "../api/use-save-customization";
import type { CustomizableField, TableColumn } from "../model/type";
import { useFilterCustomizationStore } from "../model/use-filter-customization-store";
import { DraggableColumnItem } from "./draggabel-columns";
import { DraggableFieldItem } from "./draggable-fieldItem";

interface FilterCustomizationDialogProps<T extends Record<string, unknown>> {
  isOpen: boolean;
  onClose: () => void;
  tableKey: string;
  tableName: string;
  defaultFields: CustomizableField<T>[];
  defaultColumns: TableColumn[];
}

export function FilterCustomizationDialog<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  tableKey,
  tableName,
  defaultFields,
  defaultColumns,
}: FilterCustomizationDialogProps<T>) {
  const {
    getTableFields,
    getTableColumns,
    updateFieldOrder,
    updateColumnOrder,
    resetTableToDefault,
  } = useFilterCustomizationStore();

  const storeFields = getTableFields<T>(tableKey);
  const storeColumns = getTableColumns(tableKey);

  const [localFields, setLocalFields] = useState<CustomizableField<T>[]>([]);
  const [localColumns, setLocalColumns] = useState<TableColumn[]>([]);

  const { mutate: saveCustomization, isPending } = useSaveCustomization();

  useEffect(() => {
    if (isOpen) {    
      const fieldsToUse = storeFields.length > 0 ? storeFields : defaultFields;
      const columnsToUse =
        storeColumns.length > 0 ? storeColumns : defaultColumns;
      setLocalFields(fieldsToUse);
      setLocalColumns(columnsToUse);
    }
  }, [isOpen, storeFields, storeColumns, defaultFields, defaultColumns]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFieldDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalFields((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex);
      return reordered.map((item, index) => ({ ...item, order: index }));
    });
  };

  const handleColumnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalColumns((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex);
      return reordered.map((item, index) => ({ ...item, order: index }));
    });
  };

  const handleSave = () => {
    updateFieldOrder(tableKey, localFields);
    updateColumnOrder(tableKey, localColumns);
    saveCustomization(
      { fields: localFields, columns: localColumns },
      {
        onSuccess: () => {
          toast("تنظیمات با موفقیت ذخیره شد");
          onClose();
        },
        onError: () => {
          toast("مشکلی در ذخیره‌سازی رخ داد");
        },
      }
    );
  };

  const handleReset = () => {
    resetTableToDefault(tableKey, defaultFields, defaultColumns);
    setLocalFields(defaultFields);
    setLocalColumns(defaultColumns);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>شخصی‌سازی {tableName}</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="filters"
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="filters">فیلترها</TabsTrigger>
            <TabsTrigger value="columns">ستون‌ها</TabsTrigger>
          </TabsList>

          <TabsContent
            value="filters"
            className="flex-1 overflow-y-auto space-y-4 mt-4"
          >
            <p className="text-sm text-muted-foreground">
              می‌توانید فیلترها را با کشیدن مرتب کرده و محل آن‌ها را تغییر دهید.
            </p>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleFieldDragEnd}
            >
              <SortableContext
                items={localFields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {localFields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <DraggableFieldItem
                        key={field.id}
                        field={field}
                        onToggleLocation={(id) => {
                          setLocalFields((prev) =>
                            prev.map((f) =>
                              f.id === id
                                ? { ...f, isInAdvanced: !f.isInAdvanced }
                                : f
                            )
                          );
                        }}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>

          <TabsContent
            value="columns"
            className="flex-1 overflow-y-auto space-y-4 mt-4"
          >
            <p className="text-sm text-muted-foreground">
              می‌توانید ستون‌ها را مرتب کرده و نمایش آن‌ها را کنترل کنید.
            </p>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleColumnDragEnd}
            >
              <SortableContext
                items={localColumns.map((c) => c.id!)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {localColumns
                    // .sort((a, b) => a.order - b.order)
                    .map((column) => (
                      <DraggableColumnItem
                        key={column.id}
                        column={column}
                        onToggleVisibility={(id) => {
                          setLocalColumns((prev) =>
                            prev.map((c) =>
                              c.id === id
                                ? { ...c, isVisible: !c.isVisible }
                                : c
                            )
                          );
                        }
                      }
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset} disabled={isPending}>
            بازنشانی
          </Button>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            انصراف
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            ذخیره تغییرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

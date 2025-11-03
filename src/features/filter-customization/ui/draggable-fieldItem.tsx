import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { CustomizableField } from "../model/type";


interface DraggableFieldItemProps<T extends Record<string, any> = Record<string, any>> {
  field: CustomizableField<T>;
  onToggleLocation: (id: string) => void;
}

export function DraggableFieldItem<T extends Record<string, any>>({
  field,
  onToggleLocation,
}: DraggableFieldItemProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-background border rounded-lg hover:border-primary/50 transition-colors"
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <Label htmlFor={`location-${field.id}`} className="flex-1 cursor-pointer">
        {field.label}
      </Label>

      <div className="flex items-center gap-2">
        <Switch
          id={`location-${field.id}`}
          checked={field.isInAdvanced}
          onCheckedChange={() => onToggleLocation(field.id)}
        />
        <span className="text-xs text-muted-foreground min-w-[60px]">
          {field.isInAdvanced ? "پیشرفته" : "اصلی"}
        </span>
      </div>
    </div>
  );
}

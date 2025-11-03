import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import type { TableColumn } from "../model/type";


interface DraggableColumnItemProps {
  column: TableColumn;
  onToggleVisibility: (id: string) => void;
}

export function DraggableColumnItem({
  column,
  onToggleVisibility,
}: DraggableColumnItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id! });

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

      <Label htmlFor={`visibility-${column.id}`} className="flex-1 cursor-pointer">
        {column.header}
      </Label>

      <div className="flex items-center gap-2">
        <Switch
          id={`visibility-${column.id}`}
          checked={column.isVisible}
          onCheckedChange={() => onToggleVisibility(column.id!)}
        />
        {column.isVisible ? (
          <Eye className="w-4 h-4 text-green-600" />
        ) : (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

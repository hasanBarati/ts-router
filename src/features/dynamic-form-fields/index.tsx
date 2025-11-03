// src/features/dynamic-form-fields/index.tsx
import { Button } from "@/shared/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import type { FieldConfig } from "./model/type";
import { DynamicField } from "./ui/dynamic-fileds";

export function DynamicForm<T extends Record<string, any>>({
  fields,
  defaultValues,
  onSubmit,
  schema,
  isSubmitting,
  formClassName,
  onClose,
}: {
  fields: FieldConfig<T>[];
  defaultValues: any;
  onSubmit: (data: T) => void;
  schema?: any;
  isSubmitting?: boolean;
  formClassName?: string;
  onClose: () => void;
}) {
  const form = useForm<T>({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
  });

  const watchedFields = form.watch();

  // dependency clearing logic stays the same
  useEffect(() => {
    if (defaultValues) return;
    fields.forEach((f) => {
      if (f.dependsOn) {
        const currentValue = watchedFields[f.name];
        if (currentValue !== null && currentValue !== undefined) {
          form.setValue(f.name, null as any, { shouldValidate: false });
        }
      }
    });
  }, [
    ...fields
      .filter((f) => f.dependsOn)
      .map((f) => watchedFields[f.dependsOn!]),
  ]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={formClassName}>
        {fields.map((f) => (
          <DynamicField
            key={f.name as string}
            field={f}
            control={form.control}
            register={form.register}
            errors={form.formState.errors}
            trigger={form.trigger}
            watchedFields={watchedFields}
          />
        ))}
      </div>

      <div className="flex justify-end gap-2 ">
        <Button
          type="button"
          onClick={onClose}
          className="px-6 mt-4 min-w-40"
          variant={"secondary"}
        >
          لغو
        </Button>
        <Button
          type="submit"
          className="px-6 mt-4 min-w-40"
          variant={"default"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
        </Button>
      </div>
    </form>
  );
}

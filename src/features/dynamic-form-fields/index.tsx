// src/features/dynamic-form-fields/index.tsx
import { AsyncPopoverSelect } from "@/features/async-select/async-select";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type DefaultValues,
  type Path,
} from "react-hook-form";
import { useEffect } from "react";
import type { FieldConfig } from "./model/type";

interface DynamicFormProps<T extends Record<string, any>> {
  fields: FieldConfig<T>[];
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  schema?: any;
  isSubmitting?: boolean;
  formClassName?: string;
  onClose:()=>void
}

export function DynamicForm<T extends Record<string, any>>({
  fields,
  defaultValues,
  onSubmit,
  schema,
  isSubmitting,
  formClassName,
  onClose
}: DynamicFormProps<T>) {
  const form = useForm<T>({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
  });

  const watchedFields = form.watch();

  useEffect(() => {
    fields.forEach((field) => {
      if (field.dependsOn) {
        const currentValue = watchedFields[field.name];
        if (currentValue !== null && currentValue !== undefined) {
          form.setValue(field.name, null as any, { shouldValidate: false });
        }
      }
    });
  }, [
    ...fields
      .filter((f) => f.dependsOn)
      .map((f) => watchedFields[f.dependsOn!]),
  ]);

  const getErrorMessage = (fieldName: Path<T>): string | undefined => {
    const error = form.formState.errors[fieldName];
    if (!error) return undefined;

    if (typeof error === "object" && "message" in error) {
      return error.message as string;
    }

    return undefined;
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={formClassName}>
        {fields.map((field) => {
       
          const errorMessage = getErrorMessage(field.name);

          if (field.type === "input") {
            return (
              <div key={field.name as string}>
                <Input
                  {...form.register(field.name)}
                  {...field.inputProps}
                  label={field.label}
                  error={errorMessage}
                  important={field.important}
                />
              </div>
            );
          }

          if (field.type === "async-select" && field.asyncSelectProps) {
            // ✅ گرفتن مقدار فیلد وابسته
            const watchedValue = field.dependsOn
              ? watchedFields[field.dependsOn]
              : undefined;
            let dynamicUrl: string | undefined;
            if (field.asyncSelectProps.getDynamicUrl) {
              dynamicUrl = watchedValue
                ? field.asyncSelectProps.getDynamicUrl(watchedValue)
                : undefined;
            } else {
              dynamicUrl = field.asyncSelectProps.url;
            }
            const isDisabled = field.dependsOn && !watchedValue;
            const queryKey: string[] = [
              ...field.asyncSelectProps.queryKey,
              ...(watchedValue?.id ? [String(watchedValue.id)] : []),
            ];

            return (
              <div key={field.name as string}>
                <Controller
                  name={field.name}
                  control={form.control}
                  render={({ field: controllerField }) => (
                    <AsyncPopoverSelect
                      {...field.asyncSelectProps}
                      url={dynamicUrl}
                      queryKey={queryKey}
                      value={controllerField.value}
                      onChange={(val) => {
                        controllerField.onChange(val);
                        form.trigger(field.name);
                      }}
                      error={errorMessage}
          
                      label={field.label}
                      important={field.important}
                      readonly={isDisabled}
                      
                    />
                  )}
                />
              </div>
            );
          }

          return null;
        })}
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

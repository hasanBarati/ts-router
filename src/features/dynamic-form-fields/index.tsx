import { Controller, useForm, type DefaultValues, type Path } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { AsyncPopoverSelect } from "@/features/async-select/async-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

export type FieldType = "input" | "async-select";

export type FieldConfig<T extends Record<string, any>> = {
  name: Path<T>;
  label: string;
  type: FieldType;
  inputProps?: React.ComponentProps<"input">;
  asyncSelectProps?: {
    url: string;
    queryKey: readonly string[];
    [key: string]: any;
  };
};

interface DynamicFormProps<T extends Record<string, any>> {
  fields: FieldConfig<T>[];
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  schema?: any;
  isSubmitting?: boolean;
}

export function DynamicForm<T extends Record<string, any>>({
  fields,
  defaultValues,
  onSubmit,
  schema,
  isSubmitting,
}: DynamicFormProps<T>) {
  const form = useForm<T>({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });
  console.log("form.formState.isSubmitting", form.formState.errors);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => {
        if (field.type === "input") {
          return (
            <div key={field.name as string}>
              <Input
                {...form.register(field.name)}
                {...field.inputProps}
                label={field.label}
                error={form.formState.errors[field.name]?.message as string}
              />
            </div>
          );
        }
        if (field.type === "async-select" && field.asyncSelectProps) {
          return (
            <div key={field.name}>
              <Controller
                name={field.name}
                control={form.control}
                render={({ field: controllerField }) => (
                  <AsyncPopoverSelect
                    {...field.asyncSelectProps}
                    value={controllerField.value}
                    onChange={controllerField.onChange}
                    error={form.formState.errors[field.name]?.message as string}
                    placeholder={field.label}
                    label={field.label}
          
                  />
                )}
              />
            </div>
          );
        }
        return null;
      })}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
      </Button>
    </form>
  );
}

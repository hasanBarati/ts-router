// src/features/dynamic-form-fields/ui/dynamic-field.tsx
import { AsyncPopoverSelect } from "@/features/async-select/ui/async-select";
import { Input } from "@/shared/ui/input";
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
  type UseFormRegister,
  type UseFormTrigger,
} from "react-hook-form";
import type { FieldConfig } from "../model/type";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";

interface DynamicFieldProps<T extends Record<string, any>> {
  field: FieldConfig<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  trigger: UseFormTrigger<T>;
  watchedFields: T;
}

export function DynamicField<T extends Record<string, any>>({
  field,
  control,
  register,
  errors,
  trigger,
  watchedFields,
}: DynamicFieldProps<T>) {
  const getErrorMessage = (name: Path<T>): string | undefined => {
    const e = errors[name];
    if (!e) return undefined;
    if (typeof e === "object" && "message" in e) return e.message as string;
    return undefined;
  };

  const errorMessage = getErrorMessage(field.name);

  // ---------- Input ----------
  if (field.type === "input") {
    return (
      <Input
        key={field.name as string}
        {...register(field.name)}
        {...field.inputProps}
        label={field.label}
        error={errorMessage}
        important={field.important}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        key={field.name as string}
        {...register(field.name)}
        {...field.textareaProps}
        label={field.label}
        error={errorMessage}
        important={field.important}
        wrapperClassName={field.wrapperClassName}
      />
    );
  }

  if (field.type === "switch") {
    return (
      <div
        key={field.name as string}
        className={cn(
          "flex flex-row items-center gap-2",
          field.wrapperClassName
        )}
      >
        <Controller
          name={field.name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center gap-2">
              <Label
                htmlFor={field.name as string}
                className="cursor-pointer font-medium"
              >
                {value ? "فعال" : "غیرفعال"}
              </Label>
              <Switch
                id={field.name as string}
                checked={value}
                onCheckedChange={onChange}
                {...field.switchProps}
              />
            </div>
          )}
        />
      </div>
    );
  }

  // ---------- Async Select ----------
  if (field.type === "async-select" && field.asyncSelectProps) {
    const watchedValue = field.dependsOn
      ? watchedFields[field.dependsOn]
      : undefined;
    const dynamicUrl = field.asyncSelectProps.getDynamicUrl
      ? watchedValue
        ? field.asyncSelectProps.getDynamicUrl(watchedValue)
        : undefined
      : field.asyncSelectProps.url;

    const isDisabled = field.dependsOn && !watchedValue;
    const queryKey: string[] = [
      ...field.asyncSelectProps.queryKey,
      ...(watchedValue?.id ? [String(watchedValue.id)] : []),
    ];

    return (
      <Controller
        key={field.name as string}
        name={field.name}
        control={control}
        render={({ field: controllerField }) => (
          <AsyncPopoverSelect
            {...field.asyncSelectProps}
            url={dynamicUrl}
            queryKey={queryKey}
            value={controllerField.value}
            onChange={(val) => {
              controllerField.onChange(val);
              trigger(field.name);
            }}
            error={errorMessage}
            label={field.label}
            important={field.important}
            readonly={isDisabled}
          />
        )}
      />
    );
  }

  return null;
}

import React from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import type { FieldValues } from "react-hook-form";

interface FilterChipsProps<T extends FieldValues> {
  customLabels?: Partial<Record<keyof T, string>>;
  formatValue?: (fieldName: keyof T, value: any) => string;
}

export function FilterChips<T extends FieldValues>({
  customLabels,
  formatValue,
}: FilterChipsProps<T>) {
  const { watch, resetField, handleSubmit } = useFormContext<T>();
  const formValues = watch();

  const handleRemove = (fieldName: keyof T) => {
    resetField(fieldName);
    handleSubmit(() => {})(); // Submit form after removal
  };

  const activeFilters = Object.entries(formValues)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([fieldName, value]) => ({
      fieldName: fieldName as keyof T,
      value,
      label: customLabels?.[fieldName as keyof T] || String(fieldName),
    }));

  if (activeFilters.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {activeFilters.map(({ fieldName, value, label }) => (
        <div
          key={String(fieldName)}
          className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800"
        >
          <span>
            {label}: {formatValue ? formatValue(fieldName, value) : value?.text || value}
          </span>
          <button
            type="button"
            onClick={() => handleRemove(fieldName)}
            className="ml-1 text-gray-500 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
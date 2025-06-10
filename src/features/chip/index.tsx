// src/features/chip/filter-chips.tsx
import { BicepsFlexed, X } from "lucide-react";
import { useFormContext, type Path } from "react-hook-form";

interface FilterChipsProps<T extends Record<string, any>> {
  appliedFilters: T;
  onApply: (values: T) => void;
}

export const FilterChips = <T extends Record<string, any>>({
  appliedFilters,
  onApply,
}: FilterChipsProps<T>) => {
  const { setValue, reset, formState } = useFormContext<T>();

  const persianLabels: Partial<Record<keyof T, string>> = {
    selectHub: "هاب",
    selectCustomer: "مشتری",
    orderDate: "تاریخ سفارش",
  } as Partial<Record<keyof T, string>>;

  const formatValue = (key: keyof T, value: any) => {
    if (key === "orderDate" && value) {
      return `${value.year}/${value.month}/${value.day}`;
    }
    if (value?.text) return value.text;
    if (value?.label) return value.label;
    return value?.toString() || "";
  };

  const handleRemoveFilter = (key: Path<T>) => {
    const defaultValue = formState.defaultValues?.[key];
    setValue(key, defaultValue as any);
    const currentValues = { ...appliedFilters, [key]: defaultValue };
    onApply(currentValues);
  };

  const handleClearAll = () => {
    reset();
    onApply((formState.defaultValues as T) || ({} as T));
  };

  const activeFilters = Object.entries(appliedFilters)
    .filter(([_, value]) => {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((v) => v !== undefined && v !== "");
      }
      return value !== undefined && value !== "" && value !== null;
    })
    .map(([key, value]) => ({
      key: key as Path<T>,
      label: persianLabels[key as keyof T] || key,
      value: formatValue(key as keyof T, value),
    }));

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {activeFilters.map(({ key, label, value }) => (
        <div
          key={key.toString()}
          className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
        >
          <span className="text-sm">
            {label}: {value}
          </span>
          <button
            type="button"
            onClick={() => handleRemoveFilter(key)}
            className="text-gray-500 hover:text-red-600"
          >
            <X  size={18} />
          </button>
        </div>
      ))}
      {activeFilters.length > 0 && (
        <button
          type="button"
          onClick={handleClearAll}
          className="text-red-600 hover:text-red-700 text-sm flex items-center"
        >
          حذف همه فیلترها
        </button>
      )}
    </div>
  );
};

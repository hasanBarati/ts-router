import { useQuery } from "@tanstack/react-query";
import { cn, fetchOption } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { Check, ChevronDown, AlertCircle } from "lucide-react";
import { Checkbox } from "@/shared/ui/checkbox";
import { useMemo, useState } from "react";

type Option = { id: string | number; text: string };

type Mode = "" | "single" | "multiple";

interface AsyncPopoverSelectProps<T> {
  url?: string;
  queryKey?: readonly string[];
  placeholder?: string;
  mode?: Mode;
  value?: T extends Option[] ? Option[] : Option | null;
  onChange: (value: T extends Option[] ? Option[] : Option | null) => void;
  filter?: string;
  mapResponse?: (item: any) => Option;
  listHeight?: number;
  error?: string;
  label?: string;
  important?: boolean;
  readonly?: boolean;
  wrapperClassName?: string;
}

export function AsyncPopoverSelect<T extends Option | Option[]>({
  url,
  queryKey,
  placeholder,
  mode = "",
  value,
  onChange,
  filter = "",
  mapResponse,
  listHeight = 300,
  error,
  label,
  important,
  readonly,
  wrapperClassName,
}: AsyncPopoverSelectProps<T>) {
  const {
    data: options = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...queryKey, filter],
    queryFn: () => fetchOption(url, filter, mapResponse),
    enabled: !!url,
  });

  const [open, setOpen] = useState(false);

  const selectedIds = useMemo(() => {
    const s = new Set<string | number>();
    if (mode === "multiple" && Array.isArray(value)) {
      value.forEach((v) => s.add(v.id));
    } else if (value) {
      s.add((value as Option).id);
    }
    return s;
  }, [mode, value]);

  const allIds = options.map((o: Option) => o.id);
  const allSelected =
    mode === "multiple" && allIds.every((id: number) => selectedIds.has(id));

  const toggleOne = (opt: Option, checked: boolean) => {
    if (mode === "multiple") {
      const next = new Set(selectedIds);
      checked ? next.add(opt.id) : next.delete(opt.id);
      onChange(options.filter((o: Option) => next.has(o.id)));
    } else {
      onChange(checked ? opt : (null as any));
      setOpen(false);
    }
  };

  const toggleAll = (checked: boolean) => {
    if (mode === "multiple") onChange(checked ? options : []);
  };

  const triggerText = useMemo(() => {
    if (mode === "multiple" && Array.isArray(value)) {
      return value.length ? value.map((v) => v.text).join("، ") : placeholder;
    }
    return (value as Option)?.text || placeholder;
  }, [mode, value, placeholder]);

  return (
    <div className={cn("space-y-1", wrapperClassName)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={readonly}
            className={cn(
              "w-full !bg-white justify-between relative h-10",
              error && "border-red-500 focus-visible:ring-red-500",
              readonly && "opacity-40 cursor-not-allowed"
            )}
          >
            {/* ✅ Label بالای Input */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {label && (
                <label
                  className={cn(
                    "absolute -top-4 right-4 bg-white z-10 px-2 text-sm",
                    error ? "text-primary" : "text-darkGray"
                  )}
                >
                  {label}
                  {important && (
                    <span className="text-tomato font-extrabold text-lg mr-1 text-primary">
                      *
                    </span>
                  )}
                </label>
              )}

              {/* ✅ متن انتخاب شده */}
              <span
                className={cn(
                  "truncate flex-1 text-right",
                  !triggerText && "text-muted-foreground"
                )}
                title={triggerText}
              >
                {isLoading
                  ? "در حال بارگذاری..."
                  : isError
                  ? "خطا در بارگذاری"
                  : triggerText}
              </span>
            </div>

            {/* ✅ آیکون Chevron */}
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 mr-2" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="w-[var(--radix-popover-trigger-width)] p-0 z-100"
          
          
        >
          {/* ✅ انتخاب همه (برای حالت multiple) */}
          {mode === "multiple" && (
            <div className="flex items-center px-3 py-2 border-b">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={toggleAll}
                className="ml-2"
              />
              <label
                htmlFor="select-all"
                className="text-sm select-none cursor-pointer"
              >
                انتخاب همه
              </label>
            </div>
          )}

          {/* ✅ لیست آیتم‌ها */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${listHeight}px` }}
          >
            {options.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {isLoading ? "در حال بارگذاری..." : "موردی یافت نشد"}
              </div>
            ) : (
              options.map((opt: Option) => {
                const checked = selectedIds.has(opt.id);
                return (
                  <div
                    key={opt.id}
                    className={cn(
                      "flex items-center px-3 py-2 cursor-pointer text-sm hover:bg-accent transition-colors",
                      checked && "bg-accent"
                    )}
                    onClick={() => toggleOne(opt, !checked)}
                  >
                    {/* ✅ Checkbox برای single و multiple */}
                    {(mode === "single" || mode === "multiple") && (
                      <Checkbox
                        id={`chk-${opt.id}`}
                        checked={checked}
                        onCheckedChange={(c) => toggleOne(opt, !!c)}
                        className="ml-2 flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}

                    {/* ✅ آیکون Check برای حالت پیش‌فرض */}
                    {mode === "" && checked && (
                      <Check className="h-4 w-4 ml-2 text-primary flex-shrink-0" />
                    )}

                    {/* ✅ متن آیتم */}
                    <label
                      htmlFor={
                        mode === "single" || mode === "multiple"
                          ? `chk-${opt.id}`
                          : undefined
                      }
                      className="flex-1 select-none truncate cursor-pointer"
                      title={opt.text}
                    >
                      {opt.text}
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* ✅ نمایش پیام Error */}
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

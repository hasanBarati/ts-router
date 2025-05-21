import { useQuery } from "@tanstack/react-query";
import { cn, fetchOption } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { Checkbox } from "@/shared/ui/checkbox";
import { useMemo, useState } from "react";

type Option = { id: string | number; text: string };

type Mode = "" | "single" | "multiple";

interface AsyncPopoverSelectProps<T> {
  url: string;
  queryKey: readonly string[];
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
}

export function AsyncPopoverSelect<T extends Option | Option[]>({
  url,
  queryKey,
  placeholder = "انتخاب...",
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
}: AsyncPopoverSelectProps<T>) {
  const {
    data: options = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...queryKey, filter],
    queryFn: () => fetchOption(url, filter, mapResponse),
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
    <div className="space-y-1 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${
              error ? "border-red-500" : ""
            } ${readonly ? "opacity-40" : ""}`}
          >
            <div className="flex items-center gap-2">
              {label && (
                <span className={`${error ? "text-red-500" : ""}`}>
                  {label}
                  {important && <span className="text-red-500 ml-1">*</span>}
                </span>
              )}
              <span className={cn(!triggerText && "text-muted-foreground")}>
                {isLoading
                  ? "در حال بارگذاری..."
                  : isError
                  ? "خطا در بارگذاری"
                  : triggerText}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="w-[var(--radix-popover-trigger-width)] p-0 z-100"
        >
          {mode === "multiple" && (
            <div className="flex items-center px-3 py-2 border-b">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={toggleAll}
                className="ml-2"
              />
              <label htmlFor="select-all" className="text-sm select-none">
                انتخاب همه
              </label>
            </div>
          )}
          <div className="max-h-[300px] overflow-y-auto">
            {options.map((opt: Option) => {
              const checked = selectedIds.has(opt.id);
              return (
                <div
                  key={opt.id}
                  className={cn(
                    "flex items-center px-3 py-2 cursor-pointer text-sm hover:bg-accent",
                    checked && "bg-accent"
                  )}
                  onClick={() => toggleOne(opt, !checked)}
                >
                  {mode === "single" && (
                    <Checkbox
                      id={`chk-${opt.id}`}
                      checked={checked}
                      onCheckedChange={(c) => toggleOne(opt, !!c)}
                      className="ml-2"
                    />
                  )}
                  {mode === "" && checked && (
                    <Check className="h-4 w-4 ml-2 text-primary" />
                  )}
                  <label
                    htmlFor={
                      mode === "single" || mode === "multiple"
                        ? `chk-${opt.id}`
                        : undefined
                    }
                    className="flex-1 select-none"
                  >
                    {opt.text}
                  </label>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

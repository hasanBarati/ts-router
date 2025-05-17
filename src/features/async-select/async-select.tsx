import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchOption } from "../../shared/lib/utils";

interface Option {
  id: string | number;
  text: string;
}
export type MapResponseFn<T> = (item: T) => Option;

interface AsyncSelectProps<T> {
  url: string;
  queryKey: readonly any[];
  placeholder?: string;
  value: Option | null | undefined;
  onChange: (value: Option | null) => void;
  filter?: string;
  mapResponse?: (item: T) => Option;
}

export function AsyncSelect<T>({
  url,
  queryKey,
  placeholder = "انتخاب...",
  value,
  onChange,
  filter = "",
  mapResponse,
}: AsyncSelectProps<T>) {
  const {
    data: options = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...queryKey, filter],
    queryFn: () => fetchOption(url, filter, mapResponse),
  });


  return (
    <Select
      value={value ? JSON.stringify(value) : ""}
      onValueChange={(val) => {
        try {
          const parsed = JSON.parse(val);
          onChange(parsed);
        } catch {
          onChange(null);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {isLoading
            ? "در حال بارگذاری..."
            : isError
            ? "خطا در بارگذاری"
            : value?.text || placeholder}{" "}
        </SelectValue>
      </SelectTrigger>
      <SelectContent  >
      <SelectScrollDownButton />
        {!isLoading &&
          !isError &&
          options.map((opt: Option) => (
            <SelectItem key={opt.id} value={opt.text}>
              {opt.text}
            </SelectItem>
          ))}
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}

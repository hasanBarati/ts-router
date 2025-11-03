export type Option = { id: string | number; text: string };

export type Mode = "" | "single" | "multiple";

export interface AsyncPopoverSelectProps<T> {
  url?: string;
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
  wrapperClassName?: string;
}
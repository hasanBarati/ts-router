export type FieldType = "input" | "async-select";

export interface FieldConfigBase<T> {
  name: keyof T;
  label: string;
  type: FieldType;
}

export interface InputFieldConfig<T> extends FieldConfigBase<T> {
  type: "input";
  inputProps?: React.ComponentProps<"input">;
}

export interface AsyncSelectFieldConfig<T> extends FieldConfigBase<T> {
  type: "async-select";
  asyncSelectProps: {
    url: string;
    queryKey: readonly string[];
    [key: string]: any;
  };
}

export type FieldConfig<T> = InputFieldConfig<T> | AsyncSelectFieldConfig<T>;

import type { Path, PathValue } from "react-hook-form";

export type FieldType = "input" | "async-select";

export interface FieldConfigBase<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  important?:boolean
  dependsOn?:string
  defaultValue?: PathValue<T, Path<T>>;
}

export interface InputFieldConfig<T> extends FieldConfigBase<T> {
  type: "input";
  inputProps?: React.ComponentProps<"input">;
}

export interface AsyncSelectFieldConfig<T> extends FieldConfigBase<T> {
  type: "async-select";
  asyncSelectProps: {
    url?: string;
    queryKey: readonly string[];
    [key: string]: any;
  };
}

// export type FieldConfig<T> = InputFieldConfig<T> | AsyncSelectFieldConfig<T>;




export type FieldConfig<T extends Record<string, any>> = {
  name: Path<T>;
  label: string;
  type: FieldType;
  important?: boolean;
  inputProps?: React.ComponentProps<"input">;
  asyncSelectProps?: {
    url?: string;
    queryKey: readonly string[];
    mode?: "" | "single" | "multiple";
    placeholder?: string;
    getDynamicUrl?: (dependentValue: any) => string | undefined;
    [key: string]: any;
  };
  dependsOn?: Path<T>;
};
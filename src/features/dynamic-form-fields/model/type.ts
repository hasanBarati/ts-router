import type { Path } from "react-hook-form";

export type FieldType = "input" | "async-select" | "textarea";

interface BaseFieldConfig<T extends Record<string, any>> {
  name: Path<T>;
  label: string;
  important?: boolean;
  dependsOn?: Path<T>;
  wrapperClassName?:string
}

// ✅ Input
interface InputFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "input";
  inputProps?: React.ComponentProps<"input">;
}

// ✅ Textarea
interface TextareaFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "textarea";
  textareaProps?: React.ComponentProps<"textarea">;
}


interface SwitchFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "switch";
  switchProps?: {
    defaultChecked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    [key: string]: any;
  };
}
// ✅ Async Select
interface AsyncSelectFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "async-select";
  asyncSelectProps: {
    url?: string;
    queryKey: readonly string[];
    mode?: "" | "single" | "multiple";
    placeholder?: string;
    getDynamicUrl?: (dependentValue: any) => string | undefined;
    [key: string]: any;
  };
}

// ✅ Union Type
export type FieldConfig<T extends Record<string, any>> = 
  | InputFieldConfig<T>
  | TextareaFieldConfig<T>
  | SwitchFieldConfig<T>
  | AsyncSelectFieldConfig<T>;

import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  readOnly?: boolean;
  important?: boolean;
}

function Input({
  className,
  type,
  label,
  error,
  readOnly,
  important,
  ...props
}: InputProps) {
  return (
    <div
      className={`autocompleteWrapper  ${error && "border-red"} ${
        readOnly && "opacity-40"
      } `}
    >
      <div className={`autocompleteLabel  ${error && "text-red"} top-[-17px]`}>
        {label}{" "}
        <span className="text-tomato font-extrabold text-lg h-4">
          {important ? "*" : " "}
        </span>
      </div>

      <input
        type={type}
        data-slot="input"
        className={cn("autocompleteInput", className)}
        {...props}
      />
    </div>
  );
}

export { Input };

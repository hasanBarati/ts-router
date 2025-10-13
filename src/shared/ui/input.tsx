import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  readOnly?: boolean;
  important?: boolean;
  wrapperClassName?:string;
}

function Input({
  className,
  type,
  label,
  error,
  readOnly,
  important,
  wrapperClassName,
  ...props
}: InputProps) {


  return (
    <div className={cn(wrapperClassName,"flex flex-col")}>
      <div
        className={`inputWrapper  ${error ?"border-red":""} ${
          readOnly ? "opacity-40":""
        } `}
      >
        <div
          className={`inputLabel  ${error && "text-red"} top-[-17px]`}
        >
          {label}{" "}
          <span className="text-tomato font-extrabold text-rose-500 text-lg h-4">
            {important ? "*" : " "}
          </span>
        </div>

        <input
          type={type}
          data-slot="input"
          className={cn("input", className)}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 my-1">{error}</p>}
    </div>
  );
}

export { Input };

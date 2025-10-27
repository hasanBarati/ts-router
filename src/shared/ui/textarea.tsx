
import { cn } from "@/shared/lib/utils";
interface InputProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  readOnly?: boolean;
  important?: boolean;
  wrapperClassName?: string;
}

function Textarea({
  className,
  label,
  error,
  readOnly,
  important,
  wrapperClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn(wrapperClassName, "flex flex-col filterInput")}>
      <div
        className={` relative  ${error ? "border-red" : ""} ${
          readOnly ? "opacity-40" : ""
        } `}
      >
        <div className={`inputLabel  ${error && "text-red"} top-[-17px]`}>
          {label}{" "}
          <span className="font-extrabold text-rose-500 text-lg h-4">
            {important ? "*" : " "}
          </span>
        </div>

        <textarea
          data-slot="textarea"
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-priamry flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 my-1">{error}</p>}
    </div>
  );
}

export { Textarea };

// src/shared/ui/search-button.tsx
import { Button } from "@/shared/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SearchButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function SearchButton({ 
  isLoading = false,
  children = "جستجو",
  className,
  ...props 
}: SearchButtonProps) {
  return (
    <Button 
      type="submit" 
      disabled={isLoading}
      className={cn(
        "!px-10 py-5 text-primary flex items-center gap-2 rounded-lg bg-secondary cursor-pointer",
        "hover:bg-secondary/90 transition-colors",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
      <Search className={cn("w-5 h-5", isLoading && "animate-pulse")} />
    </Button>
  );
}

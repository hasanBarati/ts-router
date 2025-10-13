// src/shared/ui/overlay.tsx
import { cn } from "@/shared/lib/utils";

interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  blur?: boolean;
}

export function DialogOverlay({ 
  isOpen, 
  onClose, 
  className,
  blur = false 
}: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[50] bg-black/50",
        "animate-in fade-in-0 duration-200",
        blur && "backdrop-blur-sm",
        className
      )}
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

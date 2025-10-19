// shared/ui/delete-confirmation.tsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/shared/ui/alert-dialog";
  
  interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    itemName?: string;
    isDeleting?: boolean;
    confirmText?: string;
    cancelText?: string;
  }
  
  export function DeleteConfirmation({
    isOpen,
    onClose,
    onConfirm,
    title = "آیا از حذف اطمینان دارید؟",
    description,
    itemName,
    isDeleting = false,
    confirmText = "حذف",
    cancelText = "انصراف",
  }: DeleteConfirmationProps) {
    // اگر description سفارشی نداشتیم، از itemName استفاده کن
    const finalDescription = description || (
      itemName ? (
        <>
          {itemName} برای همیشه حذف خواهد شد.
          این عملیات قابل بازگشت نیست.
        </>
      ) : (
        "این عملیات قابل بازگشت نیست."
      )
    );
  
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {finalDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "در حال حذف..." : confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
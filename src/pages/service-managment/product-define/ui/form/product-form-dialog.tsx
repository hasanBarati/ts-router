import { DynamicForm } from "@/features/dynamic-form-fields";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { DialogOverlay } from "@/shared/ui/overlay";
import { type FC } from "react";
import { formSchema, type FormValues } from "../../model/form/form-types";
import { useFormMutation } from "../../lib/hooks/use-form-mutation";
import { FormFields, getFormValues } from "../../model/form/form-fields";

interface FormActionProps {
  initialData?: FormValues | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FormAction: FC<FormActionProps> = ({
  initialData,
  isOpen,
  onClose,
}) => {
  const mutation = useFormMutation(() => {
    onClose?.();
  });

  return (
    <>
      <DialogOverlay isOpen={isOpen as boolean} />
      <Dialog modal={false} open={isOpen} onOpenChange={onClose}>
        <DialogContent className="portal">
          <DialogHeader>
            <DialogTitle>
              {initialData ? "ویرایش محصول" : "افزودن محصول"}
            </DialogTitle>
          </DialogHeader>
          <DynamicForm<FormValues>
            fields={FormFields}
            schema={formSchema}
            defaultValues={getFormValues(initialData)}
            formClassName="grid grid-cols-2 gap-6"
            isSubmitting={mutation.isPending}
            onSubmit={(data) => {
              mutation.mutate(data);
            }}
            onClose={() => onClose?.()}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

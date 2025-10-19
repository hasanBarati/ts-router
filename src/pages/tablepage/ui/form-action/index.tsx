import { DynamicForm } from "@/features/dynamic-form-fields";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";
import { DialogOverlay } from "@/shared/ui/overlay";
import { type FC } from "react";
import type { Bag } from "../../model/types";
import { FormFields, getFormValues } from "./form-fields";
import { useFormMutation } from "./lib/use-form-mutation";
import { formSchema, type FormValues } from "./model/form-types";

interface FormActionProps {
  initialData?: Bag | null;
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
        {/* <DialogTrigger asChild>
          <Button variant="outline">افزودن فرم</Button>
        </DialogTrigger> */}
        <DialogContent className="portal">
          <DialogHeader>
            <DialogTitle> 
            {initialData ? "ویرایش کیسه" : "افزودن کیسه"}
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



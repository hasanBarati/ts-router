import { DynamicForm } from "@/features/dynamic-form-fields";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useFormMutation } from "../../lib/use-form-mutation";
import { formSchema, type FormValues } from "../../model/form-types";
import { DialogOverlay } from "@/shared/ui/overlay";
import { useState } from "react";
import { FormDefaultValues, FormFields } from "./form-fields";



export function FormAction() {
  const mutation = useFormMutation(() => {});
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DialogOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">افزودن فرم</Button>
        </DialogTrigger>
        <DialogContent className="portal">
          <DialogHeader>
            <DialogTitle>افزودن کیسه</DialogTitle>
          </DialogHeader>
          <DynamicForm<FormValues>
            fields={FormFields}
            schema={formSchema}
            defaultValues={FormDefaultValues}
            formClassName="grid grid-cols-2 gap-6"
            isSubmitting={mutation.isPending}
            onSubmit={(data) => {
              mutation.mutate(data);
            }}
            onClose={()=>setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}



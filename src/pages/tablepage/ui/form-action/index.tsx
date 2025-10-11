import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useFormMutation } from "../../lib/use-form-mutation";
import { DynamicForm } from "@/features/dynamic-form-fields";
import { formSchema, type FormValues } from "../../model/form-types";
import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";

const fields: FieldConfig<FormValues>[] = [
  {
    name: "selectSourceHub",
    label: "هاب مبدا",
    type: "async-select",
    asyncSelectProps: {
      url: "/core-api/hub/select",
      queryKey: ["selectSourceHub"],
      placeholder: "انتخاب هاب مبدا",
    },
  },
  {
    name: "selectDestinationHub",
    label: "هاب مقصد",
    type: "async-select",
    asyncSelectProps: {
      url: "/core-api/hub/select",
      queryKey: ["selectDestinationHub"],
      placeholder: "انتخاب هاب مقصد",
    },
  },
  {
    name: "weightCapacity",
    label: "ظرفیت وزنی",
    type: "input",
    inputProps: { placeholder: "ظرفیت وزنی" },
  },
  {
    name: "volumeCapacity",
    label: "ظرفیت حجمی",
    type: "input",
    inputProps: { placeholder: "ظرفیت حجمی" },
  },
];

export function FormAction() {
  const mutation = useFormMutation(() => {
    // handle reset if needed
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="outline">افزودن فرم</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] portal">
        <DialogHeader>
          <DialogTitle>افزودن فرم جدید</DialogTitle>
        </DialogHeader>
        <DynamicForm<FormValues>
          fields={fields}
          schema={formSchema}
          defaultValues={{
            selectSourceHub: null,
            selectDestinationHub: null,
            selectBagTypes: null,
            selectCarrier: null,
            weightCapacity: "",
            volumeCapacity: "",
          }}
          isSubmitting={mutation.isPending}
          onSubmit={(data) => {
            mutation.mutate(data);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

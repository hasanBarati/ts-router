import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";

import type { FormValues } from "./form-types";

export const FormFields: FieldConfig<FormValues>[] = [
  {
    name: "code",
    label: "کد",
    type: "input",
    important: true,
  },
  {
    name: "name",
    label: "عنوان",
    type: "input",
    important: true,
  },
  {
    name: "productGroup",
    label: "گروه بندی محصول",
    type: "async-select",
    asyncSelectProps: {
      url: "/core-api/productGroup/select",
      queryKey: ["productGroup"],
    },
    important: true,
  },
  {
    name: "isActive",
    label: "فعال",
    type: "switch",
    switchProps: {
      defaultChecked: true,
    },
  },
  {
    name: "description",
    label: "توضیحات",
    type: "textarea",
    important: true,
    wrapperClassName: "col-span-2",
  },
];

export const getFormValues = (initialData?: FormValues | null): FormValues => {
  if (!initialData) return { isActive: true } as FormValues;
  return {
    id: initialData.id,
    code: initialData.code,
    description: initialData.description,
    name: initialData.name,
    productGroup: initialData.productGroup,
    isActive: initialData.isActive,
  };
};

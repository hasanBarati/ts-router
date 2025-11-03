import type { CustomizableField } from "@/features/filter-customization";
import type { ProductDefineFilters } from "./table-types";

export const defaultFields: CustomizableField<ProductDefineFilters>[] = [
    {
      id: "p-1",
      name: "code",
      label: "کد",
      isVisible: true,
      isInAdvanced: false,
      order: 1,
      fieldConfig: {
        name: "code",
        label: "کد",
        type: "input",
        inputProps: {
          placeholder: "جستجوی شماره کیسه...",
        },
      },
    },
    {
      id: "p-2",
      name: "name",
      label: "عنوان",
      isVisible: true,
      isInAdvanced: false,
      order: 2,
      fieldConfig: {
        name: "name",
        label: "عنوان",
        type: "input",
        inputProps: {
          placeholder: "جستجوی شماره کیسه...",
        },
      },
    },
    {
      id: "p-3",
      name: "productGroup",
      label: "گروه بندی محصول",
      isVisible: true,
      isInAdvanced: false,
      order: 2,
      fieldConfig: {
        name: "productGroup",
        label: "گروه بندی محصول",
        type: "async-select",
        asyncSelectProps: {
          url: "core-api/productGroup/select",
          queryKey: ["selectBagTypes"],
          wrapperClassName: "filterInput",
        },
      },
    },
  ];
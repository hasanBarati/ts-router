import type { FieldConfig } from "@/features/dynamic-form-fields/model/type";
import type { FormValues } from "../../model/form-types";
import type { selectResponse } from "@/shared/types/global";

export const FormFields: FieldConfig<FormValues>[] = [
    {
      name: "bagType",
      label: "نوع کیسه",
      type: "async-select",
      asyncSelectProps: {
        url: "/core-api/bag/selectBagTypes",
        queryKey: ["selectBagTypes"],
      },
      important: true,

    },
    {
      name: "sourceHubId",
      label: "هاب مبدا",
      type: "async-select",
      asyncSelectProps: {
        url: "/core-api/hub/select",
        queryKey: ["sourceHubId"],
        // placeholder: "انتخاب هاب مبدا",
      },
      important: true,

    },
  
    {
      name: "destinationHubId",
      label: "هاب مقصد",
      type: "async-select",
      asyncSelectProps: {
        queryKey: ["destinationHubId"],
        getDynamicUrl: (sourceHubId: selectResponse) =>
          sourceHubId && `/core-api/hub/select?sourceId=${sourceHubId.id}`,
      },
      dependsOn: "sourceHubId",
      important: true,
    },
    {
      name: "consignmentsDestinationHubId",
      label: "هاب مقصد مرسوله",
      type: "async-select",
      asyncSelectProps: {
        url: "/core-api/hub/select",
        queryKey: ["consignmentsDestinationHubId"],
      },
      important: true,
    },
    {
      name: "ownerHubId",
      label: "مالک کیسه",
      type: "async-select",
      asyncSelectProps: {
        url: "/core-api/hub/select",
        queryKey: ["ownerHubId"],
      },
      important: true,
    },
    
    {
      name: "weightCapacity",
      label: "ظرفیت وزنی",
      type: "input",
      important: true,
    },
    {
      name: "volumeCapacity",
      label: "ظرفیت حجمی",
      type: "input",
      inputProps: { placeholder: "" },
      important: true,
    },
  ];


  export const FormDefaultValues = {
    weightCapacity: "10",
  };
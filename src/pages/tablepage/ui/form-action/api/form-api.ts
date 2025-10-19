import api from "@/shared/lib/apiClient";
import type { FormValues } from "../model/form-types";

export const submitForm = async (data: FormValues) => {

  console.log(data)
  const finalData = {
    ...data,
    isActive: true,
    consignmentsDestinationHubId: data.consignmentsDestinationHubId?.id,
    destinationHubId: data.destinationHubId?.id,
    ownerHubId: data.ownerHubId?.id,
    sourceHubId: data.sourceHubId?.id,
  };
  const response = await api.post("/core-api/bags", finalData);
  return response.data;
};




export const deleteBag = async (bagId: number): Promise<void> => {
  const response = await fetch(`/api/bags/${bagId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("خطا در حذف کیسه");
  }
}
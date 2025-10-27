import api from "@/shared/lib/apiClient";
import type { FormValues } from "../model/form/form-types";


export const submitForm = async (data: FormValues): Promise<any> => {
  const response = data.id
    ? await api.put("/core-api/product", data)
    : await api.post("/core-api/product", data);
  return response.data;
};

export const deleteBag = async (productId: number): Promise<void> => {
  await api.delete(`/core-api/product/${productId}`, {
    method: "DELETE",
  });
};

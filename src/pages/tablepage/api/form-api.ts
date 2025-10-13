import api from "@/shared/lib/apiClient";
import type { FormValues } from "../model/form-types";

export const submitForm = async (data: FormValues) => {
  console.log(data)

  const response = await api.post("/core-api/bags", data);
  return response.data;
};

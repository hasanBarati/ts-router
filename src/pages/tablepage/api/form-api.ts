import api from "@/shared/lib/apiClient";
import type { FormValues } from "../model/form-types";

export const submitForm = async (data: FormValues) => {
  const response = await api.post("/core-api/bag", data);
  return response.data;
};

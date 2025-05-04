import api from "@/shared/lib/apiClient";

export type User = {
  id: number;
  name: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  return await api
    .post("/resource-api/permission/fetchPermissionsByUserName", {})
    .then((res) => res.data);
};

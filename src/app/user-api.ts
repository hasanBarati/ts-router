import api from "@/shared/lib/apiClient";

export type User = {
  isSuperAdmin: boolean;
  perms: string[];
  permissionArray: { permission: string[] }[];
  hublist: [];
};

export const fetchUsers = async (): Promise<User> => {
  return await api
    .post("/resource-api/permission/fetchPermissionsByUserName", {})
    .then((res) => res.data);
};

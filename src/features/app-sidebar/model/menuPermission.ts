import { useUserStore } from "@/app/user-store";

export function hasPermissionMenu(permission: string): boolean {
  const { userInfo } = useUserStore.getState();
  console.log("userInfo is",userInfo)
  if (!userInfo) return false;
  const { isSuperAdmin, permissionArray } = userInfo;
  // if (isSuperAdmin) return true;
  if (!permissionArray) return false;
  return permissionArray.some((item) => item.permission.includes(permission));
}



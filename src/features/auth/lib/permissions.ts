
import { useUserStore } from "@/app/user-store";

export function hasPermission(permission: string) {
  const { userInfo } = useUserStore.getState();
  if (!userInfo) return false;
  const { isSuperAdmin, perms } = userInfo;
  if (isSuperAdmin) return true;
  return perms.includes(permission);
}


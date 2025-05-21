
import { useUserStore } from "@/app/user-store";
import type { PermissionNode } from "../model/types";

export function hasPermission(permission: string) {
  const { userInfo } = useUserStore.getState();
  if (!userInfo) return false;

  const { isSuperAdmin, perms } = userInfo;
  if (isSuperAdmin) return true;
  return perms.includes(permission);
}

export function hasPermissionParent(permission: string) {
  const { userInfo } = useUserStore.getState();
  if (!userInfo) return false;

  const { isSuperAdmin, perms } = userInfo;
  if (isSuperAdmin) return true;

  const checkPermission = (nodes: PermissionNode[]): boolean => {
    return nodes.some((node) => {
      if (node.value === permission) return true;
      if (node.children && node.children.length > 0) {
        return checkPermission(node.children);
      }
      return false;
    });
  };
  return perms.some((userPerm) => checkPermission([userPerm]));
}

export type PermissionNode = {
  value: string;
  name: string;
  label: string;
  children: PermissionNode[];
  parent: string | null;
  type: string | null;
  menuParent: string | null;
};

export type UserInfo = {
  isSuperAdmin: boolean;
  perms: PermissionNode[];
};

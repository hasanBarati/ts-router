// @/features/sidebar/config/menuItems.ts

import { routesConfig, type RouteConfig } from "@/shared/config/route-config";
import type { JSX } from "react";

export interface MenuItem {
  title: string;
  url?: string;
  icon: JSX.Element;
  permission: string;
  code?: string;
  subItems?: MenuItem[];
}

// ✅ تبدیل خودکار config به menu items
function routeConfigToMenuItem(config: RouteConfig): MenuItem {
  return {
    title: config.title,
    url: config.path,
    icon: config.icon,
    permission: config.permission,
    code: config.code,
    subItems: config.children?.map(routeConfigToMenuItem),
  };
}

export const menuItems: MenuItem[] = routesConfig.map(routeConfigToMenuItem);


import { useMatches } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
  title: string;
  href: string;
  icon?: ReactNode;
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const matches = useMatches();
  const breadcrumbs: BreadcrumbItem[] = [];

  matches.forEach((match) => {
    const breadcrumbData = (match.staticData as { breadcrumb?: any })?.breadcrumb;
    if (breadcrumbData) {
      if (breadcrumbData.parentBreadcrumb) {
        breadcrumbs.push({
          title: breadcrumbData.parentBreadcrumb.title,
          href: breadcrumbData.parentBreadcrumb.href,
          icon: breadcrumbData.parentBreadcrumb.icon,
        });
      }
      breadcrumbs.push({
        title: breadcrumbData.title,
        href: match.pathname,
        icon: breadcrumbData.icon,
      });
    }
  });

  return breadcrumbs;
}

// src/shared/hooks/use-breadcrumb.ts
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
    const breadcrumbData = match.staticData?.breadcrumb;

    if (breadcrumbData) {
      // ✅ اگه parent داره، اول parent رو اضافه کن
      if (breadcrumbData.parentBreadcrumb) {
        breadcrumbs.push({
          title: breadcrumbData.parentBreadcrumb.title,
          href: breadcrumbData.parentBreadcrumb.href,
          icon: breadcrumbData.parentBreadcrumb.icon,
        });
      }

      // ✅ بعد خود صفحه رو اضافه کن
      breadcrumbs.push({
        title: breadcrumbData.title,
        href: match.pathname,
        icon: breadcrumbData.icon,
      });
    }
  });

  return breadcrumbs;
}

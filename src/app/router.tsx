// import { DashboardPage } from "@/pages/DashboardPage/ui/Page";
// import { UserFormPage } from "@/pages/UserFormPage/ui/Page";
import { dashboardRoute } from "@/pages/DashboardPage/route";
import { loginRoute } from "@/pages/login/route";
import { tableRoute } from "@/pages/tablepage/route";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { App } from "./App";
import { Layout } from "./layout";
import type { ReactNode } from "react";

// Create a root route
export const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  loginRoute,
  tableRoute,
]);

// Create the router instance
export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

export interface BreadcrumbMeta {
  title: string;
  icon?: ReactNode;
  parentBreadcrumb?: {
    title: string;
    href: string;
    icon?: ReactNode;
  };
}

// ✅ تعریف تایپ سفارشی برای Meta
export interface RouteMeta {
  breadcrumb?: BreadcrumbMeta;
}

// ✅ Extend کردن Register برای اضافه کردن meta type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  
  interface RouteMeta {
    breadcrumb?: BreadcrumbMeta;
  }
}
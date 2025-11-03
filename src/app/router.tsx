import { dashboardRoute } from "@/pages/DashboardPage/route";
import { loginRoute } from "@/pages/login/route";
import { tableRoute } from "@/pages/tablepage/route";
import {
  HeadContent,
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { App } from "./App";
import { Layout } from "./layout";
import type { ReactNode } from "react";
import { productDefineRoute } from "@/pages/service-managment/product-define/route";

export const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <HeadContent />
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
  productDefineRoute,
]);

export const router = createRouter({
  routeTree,

  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link to="/">Go home</Link>
      </div>
    );
  },
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

export interface RouteMeta {
  breadcrumb?: BreadcrumbMeta;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface RouteMeta {
    breadcrumb?: BreadcrumbMeta;
  }
}

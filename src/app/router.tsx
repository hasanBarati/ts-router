// import { DashboardPage } from "@/pages/DashboardPage/ui/Page";
// import { UserFormPage } from "@/pages/UserFormPage/ui/Page";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { App } from "./App";
import { DashboardPage } from "@/pages/DashboardPage/ui/Page";
import { UserFormPage } from "@/pages/UserFormPage/ui/Page";
import { loadUsers } from "@/pages/DashboardPage/model/loader";

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// Create index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

// Create dashboard route
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  loader: loadUsers,
  staleTime: 1000 * 60, // کش 1 دقیقه
});

// Create form route
const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form",
  component: UserFormPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  formRoute,
]);

// Create the router instance
export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


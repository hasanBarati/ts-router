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
import { fetchUsers } from "./tableAPI";
import { useUserStore } from "./user-store";

// Create a root route
export const rootRoute = createRootRoute({
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
  pendingComponent: () => <>در حال لود شدن </>,
  loader: async () => {
    const user = await fetchUsers();
    useUserStore.getState().setUserInfo(user);
    return user;
  },
});

// Create the route tree
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

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

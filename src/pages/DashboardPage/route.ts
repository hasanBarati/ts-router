import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router";
import { DashboardPage } from "./ui/Page";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  // loader: loadUsers,
  staleTime: 1000 * 60,
});

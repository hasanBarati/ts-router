import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router";
import { TablePage } from "./ui/Page";
import { loadUsers } from "./model/loader";




export const tableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/table",
  component: TablePage,
  loader: loadUsers,
  staleTime: 1000 * 60,
});

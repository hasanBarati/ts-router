import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router";
import Login from "./ui/page";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
  staleTime: 1000 * 60,
});

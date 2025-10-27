import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router";
import { ProductDefine } from "./ui/Page";

export const productDefineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/service-management/product",
  component: ProductDefine,
  staleTime: 1000 * 60,
  head: () => ({
    meta: [
      {
        title: " تعریف محصول",
      },
      {
        name: "description",
        content: "مدیریت و تعریف محصولات سیستم",
      },
    ],
  }),
  staticData: {
    breadcrumb: {
      title: "تعریف محصول",
      parentBreadcrumb: {
        title: "مدیریت سرویس ها",
      },
    },
  },
});

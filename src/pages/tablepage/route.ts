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
  
  staticData: {
    breadcrumb: {
      title: "جدول سفارشات",
      // icon: <Table className="h-4 w-4" />,
      parentBreadcrumb: {
        title: "سفارشات",
        // href: "/orders", // ✅ لینک به صفحه سفارشات (اگه وجود داره)
        // icon: <ShoppingCart className="h-4 w-4" />,
      },
    },
  },
});
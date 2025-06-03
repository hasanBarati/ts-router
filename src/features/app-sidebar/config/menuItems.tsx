import { Home, Inbox } from "lucide-react";

export type MenuItem = {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  permission?: string;
  subItems?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    title: "داشبورد",
    url: "/",
    icon: <Home className="w-5 h-5" />,
    permission: "view_MDL_management",
  },
  {
    title: "مدیریت هاب",
    icon: <Inbox className="w-5 h-5" />,
    permission: "view_overviewp",
    subItems: [
      {
        title: "هاب",
        url: "/table",
        permission: "view_trips",
      },
      {
        title: "تعریف محدوده عملیاتی",
        url: "#categories",
        permission: "view_bags",
      },
    ],
  },
];

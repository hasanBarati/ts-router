import { 
  LayoutDashboard, 
  Network, 
  ShoppingCart,
  Mail,
  Users,
  Truck,
  Briefcase,
  Inbox,
  Clock,
  UserSearch,
  Package,
  Settings,
  FileText,
  GitBranch
} from "lucide-react";
import type { JSX } from "react";

export interface MenuItem {
  title: string;
  url?: string;
  icon: JSX.Element;
  permission: string;
  code?: string;
  subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  // Dashboard
  {
    title: "داشبورد",
    url: "/",
    icon: <LayoutDashboard size={20} />,
    permission: "Dashboard",
    code: "",
  },

  // Hub Management
  {
    title: "مدیریت هاب",
    icon: <Network size={20} />,
    permission: "view_hub_management",
    code: "Hub Manegment",
    subItems: [
      {
        title: "هاب",
        url: "/hub",
        icon: <Network size={20} />,
        permission: "view_hub",
        code: "1001",
      },
      {
        title: "تعریف محدوده عملیاتی",
        url: "/basic-information/map-zone",
        icon: <Network size={20} />,
        permission: "view_map_zone",
        code: "100103",
      },
      {
        title: "تعیین مناطق توزیع  / جمع آوری",
        url: "/basic-information/map-zone-operation",
        icon: <Network size={20} />,
        permission: "view_zone operation",
        code: "100104",
      },
      {
        title: "برنامه ریزی",
        url: "/planing",
        icon: <Network size={20} />,
        permission: "view_planning",
        code: "100105",
      },
      {
        title: "تخصیص مرسوله",
        url: "/unplaned-consignments",
        icon: <Network size={20} />,
        permission: "view_assign_consignment_to_plan",
        code: "",
      },
      {
        title: "تسویه اعتبار هاب",
        url: "/settlement-credit",
        icon: <Network size={20} />,
        permission: "paycredit",
        code: "",
      },
      {
        title: "تخصیص اعتبار",
        url: "/credit-allocate",
        icon: <Network size={20} />,
        permission: "credit",
        code: "",
      },
      {
        title: "مدیریت پرداخت",
        url: "/payment-management",
        icon: <Network size={20} />,
        permission: "view_pay_management",
        code: "",
      },
      {
        title: "تایید فیش",
        url: "/accept-fish",
        icon: <Network size={20} />,
        permission: "bank_receipt_confirm",
        code: "",
      },
      {
        title: "حق السهم",
        url: "/sharePercent",
        icon: <Network size={20} />,
        permission: "",
        code: "",
      },
      {
        title: "مدیریت پرداخت مرسولات پستی",
        url: "/post-payment-management",
        icon: <Network size={20} />,
        permission: "",
        code: "",
      },
    ],
  },

  // Order Management
  {
    title: " مدیریت سفارشات",
    icon: <ShoppingCart size={20} />,
    permission: "view_order_management",
    code: "1031",
    subItems: [
      {
        title: " مدیریت سفارش",
        url: "/order-management",
        icon: <ShoppingCart size={20} />,
        permission: "view_order_management",
        code: "",
      },
      {
        title: "رسید دریافت ",
        url: "/order-receipt",
        icon: <ShoppingCart size={20} />,
        permission: "receipt",
        code: "",
      },
      {
        title: "دریافت مرسوله های حضوری ",
        url: "/order-in-person",
        icon: <ShoppingCart size={20} />,
        permission: "inperson_Recieve_consignment",
        code: "",
      },
      {
        title: "سفارشات درون سازمانی ",
        url: "/internal-order",
        icon: <ShoppingCart size={20} />,
        permission: "view_inner_order",
        code: "",
      },
    ],
  },

  // Consignment Management
  {
    title: "مدیریت مرسوله",
    icon: <Mail size={20} />,
    permission: "view_consignments _management",
    code: "",
    subItems: [
      {
        title: "مدیریت مرسوله",
        url: "/consignment-manage",
        icon: <Mail size={20} />,
        permission: "view_consignment_management",
        code: "",
      },
      {
        title: "درخواست چاپ برچسب",
        url: "/label-print-request",
        icon: <Mail size={20} />,
        permission: "view_request_label_print_request",
        code: "",
      },
      {
        title: "تخصیص برچسب",
        url: "/label-allocate",
        icon: <Mail size={20} />,
        permission: "view_assign_label",
        code: "",
      },
      {
        title: "مدیریت بارکد",
        url: "/barcode",
        icon: <Mail size={20} />,
        permission: "view_label_management",
        code: "",
      },
      {
        title: "تسویه حساب",
        url: "/settlement",
        icon: <Mail size={20} />,
        permission: "view_settlement",
        code: "",
      },
      {
        title: "مرسولات  برگشتی",
        url: "/return-consignment",
        icon: <Mail size={20} />,
        permission: "view_return_consignment",
        code: "",
      },
      {
        title: "تطبیق بارکد پستی",
        url: "/post-barcode-matching",
        icon: <Mail size={20} />,
        permission: "assignPostbarcde",
        code: "assignPostbarcde",
      },
    ],
  },

  // Employee Management
  {
    title: "مدیریت پرسنل",
    icon: <Users size={20} />,
    permission: "view_employee_management",
    code: "",
    subItems: [
      {
        title: "پرسنل",
        url: "/personnel",
        icon: <Users size={20} />,
        permission: "view_employee",
        code: "1002",
      },
      {
        title: "پرسنل خارج از سازمان",
        url: "/freelancer",
        icon: <Users size={20} />,
        permission: "freeLanser_personel",
        code: "",
      },
    ],
  },

  // FLM Management
  {
    title: "FLM Management",
    icon: <Truck size={20} />,
    permission: "view_flm_management",
    code: "",
    subItems: [
      {
        title: "مدیریت جمع‌آوری",
        url: "/collect-management",
        icon: <Truck size={20} />,
        permission: "view_collect_management",
        code: "",
      },
      {
        title: "مدیریت تحویل",
        url: "/delivery-management",
        icon: <Truck size={20} />,
        permission: "view_delivery_management",
        code: "",
      },
      {
        title: "مدیریت سفر",
        url: "/trip-management",
        icon: <Truck size={20} />,
        permission: "view_trip_management",
        code: "",
      },
    ],
  },

  // MDL Management
  {
    title: "MDL Management",
    icon: <Briefcase size={20} />,
    permission: "MDL",
    code: "",
    subItems: [
      {
        title: "نگاه اجمالی",
        url: "/overview",
        icon: <Briefcase size={20} />,
        permission: "view_overview",
        code: "1",
      },
      {
        title: "سفرها",
        url: "/trips",
        icon: <Briefcase size={20} />,
        permission: "view_trips",
        code: "2",
      },
      {
        title: "کیسه ها",
        url: "/bags",
        icon: <Briefcase size={20} />,
        permission: "view_bags",
        code: "1030",
      },
    ],
  },

  // CRM Management
  {
    title: "CRM Management",
    icon: <Inbox size={20} />,
    permission: "view_crm_consignments_management",
    code: "",
    subItems: [
      {
        title: "گروه بندی مشتریان",
        url: "/CRM-managment/consignment",
        icon: <Inbox size={20} />,
        permission: "view_customer_group",
        code: "",
      },
      {
        title: "کانال فروش",
        url: "/CRM-managment/salesChannel",
        icon: <Inbox size={20} />,
        permission: "view_sales_channel",
        code: "",
      },
      {
        title: "اصلاح آدرس ",
        url: "/CRM-managment/address-correction",
        icon: <Inbox size={20} />,
        permission: "view_edite_address",
        code: "",
      },
      {
        title: "مدیریت مرسوله",
        url: "/crm-consignment-manage",
        icon: <Inbox size={20} />,
        permission: "view_crm_consignments_management",
        code: "",
      },
    ],
  },

  // TRM Management
  {
    title: "TRM Management",
    icon: <Clock size={20} />,
    permission: "view_TRM_management",
    code: "",
    subItems: [
      {
        title: "مدیریت نقلیه",
        url: "/vehicle-management",
        icon: <Clock size={20} />,
        permission: "view_vehicle_management",
        code: "",
      },
      {
        title: "مدیریت رانندگان",
        url: "/driver-management",
        icon: <Clock size={20} />,
        permission: "view_driver_management",
        code: "",
      },
      {
        title: "مدیریت شیفت",
        url: "/time-shift-manage",
        icon: <Clock size={20} />,
        permission: "view_shift_mnagement",
        code: "",
      },
      {
        title: "جزئیات  شیفت",
        url: "/shift-detail-manage",
        icon: <Clock size={20} />,
        permission: "",
        code: "",
      },
      {
        title: "جابجایی وسیله نقلیه",
        url: "/Move-vehicle",
        icon: <Clock size={20} />,
        permission: "view_vehicle_transfer",
        code: "",
      },
      {
        title: "تعویض راننده",
        url: "/change-driver",
        icon: <Clock size={20} />,
        permission: "",
        code: "",
      },
    ],
  },

  // Roles
  {
    title: "مدیریت نقش ها",
    icon: <UserSearch size={20} />,
    permission: "view_role",
    code: "1003",
    subItems: [
      {
        title: "نقش",
        url: "/roles",
        icon: <UserSearch size={20} />,
        permission: "view_role_management",
        code: "1003",
      },
    ],
  },

  // Service Management
  {
    title: "مدیریت سرویس",
    icon: <Package size={20} />,
    permission: "view_service_management",
    code: "",
    subItems: [
      {
        title: "تعریف محصول",
        url: "/service-information/product",
        icon: <Package size={20} />,
        permission: "view_product_def",
        code: "1004",
      },
      {
        title: "تعریف مشخصات محصول",
        url: "/service-information/product-info",
        icon: <Package size={20} />,
        permission: "view_product_attribute",
        code: "",
      },
      {
        title: "تعریف سرویس",
        url: "/service-information/service-definition",
        icon: <Package size={20} />,
        permission: "view_service_def",
        code: "1005",
      },
      {
        title: "ارائه سرویس",
        url: "/basic-information/service-provision",
        icon: <Package size={20} />,
        permission: "view_serice_delivery",
        code: "1006",
      },
      {
        title: "نرخ نامه",
        url: "/service-information/price",
        icon: <Package size={20} />,
        permission: "view_pricelist",
        code: "",
      },
    ],
  },

  // Basic Information
  {
    title: "مدیریت اطلاعات پایه",
    icon: <Settings size={20} />,
    permission: "view_base_information_management",
    code: "",
    subItems: [
      {
        title: "اشخاص حقیقی/حقوقی",
        url: "/basic-information/thirdparty",
        icon: <Settings size={20} />,
        permission: "view_thirdparty",
        code: "1007",
      },
      {
        title: "حمل و نقل",
        url: "/basic-information/transportation",
        icon: <Settings size={20} />,
        permission: "view_transport",
        code: "1008",
      },
      {
        title: "وسایل نقلیه اجاره‌ای",
        url: "/basic-information/ADMVehicle",
        icon: <Settings size={20} />,
        permission: "view_ADM_vehicle",
        code: "1009",
      },
      {
        title: "مدیریت مشتریان",
        url: "/basic-information/customer-management",
        icon: <Settings size={20} />,
        permission: "view_customer_management",
        code: "1010",
      },
      {
        title: "گروه بندی محصولات",
        url: "/basic-information/product-group",
        icon: <Settings size={20} />,
        permission: "view_product_group",
        code: "",
      },
      {
        title: "تعریف مدت ارائه خدمت",
        url: "/basic-information/service-time",
        icon: <Settings size={20} />,
        permission: "view_time_commitment",
        code: "1012",
      },
      {
        title: "رده جغرافیایی سفارشی",
        url: "/basic-information/custom-geographic-category",
        icon: <Settings size={20} />,
        permission: "view_custom devision",
        code: "1013",
      },
      {
        title: "تعریف ترمینال",
        url: "/basic-information/define-terminal",
        icon: <Settings size={20} />,
        permission: "terminalDefenition",
        code: "",
      },
      {
        title: "قالب پرینت",
        url: "/basic-information/print-template",
        icon: <Settings size={20} />,
        permission: "",
        code: "",
      },
    ],
  },

  // Rule Engine
  {
    title: "RullEngine",
    icon: <FileText size={20} />,
    permission: "view_rule_engine",
    code: "",
    subItems: [
      {
        title: "رول انجین ها",
        url: "/RullEngine",
        icon: <FileText size={20} />,
        permission: "view_rule_engine",
        code: "",
      },
    ],
  },

  // Contradiction
  {
    title: "contradiction",
    icon: <GitBranch size={20} />,
    permission: "view_contradiction",
    code: "",
    subItems: [
      {
        title: "مغایرت گیری",
        url: "/contradiction",
        icon: <GitBranch size={20} />,
        permission: "view_contradiction",
        code: "",
      },
    ],
  },
];

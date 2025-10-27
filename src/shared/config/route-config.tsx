// @/shared/config/routes.config.ts

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

export interface RouteConfig {
  path: string;
  title: string;
  icon: JSX.Element;
  permission: string;
  code?: string;
  component?: string; // نام کامپوننت (برای lazy load)
  parentBreadcrumb?: {
    title: string;
    href?: string;
  };
  children?: RouteConfig[];
}

export const routesConfig: RouteConfig[] = [
  // Dashboard
  {
    path: "/",
    title: "داشبورد",
    icon: <LayoutDashboard size={20} />,
    permission: "Dashboard",
    code: "",
    component: "App",
  },

  // Hub Management
  {
    path: "/hub-management",
    title: "مدیریت هاب",
    icon: <Network size={20} />,
    permission: "view_hub_management",
    code: "Hub Manegment",
    children: [
      {
        path: "/hub",
        title: "هاب",
        icon: <Network size={20} />,
        permission: "view_hub",
        code: "1001",
        component: "HubPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/basic-information/map-zone",
        title: "تعریف محدوده عملیاتی",
        icon: <Network size={20} />,
        permission: "view_map_zone",
        code: "100103",
        component: "MapZonePage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/basic-information/map-zone-operation",
        title: "تعیین مناطق توزیع  / جمع آوری",
        icon: <Network size={20} />,
        permission: "view_zone operation",
        code: "100104",
        component: "MapZoneOperationPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/planing",
        title: "برنامه ریزی",
        icon: <Network size={20} />,
        permission: "view_planning",
        code: "100105",
        component: "PlaningPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/unplaned-consignments",
        title: "تخصیص مرسوله",
        icon: <Network size={20} />,
        permission: "view_assign_consignment_to_plan",
        code: "",
        component: "UnplanedConsignmentsPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/settlement-credit",
        title: "تسویه اعتبار هاب",
        icon: <Network size={20} />,
        permission: "paycredit",
        code: "",
        component: "SettlementCreditPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/credit-allocate",
        title: "تخصیص اعتبار",
        icon: <Network size={20} />,
        permission: "credit",
        code: "",
        component: "CreditAllocatePage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/payment-management",
        title: "مدیریت پرداخت",
        icon: <Network size={20} />,
        permission: "view_pay_management",
        code: "",
        component: "PaymentManagementPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/accept-fish",
        title: "تایید فیش",
        icon: <Network size={20} />,
        permission: "bank_receipt_confirm",
        code: "",
        component: "AcceptFishPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/sharePercent",
        title: "حق السهم",
        icon: <Network size={20} />,
        permission: "",
        code: "",
        component: "SharePercentPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
      {
        path: "/post-payment-management",
        title: "مدیریت پرداخت مرسولات پستی",
        icon: <Network size={20} />,
        permission: "",
        code: "",
        component: "PostPaymentManagementPage",
        parentBreadcrumb: {
          title: "مدیریت هاب",
        },
      },
    ],
  },

  // Order Management
  {
    path: "/order-management",
    title: " مدیریت سفارشات",
    icon: <ShoppingCart size={20} />,
    permission: "view_order_management",
    code: "1031",
    children: [
      {
        path: "/order-management",
        title: " مدیریت سفارش",
        icon: <ShoppingCart size={20} />,
        permission: "view_order_management",
        code: "",
        component: "OrderManagementPage",
        parentBreadcrumb: {
          title: "مدیریت سفارشات",
        },
      },
      {
        path: "/order-receipt",
        title: "رسید دریافت ",
        icon: <ShoppingCart size={20} />,
        permission: "receipt",
        code: "",
        component: "OrderReceiptPage",
        parentBreadcrumb: {
          title: "مدیریت سفارشات",
        },
      },
      {
        path: "/order-in-person",
        title: "دریافت مرسوله های حضوری ",
        icon: <ShoppingCart size={20} />,
        permission: "inperson_Recieve_consignment",
        code: "",
        component: "OrderInPersonPage",
        parentBreadcrumb: {
          title: "مدیریت سفارشات",
        },
      },
      {
        path: "/internal-order",
        title: "سفارشات درون سازمانی ",
        icon: <ShoppingCart size={20} />,
        permission: "view_inner_order",
        code: "",
        component: "InternalOrderPage",
        parentBreadcrumb: {
          title: "مدیریت سفارشات",
        },
      },
    ],
  },

  // Consignment Management
  {
    path: "/consignment-management",
    title: "مدیریت مرسوله",
    icon: <Mail size={20} />,
    permission: "view_consignments _management",
    code: "",
    children: [
      {
        path: "/consignment-manage",
        title: "مدیریت مرسوله",
        icon: <Mail size={20} />,
        permission: "view_consignment_management",
        code: "",
        component: "ConsignmentManagePage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
      {
        path: "/label-print-request",
        title: "درخواست چاپ برچسب",
        icon: <Mail size={20} />,
        permission: "view_request_label_print_request",
        code: "",
        component: "LabelPrintRequestPage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
      {
        path: "/label-allocate",
        title: "تخصیص برچسب",
        icon: <Mail size={20} />,
        permission: "view_assign_label",
        code: "",
        component: "LabelAllocatePage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
      {
        path: "/barcode",
        title: "مدیریت بارکد",
        icon: <Mail size={20} />,
        permission: "view_label_management",
        code: "",
        component: "BarcodePage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
      {
        path: "/settlement",
        title: "تسویه حساب",
        icon: <Mail size={20} />,
        permission: "view_settlement",
        code: "",
        component: "SettlementPage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
      {
        path: "/return-consignment",
        title: "مرسولات  برگشتی",
        icon: <Mail size={20} />,
        permission: "view_return_consignment",
        code: "",
        component: "ReturnConsignmentPage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
      {
        path: "/post-barcode-matching",
        title: "تطبیق بارکد پستی",
        icon: <Mail size={20} />,
        permission: "assignPostbarcde",
        code: "assignPostbarcde",
        component: "PostBarcodeMatchingPage",
        parentBreadcrumb: {
          title: "مدیریت مرسوله",
        },
      },
    ],
  },

  // Employee Management
  {
    path: "/employee-management",
    title: "مدیریت پرسنل",
    icon: <Users size={20} />,
    permission: "view_employee_management",
    code: "",
    children: [
      {
        path: "/personnel",
        title: "پرسنل",
        icon: <Users size={20} />,
        permission: "view_employee",
        code: "1002",
        component: "PersonnelPage",
        parentBreadcrumb: {
          title: "مدیریت پرسنل",
        },
      },
      {
        path: "/freelancer",
        title: "پرسنل خارج از سازمان",
        icon: <Users size={20} />,
        permission: "freeLanser_personel",
        code: "",
        component: "FreelancerPage",
        parentBreadcrumb: {
          title: "مدیریت پرسنل",
        },
      },
    ],
  },

  // FLM Management
  {
    path: "/flm-management",
    title: "FLM Management",
    icon: <Truck size={20} />,
    permission: "view_flm_management",
    code: "",
    children: [
      {
        path: "/collect-management",
        title: "مدیریت جمع‌آوری",
        icon: <Truck size={20} />,
        permission: "view_collect_management",
        code: "",
        component: "CollectManagementPage",
        parentBreadcrumb: {
          title: "FLM Management",
        },
      },
      {
        path: "/delivery-management",
        title: "مدیریت تحویل",
        icon: <Truck size={20} />,
        permission: "view_delivery_management",
        code: "",
        component: "DeliveryManagementPage",
        parentBreadcrumb: {
          title: "FLM Management",
        },
      },
      {
        path: "/trip-management",
        title: "مدیریت سفر",
        icon: <Truck size={20} />,
        permission: "view_trip_management",
        code: "",
        component: "TripManagementPage",
        parentBreadcrumb: {
          title: "FLM Management",
        },
      },
    ],
  },

  // MDL Management
  {
    path: "/mdl-management",
    title: "MDL Management",
    icon: <Briefcase size={20} />,
    permission: "MDL",
    code: "",
    children: [
      {
        path: "/overview",
        title: "نگاه اجمالی",
        icon: <Briefcase size={20} />,
        permission: "view_overview",
        code: "1",
        component: "OverviewPage",
        parentBreadcrumb: {
          title: "MDL Management",
        },
      },
      {
        path: "/trips",
        title: "سفرها",
        icon: <Briefcase size={20} />,
        permission: "view_trips",
        code: "2",
        component: "TripsPage",
        parentBreadcrumb: {
          title: "MDL Management",
        },
      },
      {
        path: "/bags",
        title: "کیسه ها",
        icon: <Briefcase size={20} />,
        permission: "view_bags",
        code: "1030",
        component: "TablePage",
        parentBreadcrumb: {
          title: "MDL Management",
        },
      },
    ],
  },

  // CRM Management
  {
    path: "/crm-management",
    title: "CRM Management",
    icon: <Inbox size={20} />,
    permission: "view_crm_consignments_management",
    code: "",
    children: [
      {
        path: "/CRM-managment/consignment",
        title: "گروه بندی مشتریان",
        icon: <Inbox size={20} />,
        permission: "view_customer_group",
        code: "",
        component: "CRMConsignmentPage",
        parentBreadcrumb: {
          title: "CRM Management",
        },
      },
      {
        path: "/CRM-managment/salesChannel",
        title: "کانال فروش",
        icon: <Inbox size={20} />,
        permission: "view_sales_channel",
        code: "",
        component: "SalesChannelPage",
        parentBreadcrumb: {
          title: "CRM Management",
        },
      },
      {
        path: "/CRM-managment/address-correction",
        title: "اصلاح آدرس ",
        icon: <Inbox size={20} />,
        permission: "view_edite_address",
        code: "",
        component: "AddressCorrectionPage",
        parentBreadcrumb: {
          title: "CRM Management",
        },
      },
      {
        path: "/crm-consignment-manage",
        title: "مدیریت مرسوله",
        icon: <Inbox size={20} />,
        permission: "view_crm_consignments_management",
        code: "",
        component: "CRMConsignmentManagePage",
        parentBreadcrumb: {
          title: "CRM Management",
        },
      },
    ],
  },

  // TRM Management
  {
    path: "/trm-management",
    title: "TRM Management",
    icon: <Clock size={20} />,
    permission: "view_TRM_management",
    code: "",
    children: [
      {
        path: "/vehicle-management",
        title: "مدیریت نقلیه",
        icon: <Clock size={20} />,
        permission: "view_vehicle_management",
        code: "",
        component: "VehicleManagementPage",
        parentBreadcrumb: {
          title: "TRM Management",
        },
      },
      {
        path: "/driver-management",
        title: "مدیریت رانندگان",
        icon: <Clock size={20} />,
        permission: "view_driver_management",
        code: "",
        component: "DriverManagementPage",
        parentBreadcrumb: {
          title: "TRM Management",
        },
      },
      {
        path: "/time-shift-manage",
        title: "مدیریت شیفت",
        icon: <Clock size={20} />,
        permission: "view_shift_mnagement",
        code: "",
        component: "TimeShiftManagePage",
        parentBreadcrumb: {
          title: "TRM Management",
        },
      },
      {
        path: "/shift-detail-manage",
        title: "جزئیات  شیفت",
        icon: <Clock size={20} />,
        permission: "",
        code: "",
        component: "ShiftDetailManagePage",
        parentBreadcrumb: {
          title: "TRM Management",
        },
      },
      {
        path: "/Move-vehicle",
        title: "جابجایی وسیله نقلیه",
        icon: <Clock size={20} />,
        permission: "view_vehicle_transfer",
        code: "",
        component: "MoveVehiclePage",
        parentBreadcrumb: {
          title: "TRM Management",
        },
      },
      {
        path: "/change-driver",
        title: "تعویض راننده",
        icon: <Clock size={20} />,
        permission: "",
        code: "",
        component: "ChangeDriverPage",
        parentBreadcrumb: {
          title: "TRM Management",
        },
      },
    ],
  },

  // Roles
  {
    path: "/roles-management",
    title: "مدیریت نقش ها",
    icon: <UserSearch size={20} />,
    permission: "view_role",
    code: "1003",
    children: [
      {
        path: "/roles",
        title: "نقش",
        icon: <UserSearch size={20} />,
        permission: "view_role_management",
        code: "1003",
        component: "RolesPage",
        parentBreadcrumb: {
          title: "مدیریت نقش ها",
        },
      },
    ],
  },

  // Service Management
  {
    path: "/service-management",
    title: "مدیریت سرویس",
    icon: <Package size={20} />,
    permission: "view_service_management",
    children: [
      {
        path: "/service-management/product",
        title: "تعریف محصول",
        icon: <Package size={20} />,
        permission: "view_product_def",
        component: "ProductDefine",
        parentBreadcrumb: {
          title: "مدیریت سرویس ها",
        },
      },
      {
        path: "/service-information/product-info",
        title: "تعریف مشخصات محصول",
        icon: <Package size={20} />,
        permission: "view_product_attribute",
        code: "",
        component: "ProductInfoPage",
        parentBreadcrumb: {
          title: "مدیریت سرویس ها",
        },
      },
      {
        path: "/service-information/service-definition",
        title: "تعریف سرویس",
        icon: <Package size={20} />,
        permission: "view_service_def",
        code: "1005",
        component: "ServiceDefinitionPage",
        parentBreadcrumb: {
          title: "مدیریت سرویس ها",
        },
      },
      {
        path: "/basic-information/service-provision",
        title: "ارائه سرویس",
        icon: <Package size={20} />,
        permission: "view_serice_delivery",
        code: "1006",
        component: "ServiceProvisionPage",
        parentBreadcrumb: {
          title: "مدیریت سرویس ها",
        },
      },
      {
        path: "/service-information/price",
        title: "نرخ نامه",
        icon: <Package size={20} />,
        permission: "view_pricelist",
        code: "",
        component: "PricePage",
        parentBreadcrumb: {
          title: "مدیریت سرویس ها",
        },
      },
    ],
  },

  // Basic Information
  {
    path: "/basic-information",
    title: "مدیریت اطلاعات پایه",
    icon: <Settings size={20} />,
    permission: "view_base_information_management",
    code: "",
    children: [
      {
        path: "/basic-information/thirdparty",
        title: "اشخاص حقیقی/حقوقی",
        icon: <Settings size={20} />,
        permission: "view_thirdparty",
        code: "1007",
        component: "ThirdpartyPage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/transportation",
        title: "حمل و نقل",
        icon: <Settings size={20} />,
        permission: "view_transport",
        code: "1008",
        component: "TransportationPage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/ADMVehicle",
        title: "وسایل نقلیه اجاره‌ای",
        icon: <Settings size={20} />,
        permission: "view_ADM_vehicle",
        code: "1009",
        component: "ADMVehiclePage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/customer-management",
        title: "مدیریت مشتریان",
        icon: <Settings size={20} />,
        permission: "view_customer_management",
        code: "1010",
        component: "CustomerManagementPage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/product-group",
        title: "گروه بندی محصولات",
        icon: <Settings size={20} />,
        permission: "view_product_group",
        code: "",
        component: "ProductGroupPage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/service-time",
        title: "تعریف مدت ارائه خدمت",
        icon: <Settings size={20} />,
        permission: "view_time_commitment",
        code: "1012",
        component: "ServiceTimePage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/custom-geographic-category",
        title: "رده جغرافیایی سفارشی",
        icon: <Settings size={20} />,
        permission: "view_custom devision",
        code: "1013",
        component: "CustomGeographicCategoryPage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/define-terminal",
        title: "تعریف ترمینال",
        icon: <Settings size={20} />,
        permission: "terminalDefenition",
        code: "",
        component: "DefineTerminalPage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
      {
        path: "/basic-information/print-template",
        title: "قالب پرینت",
        icon: <Settings size={20} />,
        permission: "",
        code: "",
        component: "PrintTemplatePage",
        parentBreadcrumb: {
          title: "مدیریت اطلاعات پایه",
        },
      },
    ],
  },

  // Rule Engine
  {
    path: "/rule-engine",
    title: "RullEngine",
    icon: <FileText size={20} />,
    permission: "view_rule_engine",
    code: "",
    children: [
      {
        path: "/RullEngine",
        title: "رول انجین ها",
        icon: <FileText size={20} />,
        permission: "view_rule_engine",
        code: "",
        component: "RuleEnginePage",
        parentBreadcrumb: {
          title: "RullEngine",
        },
      },
    ],
  },

  // Contradiction
  {
    path: "/contradiction-management",
    title: "contradiction",
    icon: <GitBranch size={20} />,
    permission: "view_contradiction",
    code: "",
    children: [
      {
        path: "/contradiction",
        title: "مغایرت گیری",
        icon: <GitBranch size={20} />,
        permission: "view_contradiction",
        code: "",
        component: "ContradictionPage",
        parentBreadcrumb: {
          title: "contradiction",
        },
      },
    ],
  },
];

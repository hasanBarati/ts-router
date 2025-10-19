/**
 * ✅ ساختار دریافتی از API
 */
export interface ApiCustomizeResponse {
    userId: number;
    customize: string; // JSON stringified
  }
  
  /**
   * ✅ ساختار داخل customize string
   */
  export interface ApiCustomizeData {
    [tableKey: string]: {
      grid?: ApiGridColumn[];
      statusbar?: ApiStatusbarItem[];
      filters?: ApiFilter[];
    };
  }
  
  export interface ApiGridColumn {
    id: string;
    text: string;
    model: {
      active: boolean;
    };
    _id: string;
  }
  
  export interface ApiStatusbarItem {
    id: number | string;
    text: string;
    model: {
      active: boolean;
    };
    _id: number | string;
  }
  
  export interface ApiFilter {
    id: string;
    text: string;
    model: {
      type: "fixed" | "advanced"; // fixed = اصلی، advanced = پیشرفته
    };
    _id: string;
  }
  
  /**
   * ✅ Body برای ذخیره
   */
  export interface SaveCustomizePayload {
    userId: number;
    customize: string; // JSON stringified
  }
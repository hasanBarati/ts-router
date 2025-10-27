// src/features/orders/model/types.ts

import type { selectResponse } from "@/shared/types/global";




  export interface ProductDefineFilters {
    code?: string | null;
    name?: string | null;
    productGroup?: selectResponse | null;
    isActive?:boolean
  
  }
  

  
  export interface Product {
    id?: number;
    code: string;
    name: string;
    description: string;
    productGroup: selectResponse ;
    attribute: [];
    isActive: boolean;
   
  }
  
  
  export interface DataResponse<T> {
    content: T[];
    pageable: {
      sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
      };
      pageSize: number;
      pageNumber: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    first: boolean;
    empty: boolean;
  }
  
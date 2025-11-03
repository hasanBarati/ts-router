// src/features/orders/model/useOrderFilter.ts
import api from "@/shared/lib/apiClient";
import type { DataResponse } from "@/shared/types/global";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Product, ProductDefineFilters } from "../../model/table/table-types";


export const useProductFilter = (
  filters: ProductDefineFilters,
  pagination: { pageNumber: number; pageSize: number }
): UseQueryResult<DataResponse<Product>, Error> => {
  // const { userInfo } = useUserStore.getState();

  return useQuery({
    queryKey: ["product-define", filters, pagination],
    queryFn: async () => {
      const response = await api.post(
        `/core-api/product/filter?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
        {
          ...filters,
          productGroup:filters.productGroup?.id,
          // hublist: userInfo?.hublist || [],
        }
      );
      return response.data.payload as DataResponse<Product>;
    },
    // placeholderData: (previousData) => previousData
  });
};

// src/features/orders/model/useOrderFilter.ts
import api from "@/shared/lib/apiClient";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Bag, BagFilters, DataResponse } from "./types";
import { useUserStore } from "@/app/user-store";

export const useOrderFilter = (
  filters: BagFilters,
  pagination: { pageNumber: number; pageSize: number }
): UseQueryResult<DataResponse<Bag>, Error> => {
  const { userInfo } = useUserStore.getState();

  return useQuery({
    queryKey: ["orders", filters, pagination],
    queryFn: async () => {
      const response = await api.post(
        `/core-api/bag/filter?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
        {
          ...filters,
          hublist: userInfo?.hublist || [],
        }
      );
      return response.data.payload as DataResponse<Bag>;
    },
    // placeholderData: (previousData) => previousData
  });
};

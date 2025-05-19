// src/features/orders/model/useOrderFilter.ts
import api from "@/shared/lib/apiClient";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DataResponse, Order, OrderFilters } from "./types";

export const useOrderFilter = (
  filters: OrderFilters,
  pagination: { pageNumber: number; pageSize: number }
): UseQueryResult<DataResponse<Order>, Error> => {
  console.log("filters",filters)
  return useQuery({
    queryKey: ["orders", filters, pagination],
    queryFn: async () => {
      const response = await api.post(
        `/consignment-api/consignment/orederfilter?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
        filters
      );
      return response.data.payload as DataResponse<Order>;
    },
    // keepPreviousData: true,
  });
};

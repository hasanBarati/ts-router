import api from "@/shared/lib/apiClient";
import { useQuery } from "@tanstack/react-query";


const useOrderFilter = (filters, pagination) => {
    return useQuery({
      queryKey: ["orders", { filters, pagination }],
      queryFn: async () => {
        const response = await api.post(
          `/consignment-api/consignment/orederfilter?pageNumber=${pagination?.pageNumber || 1}&pageSize=${pagination?.pageSize || 10}`,
          filters
        );
        return response.data.payload.content;
      },
      keepPreviousData: true,
    });
  };

export default useOrderFilter;




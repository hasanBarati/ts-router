import api from "@/shared/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export function useGetCustomization() {
  return useQuery<string | undefined>({
    queryKey: ["customization"],
    queryFn: async () => {
      const response = await api.get<{ payload: { customize: string } }>(
        "/resource-api/customize/24"
      );
      return response.data.payload?.customize;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/lib/apiClient";
import type {
  CustomizableField,
  CustomizationApiRequest,
  TableColumn,
} from "../model/type";

export function useSaveCustomization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fields,
      columns,
    }: {
      fields: CustomizableField<any>[];
      columns: TableColumn[];
    }) => {
      const statusbar = fields
        .filter((f) => f.isVisible)
        .sort((a, b) => a.order - b.order)
        .map((f) => `${f.id}:${f.isInAdvanced ? "advanced" : "fixed"}`);

      const grid = columns
        .filter((c) => c.isVisible)
        .sort((a, b) => a.order - b.order)
        .map((c) => c.id);

      const payload: CustomizationApiRequest = {
        customize: JSON.stringify({ grid, statusbar }),
        userId: 24,
      };

      await api.post("/resource-api/customize", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customization"] });
    },
  });
}

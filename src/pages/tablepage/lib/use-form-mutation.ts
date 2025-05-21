import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitForm } from "../api/form-api";


export const useFormMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ذخیره شد");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("خطا در ذخیره اطلاعات");
      console.error(error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBag, submitForm } from "../../api/form-api";

export const useFormMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ذخیره شد");
      queryClient.invalidateQueries({ queryKey: ["product-define"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("خطا در ذخیره اطلاعات");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBag,
    onSuccess: () => {
      toast.success("محصول با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["product-define"] });
    },
    onError: (error) => {
      toast.error("خطا در حذف محصول");
      console.error(error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBag, submitForm } from "../api/form-api";

export const useFormMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ذخیره شد");
      queryClient.invalidateQueries({ queryKey: ["bags"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("خطا در ذخیره اطلاعات");
      console.error(error);
    },
  });
};



export const useDeleteBag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBag,
    onSuccess: () => {
      toast.success("کیسه با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["bags"] });
    },
    onError: (error) => {
      toast.error("خطا در حذف کیسه");
      console.error(error);
    },
  });
};
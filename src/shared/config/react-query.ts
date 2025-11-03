
import { QueryClient, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  messages?: Array<{
    code: string;
    message: string;
  }>;
}

const handleMutationError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  if (axiosError.response?.data?.messages && axiosError.response.data.messages.length > 0) {
    const messages = axiosError.response.data.messages;
    messages.forEach((msg) => {
      toast.error(msg.message);
    });
    return;
  }

  if (axiosError.response?.status) {
    switch (axiosError.response.status) {
      case 400:
        toast.error("درخواست نامعتبر است");
        break;
      case 401:
        toast.error("لطفاً دوباره وارد شوید");
        break;
      case 403:
        toast.error("شما دسترسی به این عملیات ندارید");
        break;
      case 404:
        toast.error("اطلاعات مورد نظر یافت نشد");
        break;
      case 409:
        toast.error("تداخل در اطلاعات");
        break;
      case 500:
        toast.error("خطای سرور، لطفاً بعداً تلاش کنید");
        break;
      default:
        toast.error("خطایی رخ داده است");
    }
    return;
  }

  if (axiosError.code === "ERR_NETWORK") {
    toast.error("خطای ارتباط با سرور");
    return;
  }

  if (axiosError.code === "ECONNABORTED") {
    toast.error("زمان درخواست به پایان رسید");
    return;
  }
  toast.error("خطایی رخ داده است");
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, 
    },
  },
  mutationCache: new MutationCache({
    onError: handleMutationError,
  }),
});

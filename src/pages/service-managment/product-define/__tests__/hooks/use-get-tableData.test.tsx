import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProductFilter } from "../../lib/hooks/use-get-tableData";
import type { ProductDefineFilters } from "../../model/table/table-types";


const { mockApiPost } = vi.hoisted(() => {
  return {
    mockApiPost: vi.fn(),
  };
});


vi.mock("@/shared/lib/apiClient", () => ({
  default: { post: mockApiPost },
}));


const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProductFilter", () => {
  const filters: ProductDefineFilters = {
    code: "123",
    name: "test product",
    productGroup: null,
    isActive: true,
  };

  const pagination = { pageNumber: 1, pageSize: 10 };

  it("باید داده‌ها را از API دریافت کند و payload را برگرداند", async () => {
    const mockResponse = { payload: { data: [{ id: 1, name: "mock" }] } };
    mockApiPost.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(
      () => useProductFilter(filters, pagination),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockApiPost).toHaveBeenCalledWith(
      `/core-api/product/filter?pageNumber=1&pageSize=10`,
      expect.objectContaining({
        code: "123",
        name: "test product",
        isActive: true,
      })
    );

    expect(result.current.data).toEqual(mockResponse.payload);
  });

  it("باید خطا را مدیریت کند", async () => {
    const mockError = new Error("Network Error");
    mockApiPost.mockRejectedValueOnce(mockError); 

    const { result } = renderHook(
      () => useProductFilter(filters, pagination),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });
});

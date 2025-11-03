
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFormMutation, useDeleteProduct } from '../../lib/hooks/use-form-mutation';
import * as formApi from '../../api/form-api';
import { toast } from 'sonner';
import type { FormValues } from '../../model/form/form-types';

vi.mock('../../api/form-api');
vi.mock('sonner');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useFormMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit form successfully', async () => {
    const mockOnSuccess = vi.fn();
    
    // ✅ Mock data کامل مطابق با FormValues
    const mockData: FormValues = {
      code: 'PRD001',
      name: 'Test Product',
      description: 'Test Description',
      productGroup: { id: 1, text: 'Group 1' },
      isActive: true,
    };

    vi.mocked(formApi.submitForm).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useFormMutation(mockOnSuccess), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(formApi.submitForm).toHaveBeenCalledWith(mockData);
    expect(toast.success).toHaveBeenCalledWith('اطلاعات با موفقیت ذخیره شد');
    expect(mockOnSuccess).toHaveBeenCalled();
  });



  it('should invalidate queries on success', async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    vi.mocked(formApi.submitForm).mockResolvedValue({ success: true });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useFormMutation(), { wrapper });
    const mockData: FormValues = {
      code: 'PRD003',
      name: 'Test',
      description: 'Test Description',
      productGroup: { id: 1, text: 'Test Group' },
    };

    result.current.mutate(mockData);

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['product-define'],
      });
    });
  });

  it('should submit update form with id', async () => {
    const mockOnSuccess = vi.fn();
    

    const mockData: FormValues = {
      id: 123,
      code: 'PRD004',
      name: 'Updated Product',
      description: 'Updated Description',
      productGroup: { id: 3, text: 'Group 3' },
      isActive: false,
    };

    vi.mocked(formApi.submitForm).mockResolvedValue({ 
      success: true,
      data: mockData 
    });

    const { result } = renderHook(() => useFormMutation(mockOnSuccess), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(formApi.submitForm).toHaveBeenCalledWith(mockData);
    expect(mockOnSuccess).toHaveBeenCalled();
  });
});

describe('useDeleteProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete product successfully', async () => {
    vi.mocked(formApi.deleteBag).mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteProduct(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(123);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(formApi.deleteBag).toHaveBeenCalledWith(123);
    expect(toast.success).toHaveBeenCalledWith('محصول با موفقیت حذف شد');
  });

 

  it('should invalidate queries after successful deletion', async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    vi.mocked(formApi.deleteBag).mockResolvedValue(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    result.current.mutate(789);

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['product-define'],
      });
    });
  });
});

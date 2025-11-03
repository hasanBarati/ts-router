
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitForm, deleteBag } from '../../api/form-api';
import type { FormValues } from '../../model/form/form-types';
import api from '@/shared/lib/apiClient';

vi.mock('@/shared/lib/apiClient', () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Form API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitForm', () => {
    it('should create new product when id does not exist', async () => {
      const mockData: FormValues = {
        code: 'PRD001',
        name: 'Test Product',
        description: 'Test Description',
        isActive: true,
        productGroup: { id: 1, text: 'Group 1' },
      };

      const mockResponse = {
        data: { success: true, id: 1 },
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);

      const result = await submitForm(mockData);

      expect(api.post).toHaveBeenCalledWith('/core-api/product', mockData);
      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.put).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should update existing product when id exists', async () => {
      const mockData: FormValues = {
        id: 123,
        code: 'PRD001',
        name: 'Updated Product',
        description: 'Updated Description',
        isActive: false,
        productGroup: { id: 2, text: 'Group 2' },
      };

      const mockResponse = {
        data: { success: true, id: 123 },
      };

      vi.mocked(api.put).mockResolvedValue(mockResponse);

      const result = await submitForm(mockData);

      expect(api.put).toHaveBeenCalledWith('/core-api/product', mockData);
      expect(api.put).toHaveBeenCalledTimes(1);
      expect(api.post).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle create with minimal required fields', async () => {
      const mockData: FormValues = {
        code: 'PRD002',
        name: 'Minimal Product',
        description: 'Basic description',
        isActive: true,
      };

      const mockResponse = {
        data: { success: true, id: 2 },
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);

      const result = await submitForm(mockData);

      expect(api.post).toHaveBeenCalledWith('/core-api/product', mockData);
      expect(result).toEqual(mockResponse.data);
    });


    it('should handle PUT API errors', async () => {
      const mockData: FormValues = {
        id: 123,
        code: 'PRD003',
        name: 'Test',
        description: 'Test',
        isActive: true,
      };

      const mockError = new Error('Update failed');
      vi.mocked(api.put).mockRejectedValue(mockError);
      await expect(submitForm(mockData)).rejects.toThrow('Update failed');
    });

    it('should pass productGroup correctly', async () => {
      const mockData: FormValues = {
        code: 'PRD004',
        name: 'Product with Group',
        description: 'Description',
        isActive: true,
        productGroup: { id: 5, text: 'Special Group' },
      };

      const mockResponse = {
        data: { success: true },
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);
      await submitForm(mockData);
      const callArgs = vi.mocked(api.post).mock.calls[0][1] as FormValues;
      expect(callArgs).toHaveProperty('productGroup');
      expect(callArgs.productGroup).toEqual({ id: 5, text: 'Special Group' });
    });
  });

  describe('deleteBag', () => {
    it('should delete product successfully', async () => {
      const mockResponse = {
        data: { success: true, message: 'Product deleted' },
      };

      vi.mocked(api.delete).mockResolvedValue(mockResponse);

      const result = await deleteBag(123);

      expect(api.delete).toHaveBeenCalledWith(
        '/core-api/product/123',
        { method: 'DELETE' }
      );
      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle delete errors', async () => {
      const mockError = new Error('Delete failed');
      vi.mocked(api.delete).mockRejectedValue(mockError);

      await expect(deleteBag(123)).rejects.toThrow('Delete failed');
    });

    it('should call delete with correct product id format', async () => {
      const mockResponse = { data: { success: true } };
      vi.mocked(api.delete).mockResolvedValue(mockResponse);

      await deleteBag(456);

      expect(api.delete).toHaveBeenCalledWith(
        '/core-api/product/456',
        { method: 'DELETE' }
      );
    });

    it('should handle numeric id conversion', async () => {
      const mockResponse = { data: { success: true } };
      vi.mocked(api.delete).mockResolvedValue(mockResponse);

      const productId = 789;
      await deleteBag(productId);

      const [url] = vi.mocked(api.delete).mock.calls[0];
      expect(url).toBe('/core-api/product/789');
    });
  });
});

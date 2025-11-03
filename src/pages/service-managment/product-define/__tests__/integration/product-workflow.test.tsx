
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';


const { mockApiPost, mockApiPut, mockApiDelete, mockSubmitForm, mockDeleteBag } = vi.hoisted(() => ({
  mockApiPost: vi.fn(),
  mockApiPut: vi.fn(),
  mockApiDelete: vi.fn(),
  mockSubmitForm: vi.fn(),
  mockDeleteBag: vi.fn(),
}));

vi.mock('@/shared/lib/apiClient', () => ({
  default: {
    post: mockApiPost,
    put: mockApiPut,
    delete: mockApiDelete,
  },
}));


vi.mock('../../api/form-api', () => ({
  submitForm: mockSubmitForm,
  deleteBag: mockDeleteBag,
}));

vi.mock('@/app/user-store', () => ({
  useUserStore: {
    getState: () => ({ userInfo: { hublist: ['hub1'] } }),
  },
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));


const TestProductPage = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const products = [
    { id: 1, code: 'P1', name: 'محصول ۱', isActive: true },
    { id: 2, code: 'P2', name: 'محصول ۲', isActive: true },
  ];

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (data.id) {
      await mockApiPut('/core-api/product', data);
    } else {
      await mockApiPost('/core-api/product', data);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      await mockApiDelete(`/core-api/product/${deletingId}`, { method: 'DELETE' });
      setIsDeleteOpen(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div data-testid="table-actions">
        <button data-testid="create-product" onClick={handleCreate}>
          افزودن محصول
        </button>
      </div>

      <table data-testid="products-table">
        <tbody>
          {products.map((row) => (
            <tr key={row.id} data-testid={`row-${row.id}`}>
              <td>{row.name}</td>
              <td>
                <button data-testid={`edit-${row.id}`} onClick={() => handleEdit(row)}>
                  ویرایش
                </button>
                <button data-testid={`delete-${row.id}`} onClick={() => handleDelete(row.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <div data-testid="product-form">
          <h2>{editingProduct ? 'ویرایش محصول' : 'افزودن محصول'}</h2>
          <button
            data-testid="form-submit"
            onClick={() =>
              handleFormSubmit({
                id: editingProduct?.id,
                code: editingProduct?.code || 'NEW',
                name: editingProduct?.name || 'محصول جدید',
                productGroup: { id: 1 },
                isActive: true,
              })
            }
          >
            ذخیره
          </button>
          <button data-testid="form-cancel" onClick={() => setIsFormOpen(false)}>
            انصراف
          </button>
        </div>
      )}
      {isDeleteOpen && (
        <div data-testid="delete-modal">
          <button data-testid="delete-confirm" onClick={handleDeleteConfirm}>
            تایید حذف
          </button>
          <button data-testid="delete-cancel" onClick={() => setIsDeleteOpen(false)}>
            انصراف
          </button>
        </div>
      )}
    </div>
  );
};

describe('Product CRUD Integration', () => {
  let queryClient: QueryClient;
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
        mutations: { retry: false },
      },
    });

    mockApiPost.mockResolvedValue({ data: { id: 99, success: true } });
    mockApiPut.mockResolvedValue({ data: { success: true } });
    mockApiDelete.mockResolvedValue({ data: { success: true } });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('✅ Complete CRUD Flow', async () => {
    render(<TestProductPage />, { wrapper });


    expect(screen.getByTestId('products-table')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toHaveTextContent('محصول ۱');


    await user.click(screen.getByTestId('create-product'));
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  
    await user.click(screen.getByTestId('form-submit'));

    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith('/core-api/product', {
        code: 'NEW',
        name: 'محصول جدید',
        productGroup: { id: 1 },
        isActive: true,
      });
    });

    expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('edit-1'));
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
    expect(screen.getByText('ویرایش محصول')).toBeInTheDocument();

    await user.click(screen.getByTestId('form-submit'));

    await waitFor(() => {
      expect(mockApiPut).toHaveBeenCalledWith('/core-api/product', {
        id: 1,
        code: 'P1',
        name: 'محصول ۱',
        productGroup: { id: 1 },
        isActive: true,
      });
    });


    await user.click(screen.getByTestId('delete-1'));
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

    await user.click(screen.getByTestId('delete-confirm'));

    await waitFor(() => {
      expect(mockApiDelete).toHaveBeenCalledWith('/core-api/product/1', {
        method: 'DELETE',
      });
    });

    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();


    await user.click(screen.getByTestId('create-product'));
    expect(screen.getByTestId('product-form')).toBeInTheDocument();

    await user.click(screen.getByTestId('form-cancel'));
    expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();
  });
});

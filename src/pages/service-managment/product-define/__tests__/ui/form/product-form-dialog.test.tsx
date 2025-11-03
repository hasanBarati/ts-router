// product-define/__tests__/ui/form/product-form-dialog.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormAction } from '../../../ui/form/product-form-dialog';
import * as formMutation from '../../../lib/hooks/use-form-mutation';
import type { FormValues } from '../../../model/form/form-types';

vi.mock('../../../lib/hooks/use-form-mutation');

vi.mock('@/features/dynamic-form-fields', () => ({
  DynamicForm: ({ onSubmit, onClose, defaultValues, isSubmitting }: any) => (
    <form
      data-testid="mock-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(defaultValues);
      }}
    >
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'در حال ارسال...' : 'ذخیره'}
      </button>
      <button type="button" onClick={onClose}>
        بستن
      </button>
    </form>
  ),
}));

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

describe('FormAction', () => {
  const mockOnClose = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(formMutation.useFormMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null,
    } as any);
  });

  it('should render create mode correctly', () => {
    render(<FormAction isOpen={true} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('افزودن محصول')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ذخیره/i })).toBeInTheDocument();
  });

  it('should render edit mode correctly', () => {
    const initialData: FormValues = {
      id: 1,
      code: 'PRD001',
      name: 'Test Product',
      description: 'Test Description',
      isActive: true,
      productGroup: { id: 1, text: 'Group 1' },
    };

    render(
      <FormAction isOpen={true} onClose={mockOnClose} initialData={initialData} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('ویرایش محصول')).toBeInTheDocument();
  });

  it('should call mutate on form submission', async () => {
    const user = userEvent.setup();

    render(<FormAction isOpen={true} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    const submitButton = screen.getByRole('button', { name: /ذخیره/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it('should show pending state correctly', () => {
    vi.mocked(formMutation.useFormMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null,
    } as any);

    render(<FormAction isOpen={true} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    const submitButton = screen.getByRole('button', { name: /در حال ارسال/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should call onClose when close button clicked', async () => {
    const user = userEvent.setup();

    render(<FormAction isOpen={true} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    const closeButton = screen.getByRole('button', { name: /بستن/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose callback after successful mutation', () => {
    let savedCallback: (() => void) | undefined;
    vi.mocked(formMutation.useFormMutation).mockImplementation((onSuccess) => {
      savedCallback = onSuccess;
      return {
        mutate: mockMutate,
        isPending: false,
        isSuccess: false,
        isError: false,
        data: undefined,
        error: null,
      } as any;
    });

    render(<FormAction isOpen={true} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    if (savedCallback) {
      savedCallback();
    }

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render when isOpen is false', () => {
    expect(screen.queryByText('افزودن محصول')).not.toBeInTheDocument();
  });

  it('should pass correct defaultValues to form', () => {
    const initialData: FormValues = {
      id: 123,
      code: 'TEST-001',
      name: 'Test Name',
      description: 'Test Desc',
      isActive: false,
      productGroup: { id: 5, text: 'Test Group' },
    };

    render(
      <FormAction isOpen={true} onClose={mockOnClose} initialData={initialData} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });
});

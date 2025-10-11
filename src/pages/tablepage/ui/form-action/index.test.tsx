// FormAction.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest"; // درست به‌جای jest
import { FormAction } from ".";

// Mock کردن mutation
const mockMutate = vi.fn();

vi.mock("../../lib/use-form-mutation", () => ({
  useFormMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

vi.mock("@/features/async-select/async-select", () => ({
  AsyncPopoverSelect: ({ onChange }: any) => (
    <div
      data-testid="select-mock"
      onClick={() => onChange({ id: 1, text: "Test Hub" })}
    >
      Mock Select
    </div>
  ),
}));

describe("FormAction Component", () => {
  it("submits the form with correct values", async () => {
    render(<FormAction />);

    fireEvent.click(screen.getByText("افزودن کاربر"));

    const nameInput = await screen.findByPlaceholderText("نام");
    const codeInput = screen.getByPlaceholderText("کد");

    fireEvent.change(nameInput, { target: { value: "Afrooz" } });
    fireEvent.change(codeInput, { target: { value: "1234" } });
    fireEvent.click(screen.getByTestId("select-mock"));
    fireEvent.click(screen.getByText("ذخیره"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "Afrooz",
        code: "1234",
        selectHub: { id: 1, text: "Test Hub" },
      });
    });
  });
});

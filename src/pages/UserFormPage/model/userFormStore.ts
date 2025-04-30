import { create } from "zustand";
import type { UserFormData } from "../types/userFormTypes";


interface UserFormState {
  data: UserFormData;
  setData: (data: Partial<UserFormData>) => void;
}

export const useUserFormStore = create<UserFormState>(set => ({
  data: { firstName: '', lastName: '', email: '' },
  setData: data => set(state => ({ data: { ...state.data, ...data } }))
}));

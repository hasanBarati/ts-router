import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => {
    set(token ? { token } : { token: null });
    localStorage.setItem('token', token);
  },
  
}));
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthState = {

  setUserInfo:(user)=>void
};

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    setUserInfo:(user)=>set(user)
    
  }))
);
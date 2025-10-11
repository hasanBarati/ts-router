import { useAuth } from "react-oidc-context";

export const useLogout = () => {
  const auth = useAuth();

  const handleLogout = () => {
    sessionStorage.clear(); // userInfo پاک می‌شه
    localStorage.clear(); // token پاک می‌شه
    localStorage.removeItem(import.meta.env.VITE_OIDC_CONFIG);
    localStorage.clear();
    auth.clearStaleState();
    auth.removeUser();
    auth.revokeTokens();
    auth.signoutRedirect();
    window.location.href = import.meta.env.VITE_LOGOUT;
  };

  return { handleLogout };
};

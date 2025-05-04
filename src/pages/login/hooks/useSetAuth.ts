import { useEffect } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';

import { router } from '@/app/router';
import { useAuthStore } from '../model/auth-store';

export function useSetAuthentication() {
  const auth = useAuth();
  const setToken = useAuthStore((state) => state.setToken);


  useEffect(() => {
    const notAuthenticated =
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading;

    if (notAuthenticated) {
      router.navigate({ to: '/login' });
    }

    if (auth?.user?.access_token) {
      setToken(auth.user.access_token);
    }
  }, [auth]);

  return {};
}
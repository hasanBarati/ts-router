
import { WebStorageStateStore } from "oidc-client-ts";
import type { AuthProviderProps } from "react-oidc-context";


export const oidcConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_AUTHORITY,
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    scope: "profile",
    disablePKCE: true,
    client_authentication: "client_secret_basic",
    loadUserInfo: true,
    revokeTokensOnSignout: true,
    automaticSilentRenew: true,
    monitorSession: true,
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, "/");
    },
    
  };


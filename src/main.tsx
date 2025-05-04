import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { router } from "./app/router.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import "./styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/config/react-query.ts";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./shared/config/oidc.ts";

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider {...oidcConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

// ── Request Interceptor ──────────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  if (!isBrowser) return config;

  // CSRF token — try all common cookie names
  const csrfToken =
    getCookie("be_csrf") || getCookie("XSRF-TOKEN") || getCookie("csrf-token");
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

// ── Response Interceptor ─────────────────────────────────────────────────
apiClient.interceptors.response.use(
  async (response) => {
    // If we expect binary data (e.g. PDF downloads), validate the content
    if (response.config.responseType === "blob") {
      return processPdfResponse(response);
    }
    return response;
  },
  (error) => {
    const { response, config } = error;
    // Hardened check for silent flag
    const isSilent =
      config?._silent === true || config?._skipAuthError === true;

    // 401 Unauthorized
    if (response?.status === 401) {
      // Silent auth probes (e.g. hydration check) — let caller handle it
      if (isSilent) return Promise.reject(error);

      logger.warn(`[Auth] 401 on ${config?.url}. Session invalid.`);

      // On cart page, don't auto-logout — let user see recovery button
      if (isBrowser && window.location.pathname === "/cart") {
        return Promise.reject(error);
      }

      queryClient.clear();
      store.dispatch(logOut());
      return Promise.reject(error);
    }

    // 404 on customer endpoints — session is stale, force logout
    const isCustomer404 =
      response?.status === 404 &&
      (config?.url?.includes("/customers/") ||
        config?.url?.includes("/dependents"));
    if (isBrowser && isCustomer404 && !config?._skipSessionPurge) {
      if (!isSilent) {
        logger.warn(
          "[Auth] Customer record not found (404). Resetting session.",
        );
        appToast.error(T.YOUR_ACCOUNT_COULD_NOT_BE_FOUND_RESETTIN);
      }
      queryClient.clear();
      store.dispatch(logOut());
    }

    // Log non-silent errors in dev. We intentionally do NOT log response.data
    // here — error responses can carry PII (the customer-not-found message
    // can include an email, etc.) and console.error survives the production
    // stripper. Status + URL only.
    if (!isSilent && response && process.env.NODE_ENV !== "production") {
      logger.warn(
        `[API] ${config?.method?.toUpperCase()} ${config?.url} → ${response.status}`,
      );
    }

    return Promise.reject(error);
  },
);

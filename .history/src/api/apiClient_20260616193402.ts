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
  console.log("[API] Request:", config.method?.toUpperCase(), config.url);

  return config;
});

// ── Response Interceptor ─────────────────────────────────────────────────
apiClient.interceptors.response.use((response) => {
  console.log("[API] Response:", response.status, response.config.url);
  return response;
});

export default apiClient;

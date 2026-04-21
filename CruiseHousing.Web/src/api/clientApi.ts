import axios from "axios";
import { useAuthStore } from "../stores/authStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const session = localStorage.getItem("auth_session");

  if (session) {
    const { accessToken } = JSON.parse(session);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

/**
// auto logout when 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";

    const isLoginRequest = requestUrl.includes("/Auth/login");

    if (status === 401 && !isLoginRequest) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
 */
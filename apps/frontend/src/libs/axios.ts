import axios, { InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/auth/refresh");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

import axios from "axios";
import { clearAuthSession } from "../utils/authStorage";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://api-ecommerc-main-auuqrg.free.laravel.cloud/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthSession();
      window.dispatchEvent(new Event("auth-changed"));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants/baseUrl";
import { logout } from "../utils/auth";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

let isSessionExpired = false;

// ✅ Her istekten önce token ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Her cevaptan sonra 401 kontrolü
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401 && !isSessionExpired) {
      isSessionExpired = true;

      logout();

      toast.error("Your session has expired. Please sign in again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;

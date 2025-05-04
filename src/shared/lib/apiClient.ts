// src/shared/api/interceptor.ts
import axios from 'axios';
import type { AxiosError } from 'axios';
// ساخت یک instance از axios
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  // یا هر متغیر محیطی دیگری
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {

    }
    return Promise.reject(error);
  }
);

export default api;

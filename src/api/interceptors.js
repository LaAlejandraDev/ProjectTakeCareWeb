// src/api/interceptors.js

export const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("No autorizado (401) → Redirigiendo al login");
      }

      return Promise.reject(error);
    }
  );
};
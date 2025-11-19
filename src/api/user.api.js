import axiosClient from "./axiosClient";

export const UserAPI = {
  getUserInformation: (userId) => axiosClient.get(`/Usuarios/info/${userId}`),
  getProfile: () => axiosClient.get("/Usuarios/profile"),
  updateProfile: (id, data) => axiosClient.put(`/Usuarios/${id}`, data),
}


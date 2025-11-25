import axiosClient from "./axiosClient";

export const UserAPI = {
  getUserInformation: (userId) => axiosClient.get(`/Usuarios/info/${userId}`),
  getUsers: () => axiosClient.get("/Usuarios"),
  getUserById: (id) => axiosClient.get(`/Usuarios/${id}`),
  updateUsuario: (id, data) => axiosClient.put(`/Usuarios/${id}`, data),
  deleteUsuario: (id) => axiosClient.delete(`/Usuarios/${id}`),
  getProfile: () => axiosClient.get("/Usuarios/profile"),
  updateProfile: (id, data) => axiosClient.put(`/Usuarios/${id}`, data),
  createUsuario: (data) => axiosClient.post("/Usuarios", data),
  viewDashboard: () => axiosClient.get("/Usuarios/dashboardAdmin"),
}


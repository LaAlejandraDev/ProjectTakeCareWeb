import axiosClient from "./axiosClient";

export const UserAPI = {
getProfile: () => axiosClient.get("/Usuarios/profile"),
updateProfile: (id, data) => axiosClient.put(`/Usuarios/${id}`, data),
}
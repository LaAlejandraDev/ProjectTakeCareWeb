import axiosClient from "./axiosClient";

export const UserAPI = {
    getUsers: () => axiosClient.get("/Usuarios"),
    getUserById: (id) => axiosClient.get(`/Usuarios/${id}`),
    updateUsuario: (id, data) => axiosClient.put(`/Usuarios/${id}`, data),
};

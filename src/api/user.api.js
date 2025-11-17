import axiosClient from "./axiosClient";

export const UserAPI = {
  getUserInformation: (userId) => axiosClient.get(`/Usuarios/info/${userId}`)
}

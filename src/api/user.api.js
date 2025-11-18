import axiosClient from "./axiosClient";

export const UserAPI = {
<<<<<<< HEAD
    getUsers: () => axiosClient.get("/Usuarios"),
    getUserById: (id) => axiosClient.get(`/Usuarios/${id}`),
    updateUsuario: (id, data) => axiosClient.put(`/Usuarios/${id}`, data),
};
=======
  getUserInformation: (userId) => axiosClient.get(`/Usuarios/info/${userId}`)
}
>>>>>>> 6c3e5922ca95b52b50f58be8a128ec2820bd9d7f

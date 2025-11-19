import axiosClient from "./axiosClient";

export const AuthAPI = {
  login: (data) => axiosClient.post("/LoginSesion", data),
  register: (data) => axiosClient.post("/Usuarios/registro", data),
}
  
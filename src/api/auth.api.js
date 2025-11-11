import axiosClient from "./axiosClient";

export const AuthAPI = {
  login: (data) => axiosClient.post("/login", data),
  register: (data) => axiosClient.post("/registro", data),
  getProfile: () => axiosClient.get("/profile")
}

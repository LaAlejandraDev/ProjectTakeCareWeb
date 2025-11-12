import axiosClient from "./axiosClient";


export const UserAPI = {
    getUsers: () => axiosClient.get("/Usuarios")

}
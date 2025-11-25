import axiosClient from "./axiosClient"

export const citasAPI = {
    getDates: (id) => axiosClient.get(`/Citas/psicologo/${id}`)
}
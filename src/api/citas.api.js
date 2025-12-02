import axiosClient from "./axiosClient"

export const citasAPI = {
    getDates: (id) => axiosClient.get(`/Citas/psicologo/${id}`),
    getCitasByPaciente: (id) => axiosClient.get(`/Citas/paciente/${id}`),
    getCitaById: (id) => axiosClient.get(`/Citas/${id}`),

    // CitaComentarios
    getComentarios: () => axiosClient.get(`/CitaComentarios`),
    getComentarioById: (id) => axiosClient.get(`/CitaComentarios/${id}`),
    postComentario: (data) => axiosClient.post(`/CitaComentarios`, data),
    putComentario: (id, data) => axiosClient.put(`/CitaComentarios/${id}`, data),
    deleteComentario: (id) => axiosClient.delete(`/CitaComentarios/${id}`)
};
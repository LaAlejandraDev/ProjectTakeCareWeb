import axiosClient from "./axiosClient";

export const PsicologoAPI = {
    getPsicologoByUsuario: (idUsuario) =>
        axiosClient.get(`/Psicologos/usuario/${idUsuario}`),
    updatePsicologo: (id, data) => axiosClient.put(`/Psicologos/${id}`, data),
    deletePsicologo: (id) => axiosClient.delete(`/Psicologos/${id}`),
    getPsycologistDays: (id) => axiosClient.get("/PsicologoDisponibilidades/psicologo/"+id),
    setPsycologistDays: (data) => axiosClient.post("/PsicologoDisponibilidades", data)
}

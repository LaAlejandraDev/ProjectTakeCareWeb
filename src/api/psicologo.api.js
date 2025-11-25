import axiosClient from "./axiosClient";

export const PsicologoAPI = {
    getPsicologoByUsuario: (idUsuario) =>
        axiosClient.get(`/Psicologos/usuario/${idUsuario}`),
    updatePsicologo: (id, data) => axiosClient.put(`/Psicologos/${id}`, data),
    createPsicologo: (data) => axiosClient.post("/Psicologos/postUsuarioPsicologo", data),
    deletePsicologo: (id) => axiosClient.delete(`/Psicologos/${id}`),
    getPsycologistDays: (id) => axiosClient.get("/PsicologoDisponibilidades/psicologo/" + id),
    setPsycologistDays: (data) => axiosClient.post("/PsicologoDisponibilidades", data),
    suscribirse: (idPsicologo, plan) =>
        axiosClient.post(`/Psicologos/${idPsicologo}/suscribirse`, plan),

    cambiarPlan: (id, plan) =>
        axiosClient.put(`/Psicologos/cambiarPlan/${id}`, plan),

    getPendientes: () => axiosClient.get("/Psicologos/pendientes"),
    aprobarPsicologo: (id) => axiosClient.put(`/Psicologos/aprobar/${id}`),
    rechazarPsicologo: (id) => axiosClient.put(`/Psicologos/rechazar/${id}`),

    getEstado: (idUsuario) => axiosClient.get(`/Psicologos/estado/${idUsuario}`),
}

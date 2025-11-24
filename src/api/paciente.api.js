import axiosClient from "./axiosClient";

export const PacienteAPI = {
    getPacienteByUsuario: (idUsuario) =>
        axiosClient.get(`/Pacientes/usuario/${idUsuario}`),
    updatePaciente: (id, data) => axiosClient.put(`/Pacientes/${id}`, data),
    deletePaciente: (id) => axiosClient.delete(`/Pacientes/${id}`),
    createPaciente: (data) => axiosClient.post("/Pacientes/postUsuarioPaciente", data),
};
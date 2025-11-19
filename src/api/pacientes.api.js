import axiosClient from "./axiosClient";

export const PacientesAPI = {
  getAll: () => axiosClient.get("/Pacientes"),
  getById: (id) => axiosClient.get(`/Pacientes/${id}`),
  getByUsuario: (idUsuario) => axiosClient.get(`/Pacientes/usuario/${idUsuario}`)
};

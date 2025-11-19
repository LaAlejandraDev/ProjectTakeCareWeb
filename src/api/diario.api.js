import axiosClient from "./axiosClient";

export const DiarioAPI = {
  getAll: () => axiosClient.get("/DiarioEmocionals"),
  getById: (id) => axiosClient.get(`/DiarioEmocionals/${id}`),
  getByPaciente: (idPaciente) =>
    axiosClient.get(`/DiarioEmocionals?IdPaciente=${idPaciente}`), 
  // para el paciente
  create: (data) => axiosClient.post("/DiarioEmocionals", data),
  update: (id, data) => axiosClient.put(`/DiarioEmocionals/${id}`, data),
  remove: (id) => axiosClient.delete(`/DiarioEmocionals/${id}`),
};

import axiosClient from "./axiosClient"; 

export const DiarioAPI = {
  getAll: () => axiosClient.get("/DiarioEmocionals"),
  getById: (id) => axiosClient.get(`/DiarioEmocionals/${id}`),
  getByPaciente: (idPaciente) => axiosClient.get(`/DiarioEmocionals?pacienteId=${idPaciente}`),
  create: (data) => axiosClient.post("/DiarioEmocionals", data),
  update: (id, data) => axiosClient.put(`/DiarioEmocionals/${id}`, data),
  delete: (id) => axiosClient.delete(`/DiarioEmocionals/${id}`)
};

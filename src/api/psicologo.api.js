import axiosClient from "./axiosClient";

export const PsicologoAPI = {
    getPsycologistDays: (id) => axiosClient.get("/PsicologoDisponibilidades/psicologo/"+id),
    setPsycologistDays: (data) => axiosClient.post("/PsicologoDisponibilidades", data)
}
import axios from "axios";
import axiosClient from "./axiosClient";

export const UserAPI = {
  getPatientData: (userId) => axiosClient.get(`/Pacientes/usuario/${userId}`)
}

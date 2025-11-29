import axiosClient from "./axiosClient";

export const APIExpedientes = {
    listaExpedientes: (idPsicologo) => axiosClient.get("/Expedientes/psicologo/"+idPsicologo) 
}
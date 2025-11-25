import axiosClient from "./axiosClient";

export const ChatAPI = {
 getChatMessages: (chatId) => axiosClient.get(`/ChatMensajes/chat/${chatId}`),
 sendMessage: (data) => axiosClient.post(`/ChatMensajes`, data),
 getChatList: (idPsicologo) => axiosClient.get("/Chats/lista", { params: { "idPsicologo": idPsicologo }}),
 getChatListPatient: (idPaciente) => axiosClient.get("/Chats/lista", { params: { "idPaciente": idPaciente }}),
 getChatInfo: (chatId) => axiosClient.get(`/Chats/chatinfo/${chatId}`),
}

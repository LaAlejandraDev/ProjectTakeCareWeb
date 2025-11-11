import axiosClient from "./axiosClient";

export const ChatAPI = {
  getConversations: () => axiosClient.get("/chat"),
  getMessages: (chatId) => axiosClient.get(`/chat/${chatId}`),
  sendMessage: (chatId, data) => axiosClient.post(`/chat/${chatId}`, data)
}

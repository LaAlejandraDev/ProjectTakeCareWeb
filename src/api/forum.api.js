import axiosClient from "./axiosClient";

export const ForumAPI = {
  getAllPost: () => axiosClient.get('/Posts'),
  getPost: (id) => axiosClient.get(`/Posts/${id}`),
  createNewPost: (post) => axiosClient.post('/Posts', post),
  likePost: (id) => axiosClient.put(`/Posts/${id}/like`),

  addComment: (comment) => axiosClient.post('/Comentarios', comment),
  getCommentsByPost: (postId) => axiosClient.get(`/Comentarios/Post/${postId}`)
};

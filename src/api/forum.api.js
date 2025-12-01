import axiosClient from "./axiosClient";

export const ForumAPI = {
  getAllPost: () => axiosClient.get('/Posts'),
  createNewPost: (post) => axiosClient.post('/Posts', post)
}

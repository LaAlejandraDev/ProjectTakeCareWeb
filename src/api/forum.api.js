import axiosClient from "./axiosClient";

export const ForumAPI = {
  getAllPost: () => axiosClient.get('/Posts')
}

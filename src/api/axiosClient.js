import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://10.16.7.177:5002/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

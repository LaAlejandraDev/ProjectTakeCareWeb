import axios from "axios";
import { setupInterceptors } from "./interceptors";

const axiosClient = axios.create({
  baseURL: "http://localhost:61648/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosClient);

export default axiosClient;

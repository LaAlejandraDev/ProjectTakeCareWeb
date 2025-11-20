import axios from "axios";
import { setupInterceptors } from "./interceptors";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.13:60572/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosClient);


export default axiosClient;

import axios from "axios";
import { setupInterceptors } from "./interceptors";

const axiosClient = axios.create({
  baseURL: "https://chc92xn0-5002.usw3.devtunnels.ms/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosClient);


export default axiosClient;

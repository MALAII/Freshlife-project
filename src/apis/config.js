import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/api",
baseURL: "https://freshlife-api-vo1.vercel.app/api",
  withCredentials: false,

});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

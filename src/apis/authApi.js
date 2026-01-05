import { axiosInstance } from "./config";

const BASE_URL = "/auth";

export const registerUser = (data) =>
  axiosInstance.post(`${BASE_URL}/register`, data);

export const loginUser = (data) =>
  axiosInstance.post(`${BASE_URL}/login`, data);

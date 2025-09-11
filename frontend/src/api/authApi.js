import axiosInstance from "../axios/axiosInstance";

export const authAPi = {
  register: async (formData) => {
    const { data } = await axiosInstance.post("/auth/register", formData);
    return data;
  },
  login: async (formData) => {
    const { data } = await axiosInstance.post("/auth/login", formData);
    return data;
  },
};

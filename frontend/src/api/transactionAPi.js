import axiosInstance from "../axios/axiosInstance";

export const transactionApi = {
  addTransaction: async (transactionData) => {
    const { data } = await axiosInstance.post("/transaction", transactionData);
    return data;
  },
  updateTransaction: async (transactionId, transactionData) => {
    const { data } = await axiosInstance.put(
      `/transaction/${transactionId}`,
      transactionData
    );
    return data;
  },
  transactions: async () => {
    const { data } = await axiosInstance.get("/transaction");
    return data;
  },
  deleteTransaction: async (transactionId) => {
    const { data } = await axiosInstance.delete(
      `/transaction/${transactionId}`
    );
    return data;
  },
};

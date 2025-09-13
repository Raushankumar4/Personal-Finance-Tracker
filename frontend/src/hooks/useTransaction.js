import { useMutation, useQuery } from "@tanstack/react-query";
import { transactionApi } from "../api/transactionAPi";

export const useAddTransaction = () => {
  return useMutation({
    mutationKey: ["transaction", "add"],
    mutationFn: transactionApi.addTransaction,
  });
};

export const useUpdateTransaction = () => {
  return useMutation({
    mutationKey: ["tansaction", "update"],
    mutationFn: transactionApi.updateTransaction,
  });
};
export const useDeleteTransaction = () => {
  return useMutation({
    mutationKey: ["transaction", "delete"],
    mutationFn: transactionApi.deleteTransaction,
  });
};

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactionApi.transactions,
  });
};

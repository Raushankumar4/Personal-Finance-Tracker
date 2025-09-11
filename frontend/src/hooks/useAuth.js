import { useMutation } from "@tanstack/react-query";
import { authAPi } from "../api/authApi";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: authAPi.register,
  });
};
export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: authAPi.login,
  });
};

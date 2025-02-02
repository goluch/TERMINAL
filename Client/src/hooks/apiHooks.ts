import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "../api/terminalSchemas";
import axios from "axios";

export function useLoginMutation(params: LoginRequest) {
  const result = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:5006/api/v1/identity/login",
        params,
      );
    },
  });

  return result;
}

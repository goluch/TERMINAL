import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "../api/terminalSchemas";
import axios from "axios";

export function useLoginMutation() {
  const result = useMutation({
    mutationFn: async (params: LoginRequest) => {
      return await axios.post(
        "http://localhost:5006/api/v1/identity/login",
        params,
      );
    },
  });

  return result;
}

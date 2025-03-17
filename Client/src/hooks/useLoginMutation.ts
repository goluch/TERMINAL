import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { LoginRequest } from "../api/terminalSchemas";

export type LoginResponse = {
    token: string;
};

async function loginUser(params: LoginRequest) {
    return await apiClient.post<LoginResponse>(`/users/login`, params);
}

export function useLoginMutation() {
    const result = useMutation({
        mutationFn: (params: LoginRequest) => loginUser(params),
        onSuccess: (data) => {
            sessionStorage.setItem("token", data.data.token);
        },
    });

    return result;
}

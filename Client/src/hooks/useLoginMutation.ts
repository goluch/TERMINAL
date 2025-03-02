import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { LoginRequest } from "../api/terminalSchemas";

export type LoginResponse = {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

async function loginUser(params: LoginRequest) {
    return await apiClient.post<LoginResponse>(
        `/identity/login?useCookies=false&useSessionCookies=false`,
        params,
        { withCredentials: true },
    );
}

export function useLoginMutation() {
    const result = useMutation({
        mutationFn: (params: LoginRequest) => loginUser(params),
        onSuccess: (data) => {
            sessionStorage.setItem("token", data.data.accessToken);
            sessionStorage.setItem("refresh", data.data.refreshToken);
        },
    });

    return result;
}

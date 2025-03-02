import axios from "axios";
import { redirect } from "react-router-dom";
import { LoginResponse } from "../hooks/useLoginMutation";

const apiClient = axios.create({
    baseURL: "http://localhost:5006/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (request) => {
        const accessToken: string | null = sessionStorage.getItem("token");
        if (accessToken) {
            request.headers.Authorization = "Bearer " + accessToken;
        }
        return request;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status !== 401 || originalRequest._retry)
            return Promise.reject(error);

        originalRequest._retry = true;

        try {
            const refresh = sessionStorage.getItem("refresh");
            const response = await apiClient.post<LoginResponse>(
                "/identity/refresh",
                {
                    refreshToken: refresh,
                },
            );
            const { accessToken, refreshToken } = response.data;

            sessionStorage.setItem("token", accessToken);
            sessionStorage.setItem("refresh", refreshToken);
        } catch {
            redirect("/login");
        }
    },
);

export default apiClient;

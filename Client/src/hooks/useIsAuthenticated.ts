export function useIsAuthenticated(): boolean | undefined {
    return sessionStorage.getItem("token") !== null && sessionStorage.getItem("refresh") !== null;
}

export function useIsAuthenticated(): boolean | undefined {
    return sessionStorage.getItem("token") !== null;
}

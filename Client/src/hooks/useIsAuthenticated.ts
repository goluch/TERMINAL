import useUserData from "./useUserData";

export function useIsAuthenticated(): boolean {
    const { data } = useUserData();

    return data?.isAuthenticated === undefined ? false : data?.isAuthenticated;
}

import useUserData from "./useUserData";

export function useIsInRole(role: string): boolean {
    const { data } = useUserData();

    return data?.isAuthenticated === undefined ? false : data?.isAuthenticated && data?.roles.includes(role);
}

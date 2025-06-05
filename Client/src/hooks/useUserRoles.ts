import useUserData from "./useUserData";

export function useUserRoles(): string|undefined {
    const { data } = useUserData();

    return data?.role;
}

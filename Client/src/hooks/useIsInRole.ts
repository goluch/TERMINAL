import useUserData from "./useUserData";

export function useIsInRole(role: string): boolean {
  const { data } = useUserData();

  return role === data?.role;
}

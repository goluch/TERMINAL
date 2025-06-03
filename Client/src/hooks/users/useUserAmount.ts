import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "users"],
  queryFn: async () => await apiClient.get<number>("/users/amount"),
};

/**
 * useGetUserAmount Hook
 *
 * Fetches the total number of users from the API.
 *
 * @hook
 */
function useGetUserAmount() {
  return useQuery(queryArg);
}

/**
 * usePrefetchUserAmount Hook
 *
 * Prefetches the total number of users from the API.
 *
 * @hook
 */
function usePrefetchUserAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetUserAmount, usePrefetchUserAmount };

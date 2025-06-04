import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "projects"],
  queryFn: async () => await apiClient.get<number>("/projects/amount"),
};

/**
 * useGetProjectAmount Hook
 *
 * Fetches the total number of projects from the API.
 *
 * @hook
 */
function useGetProjectAmount() {
  return useQuery(queryArg);
}

/**
 * usePrefetchProjectAmount Hook
 *
 * Prefetches the total number of projects from the API.
 *
 * @hook
 */
function usePrefetchProjectAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetProjectAmount, usePrefetchProjectAmount };

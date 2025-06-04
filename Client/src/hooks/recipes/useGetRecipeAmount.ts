import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "recipes"],
  queryFn: async () => await apiClient.get<number>("/recipes/amount"),
};

/**
 * useGetRecipeAmount Hook
 *
 * A custom hook to fetch the total number of recipes.
 *
 * @hook
 */
function useGetRecipeAmount() {
  return useQuery(queryArg);
}

/**
 * usePrefetchRecipeAmount Hook
 *
 * A custom hook to prefetch the total number of recipes.
 *
 * @hook
 */
function usePrefetchRecipeAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetRecipeAmount, usePrefetchRecipeAmount };

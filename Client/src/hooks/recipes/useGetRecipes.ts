import { RecipeDto} from "@api/terminalSchemas.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

export type RecipesRequest = {
    pageNumber: number;
    pageSize: number;
    desc?: boolean;
}

export type RecipesResponse = {
    rows: RecipeDto[];
    pageAmount: number;
    rowsAmount: number;
}

async function fetchDataProject(params:RecipesRequest): Promise<RecipesResponse> {
    const recipes = await apiClient.get('/recipes', {params});
    const amountOfProjects = await apiClient.get('/recipes/amount');
    return{
        rows: recipes.data.recipes,
        pageAmount: Math.ceil(amountOfProjects.data / params.pageSize),
        rowsAmount: amountOfProjects.data,
    }
}

/**
 * useRecipes Hook
 *
 * Fetches recipes data from the API based on the provided parameters.
 * It uses React Query to manage the data fetching and caching.
 *
 * @hook
 * @param {RecipesRequest} params - The parameters for fetching recipes.
 */
export function useRecipes(params: RecipesRequest) {
    return useQuery(
        {
            queryKey: ['recipes', params],
            queryFn: () => fetchDataProject(params),
            placeholderData: keepPreviousData
        }
    )
}


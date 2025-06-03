import apiClient from "@api/apiClient";
import { Recipe } from "@api/models/Recipe";
import { useMutation } from "@tanstack/react-query";

async function addRecipe(recipe: Recipe) {
  return await apiClient.post("/recipes", recipe);
}

/**
 * useAddRecipe Hook
 *
 * A custom hook that provides a mutation function to add a new recipe.
 *
 * @hook
 */
function useAddRecipe() {
  return useMutation({
    mutationKey: ["addRecipe"],
    mutationFn: (recipe: Recipe) => addRecipe(recipe),
  });
}

export default useAddRecipe;

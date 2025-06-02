import apiClient from "@api/apiClient";
import { Recipe } from "@api/models/Recipe";
import { useMutation } from "@tanstack/react-query";

async function addRecipe(recipe: Recipe) {
  return await apiClient.post("/recipes", recipe);
}

function useAddRecipe() {
  return useMutation({
    mutationKey: ["addRecipe"],
    mutationFn: (recipe: Recipe) => addRecipe(recipe),
  });
}

export default useAddRecipe;

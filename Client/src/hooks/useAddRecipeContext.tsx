// context for managing the recipe

import { Recipe } from "@api/models/Recipe";
import { Step } from "@api/models/Step";
import { createContext, ReactNode, useContext, useState } from "react";

type AddRecipeContextValue = {
  recipe: Recipe;
  currentStep: number | null;
  setCurrentStep: (step: number | null) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, updatedStep: Step) => void;
  updateRecipe: (updatedRecipe: Recipe) => void;
  getCurrentStep: () => Step | null;
  findParameterIndex: (id: string | null) => number;
};

const AddRecipeContext = createContext<AddRecipeContextValue | null>(null);

function useAddRecipeContext(): AddRecipeContextValue {
  const context = useContext(AddRecipeContext);
  if (!context) {
    throw new Error(
      "useAddRecipeContext must be used within a AddRecipeProvider",
    );
  }
  return context;
}

const AddRecipeProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    name: "",
    steps: [],
  });

  const addStep = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, { id: "", comment: "", parameters: [] }],
    }));
  };

  const removeStep = (index: number) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.filter((_, i) => i !== index),
    }));
  };

  const updateStep = (index: number, updatedStep: Step) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.map((step, i) =>
        i === index ? updatedStep : step,
      ),
    }));
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipe(updatedRecipe);
  };

  const findParameterIndex = (id: string | null) => {
    if (currentStep === null) return -1;

    return recipe.steps[currentStep].parameters.findIndex((x) => x.id === id);
  };

  const getCurrentStep = () => {
    if (currentStep === null) return null;

    return recipe.steps[currentStep];
  };

  return (
    <AddRecipeContext.Provider
      value={{
        recipe,
        currentStep,
        setCurrentStep,
        addStep,
        removeStep,
        updateStep,
        updateRecipe,
        findParameterIndex,
        getCurrentStep,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  );
};
export { AddRecipeProvider, useAddRecipeContext };

import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import useAddRecipe from "@hooks/recipes/useAddRecipe";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext";
import { useState } from "react";
import { toastPromise } from "utils/toast.utils";
import AddRecipeDialog from "./AddRecipeDialog";
import AddSampleDialog from "@components/AddSample/AddSampleDialog";

const AddRecipeActions = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateRecipe, recipe } = useAddRecipeContext();
  const { mutateAsync } = useAddRecipe();
  return (
    <>
      <div className="flex border gap-2 border-gray-200 rounded-md bg-white overflow-auto p-2 justify-center shadow-sm">
        <button className="p-2 border border-gray-200 rounded hover:bg-gray-100 hover:border-red-300 transition-colors duration-100">
          <ArrowPathIcon
            onClick={() => updateRecipe({ id: "", name: "", steps: [] })}
            className="h-5 w-5"
          />
        </button>
        <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 hover:border-green-300 transition-colors duration-100 group">
          <CheckIcon className="h-5 w-5" onClick={() => setDialogOpen(true)} />
        </button>
      </div>
      <AddSampleDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        onSubmit={(name) =>
          toastPromise(mutateAsync({ ...recipe, name: name }), {
            loading: "loading",
            success: "Recipe added successfully",
            error: "Error while adding a recipe",
          })
        }
      />
    </>
  );
};

export default AddRecipeActions;

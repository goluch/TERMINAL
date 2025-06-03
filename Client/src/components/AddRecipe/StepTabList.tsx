import { TabList } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext";
import StepTab from "./StepTab";

const StepTabList = () => {
  const { addStep, recipe } = useAddRecipeContext();
  return (
    <TabList className="flex gap-1 w-full p-2 overflow-x-auto">
      <div className="overflow-x-auto flex gap-1 w-full">
        {recipe.steps.map((_, index) => (
          <StepTab key={index} index={index} />
        ))}
      </div>
      <button
        onClick={() => addStep()}
        className="p-2 rounded border border-gray-200 bg-white flex items-center justify-center aspect-square hover:bg-gray-100"
      >
        <PlusIcon className="h-5 aspect-square" />
      </button>
    </TabList>
  );
};

export default StepTabList;

import { Step } from "@api/models/Step";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useGetParameters, {
  AllParameters,
  DecimalParameter,
  TextParameter,
} from "@hooks/useGetParameters";
import { IntegerParameter } from "@hooks/useGetParameters";
import { ReactNode } from "react";
import { useDroppable, useDraggable, DraggableAttributes } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import clsx from "clsx";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { RecipeDragProvider } from "@hooks/useRecipeDragContext";
import {
  AddRecipeProvider,
  useAddRecipeContext,
} from "@hooks/useAddRecipeContext";

const AddRecipeWithContexts = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <AddRecipeProvider>
      <RecipeDragProvider parameters={parameters.parameters}>
        <AddRecipe />
      </RecipeDragProvider>
    </AddRecipeProvider>
  );
};

const AddRecipe = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();
  const { currentStep, setCurrentStep, recipe } = useAddRecipeContext();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <div className="p-2 flex gap-2 h-full">
      <div className="flex flex-col gap-2 w-80">
        <ParameterSelectList parameters={parameters.parameters} />
        <AddRecipeActions />
      </div>
      <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
        <div className="p-4 border-b border-gray-200 rounded-t-md">
          <p>Recipe</p>
        </div>
        <div className="bg-gray-100 h-full">
          <TabGroup
            className="flex flex-col overflow-y-hidden overflow-x-auto"
            selectedIndex={currentStep ?? undefined}
            onChange={setCurrentStep}
          >
            <StepTabList />
            <TabPanels className="h-full overflow-hidden rounded-md p-2">
              {recipe.steps.map((step, index) => (
                <TabPanel
                  key={index}
                  className="rounded-md bg-white border border-gray-200 h-screen shadow-sm w-full p-2 grid grid-cols-10 gap-2"
                >
                  <div className="flex flex-col gap-1 w-full col-span-6 overflow-y-auto">
                    <SortableContext
                      items={step.parameters}
                      strategy={horizontalListSortingStrategy}
                    >
                      <ParameterDroppable>
                        {step.parameters.map((parameter) => (
                          <ParameterBox
                            key={parameter.id}
                            parameter={parameter}
                          />
                        ))}
                      </ParameterDroppable>
                    </SortableContext>
                  </div>
                  <div className="flex flex-col gap-1 w-full col-span-4">
                    <div className="rounded-md border border-gray-200 shadow-sm">
                      <div className="border-b border-gray-200 rounded-t-md bg-gray-100">
                        <p className="p-2 text-sm">Comment</p>
                      </div>
                      <div className="p-2">
                        <textarea className="h-auto w-full" rows={20} />
                      </div>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

const AddRecipeActions = () => {
  return (
    <div className="flex border gap-2 border-gray-200 rounded-md bg-white overflow-auto p-2 justify-center shadow-sm">
      <button className="p-2 border border-gray-200 rounded hover:bg-gray-100 hover:border-red-300 transition-colors duration-100">
        <ArrowPathIcon className="h-5 w-5" />
      </button>
      <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 hover:border-green-300 transition-colors duration-100 group">
        <CheckIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

type ParameterSelectListProps = {
  parameters: AllParameters[];
};

const ParameterSelectList = ({ parameters }: ParameterSelectListProps) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md bg-white shadow-sm overflow-auto h-full">
      <div className="p-4 border-b border-gray-200 rounded-t-md">
        <p>Parameters</p>
      </div>
      <div className="flex flex-col gap-2 py-2">
        {parameters.map((parameter) => (
          <ParameterSelect key={parameter.id} parameter={parameter} />
        ))}
      </div>
    </div>
  );
};

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
        className="p-2 rounded border border-gray-200 bg-white flex items-center justify-center aspect-square hover:bg-gray-100 z-50"
      >
        <PlusIcon className="h-5 aspect-square" />
      </button>
    </TabList>
  );
};

type StepTabProps = {
  index: number;
};

const StepTab = ({ index }: StepTabProps) => {
  const { copyStepAsNext, removeStep } = useAddRecipeContext();
  return (
    <Tab
      as="div"
      key={index}
      className="w-full p-2 rounded border border-gray-200 bg-white relative group data-[selected]:bg-gray-50 focus:outline-none"
    >
      <p className="text-sm whitespace-nowrap text-center">Step {index + 1}</p>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center">
          <button
            onClick={() => copyStepAsNext(index)}
            className="group-hover:block rounded p-px hidden hover:bg-gray-100 bg-white"
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => removeStep(index)}
            className="group-hover:block rounded p-px hidden hover:bg-gray-100 bg-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Tab>
  );
};

const ParameterDroppable = ({ children }: { children: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-full w-full flex flex-col gap-1 col-span-6"
    >
      {children}
    </div>
  );
};

type ParameterBoxProps = {
  parameter: IntegerParameter | DecimalParameter | TextParameter;
};

export const ParameterSelect = ({ parameter }: ParameterBoxProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: parameter.name,
    data: parameter,
  });

  return (
    !isDragging && (
      <div className="px-2" ref={setNodeRef}>
        <div className="border border-gray-200 rounded flex items-center bg-white justify-between shadow-sm">
          <div className="p-2">
            <p className="text-xs">{parameter.name}</p>
          </div>
          <div className="bg-gray-100 border-s border-gray-200 p-1">
            <DragHandle listeners={listeners} attributes={attributes} />
          </div>
        </div>
      </div>
    )
  );
};

const ParameterBox = ({ parameter }: ParameterBoxProps) => {
  const { removeParameter, moveParameterUp, moveParameterDown, currentStep } =
    useAddRecipeContext();
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: parameter.id,
    data: parameter,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(0, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
      className={clsx(
        "rounded-md border border-gray-200 bg-white shadow-sm !tanslate-x-0",
        isDragging && "z-50",
      )}
    >
      <div className="border-b border-gray-200 rounded-t-md bg-gray-100 flex justify-between">
        <p className="p-2 text-sm">{parameter.name}</p>
        <div className="flex gap-2 px-2 items-center justify-center">
          <button onClick={() => moveParameterUp(currentStep, parameter.id)}>
            <ChevronUpIcon className="h-4 w-4" />
          </button>
          <button onClick={() => moveParameterDown(currentStep, parameter.id)}>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <button onClick={() => removeParameter(currentStep, parameter.id)}>
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start rounded-md border border-gray-200">
            <p className="text-xs border-e border-gray-200 p-2 bg-gray-100 text-gray-700">
              default
            </p>
            <input className="rounded-md w-full text-sm ms-2 focus:outline-none" />
            <DragHandle attributes={attributes} listeners={listeners} />
          </div>
          {(parameter.$type === "integer" || parameter.$type === "decimal") && (
            <div className="flex items-center justify-start rounded-md border border-gray-200">
              <p className="text-xs border-e border-gray-200 p-2 bg-gray-100 text-gray-700">
                unit
              </p>
              <p className="text-xs px-2">{parameter.unit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type DragHandleProps = {
  className?: string;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const DragHandle = ({ className, attributes, listeners }: DragHandleProps) => {
  return (
    <svg
      className={clsx("cursor-grab hover:bg-gray-200 rounded", className)}
      {...attributes}
      {...listeners}
      fill="#333333"
      width="30px"
      height="30px"
      viewBox="0 0 36 36"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>drag-handle-line</title>
      <circle
        cx="15"
        cy="12"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-1"
      ></circle>
      <circle
        cx="15"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-2"
      ></circle>
      <circle
        cx="21"
        cy="12"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-3"
      ></circle>
      <circle
        cx="21"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-4"
      ></circle>
      <circle
        cx="21"
        cy="18"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-5"
      ></circle>
      <circle
        cx="15"
        cy="18"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-6"
      ></circle>
      <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </svg>
  );
};

export default AddRecipeWithContexts;

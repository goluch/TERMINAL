import Step from "@components/Recipes/Step";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useGetParameters, {
  AllParameters,
  DecimalParameter,
  TextParameter,
} from "@hooks/useGetParameters";
import { IntegerParameter } from "@hooks/useGetParameters";
import { useState, ReactNode } from "react";
import {
  useDroppable,
  useDraggable,
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  closestCenter,
  DraggableAttributes,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS, useUniqueId } from "@dnd-kit/utilities";
import { v4 as uuidv4, validate } from "uuid";
import clsx from "clsx";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type Step = {
  id: string;
  comment: string;
  parameters: AllParameters[];
};

type Recipe = {
  id: string;
  name: string;
  steps: Step[];
};

const AddRecipe = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [index, setIndex] = useState<number | undefined>(undefined);

  const handleDragStart = (event: DragStartEvent) => {
    const target = event.active.id;
    setActiveId(target.toString());
  };

  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    name: "",
    steps: [
      { id: "", comment: "", parameters: [] },
      { id: "", comment: "", parameters: [] },
    ],
  });

  const handleDragOver = (event: DragOverEvent) => {
    if (index === undefined) return;
    if (event.over === null) return;

    const active_indx = recipe.steps[index].parameters.findIndex(
      (x) => x.id === activeId,
    );
    const over_indx = recipe.steps[index].parameters.findIndex(
      (x) => x.id === event.over?.id,
    );

    if (active_indx !== -1 && over_indx !== -1) {
      if (active_indx === over_indx) return;
      const steps = [...recipe.steps];
      steps[index].parameters = arrayMove(
        steps[index].parameters,
        active_indx,
        over_indx,
      );
      setRecipe({ ...recipe, steps });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (
      activeId === null ||
      index === undefined ||
      event.over?.id !== "droppable"
    )
      return;
    if (validate(activeId)) setActiveId(null);

    recipe.steps[index].parameters = [
      ...recipe.steps[index].parameters,
      {
        type: "integer",
        value: 1,
        defaultValue: 20,
        unit: "mm",
        step: 1,
        name: activeId,
        id: uuidv4(),
        order: 0,
        parentId: "",
      },
    ];
    setActiveId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  const addStep = () => {
    setRecipe({
      ...recipe,
      steps: [
        ...recipe.steps,
        {
          id: "",
          comment: "",
          parameters: [
            {
              type: "integer",
              value: 1,
              defaultValue: 20,
              unit: "mm",
              step: 1,
              name: "H20",
              id: "",
              order: 0,
              parentId: "",
            },
          ],
        },
      ],
    });
  };

  const removeStep = (index: number) => {
    setRecipe({
      ...recipe,
      steps: recipe.steps.filter((_, i) => i !== index),
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {!validate(activeId) && (
        <DragOverlay>
          {activeId && (
            <ParameterSelect
              parameter={{
                id: "dupa",
                name: activeId,
                unit: "dupa",
                step: 1,
                type: "integer",
                value: 0,
                defaultValue: 0,
                order: 0,
                parentId: "",
              }}
            />
          )}
        </DragOverlay>
      )}
      <div className="p-2 flex gap-2 h-full">
        <div className="flex flex-col gap-2 w-80">
          <div className="flex flex-col border border-gray-200 rounded-md bg-white overflow-auto h-full">
            <div className="p-4 border-b border-gray-200 rounded-t-md">
              <p>Parameters</p>
            </div>
            <div className="flex flex-col gap-2 py-2">
              {parameters.parameters.map((parameter) => (
                <ParameterSelect key={parameter.id} parameter={parameter} />
              ))}
            </div>
          </div>
          <div className="flex border gap-2 border-gray-200 rounded-md bg-white overflow-auto p-2 justify-center">
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-100 hover:border-red-300 transition-colors duration-100">
              <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 hover:border-green-300 transition-colors duration-100 group">
              <CheckIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
          <div className="p-4 border-b border-gray-200 rounded-t-md">
            <p>Recipe</p>
          </div>
          <div className="bg-gray-100 h-full">
            <TabGroup
              className="flex flex-col overflow-y-hidden overflow-x-auto"
              selectedIndex={index}
              onChange={setIndex}
            >
              <TabList className="flex gap-1 w-full p-2 overflow-x-auto">
                <div className="overflow-x-auto flex gap-1 w-full">
                  {recipe.steps.map((_, index) => (
                    <Tab
                      key={index}
                      className="w-full p-2 rounded border border-gray-200 bg-white relative group data-[selected]:bg-gray-50 focus:outline-none"
                    >
                      <p className="text-sm whitespace-nowrap">
                        Step {index + 1}
                      </p>
                      <button
                        onClick={() => removeStep(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:block rounded p-px hidden hover:bg-gray-100 bg-white"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </Tab>
                  ))}
                </div>
                <button
                  onClick={addStep}
                  className="p-2 rounded border border-gray-200 bg-white flex items-center justify-center aspect-square hover:bg-gray-100 z-50"
                >
                  <PlusIcon className="h-5 aspect-square" />
                </button>
              </TabList>
              <TabPanels className="h-full overflow-hidden rounded-md p-2">
                {recipe.steps.map((step, index) => (
                  <TabPanel
                    key={index}
                    className="rounded-md bg-white border border-gray-200 h-screen w-full p-2 grid grid-cols-10 gap-2"
                  >
                    <div className="flex flex-col gap-1 w-full col-span-6">
                      <SortableContext items={step.parameters}>
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
                      <div className="rounded-md border border-gray-200">
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
    </DndContext>
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

const ParameterSelect = ({ parameter }: ParameterBoxProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: parameter.name,
    });

  return (
    !isDragging && (
      <div className="px-2" ref={setNodeRef}>
        <div className="border border-gray-200 rounded flex items-center bg-white justify-between">
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
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: parameter.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "rounded-md border border-gray-200 bg-white",
        isDragging && "z-50",
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="border-b border-gray-200 rounded-t-md bg-gray-100 flex justify-between">
        <p className="p-2 text-sm">{parameter.name}</p>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-start rounded-md border border-gray-200">
          <p className="text-xs border-e border-gray-200 p-2 bg-gray-100 text-gray-700">
            default
          </p>
          <input className="rounded-md w-full text-sm ms-2" />
          <DragHandle attributes={attributes} listeners={listeners} />
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

export default AddRecipe;

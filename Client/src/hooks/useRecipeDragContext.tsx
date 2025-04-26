// context for managing the recipe drag and drop functionality, depends on AddRecipeContext

import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import { useAddRecipeContext } from "./useAddRecipeContext";
import { arrayMove } from "@dnd-kit/sortable";
import { AllParameters } from "./useGetParameters";
import { ParameterSelect } from "@pages/AddRecipe";

type RecipeDragContextValue = {
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragStartEvent) => void;
  onDragEnd: (event: DragStartEvent) => void;
};

const RecipeDragContext = createContext<RecipeDragContextValue | null>(null);

function useRecipeDragContext(): RecipeDragContextValue {
  const context = useContext(RecipeDragContext);
  if (!context) {
    throw new Error(
      "useAddRecipeContext must be used within a AddRecipeProvider",
    );
  }
  return context;
}

const RecipeDragProvider = ({
  children,
  parameters,
}: {
  children: ReactNode;
  parameters: AllParameters[];
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { currentStep, findParameterIndex, getCurrentStep, updateStep } =
    useAddRecipeContext();

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragStart = (event: DragStartEvent) => {
    const target = event.active.id;
    setActiveId(target.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (currentStep === null || event.over === null) return;

    const activeIndex = findParameterIndex(activeId);
    const overIndex = findParameterIndex(event.over?.id.toString());

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
      return;

    const step = getCurrentStep();
    if (step === null) return;

    const newStep = { ...step };
    newStep.parameters = arrayMove(newStep.parameters, activeIndex, overIndex);

    updateStep(currentStep, newStep);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (
      activeId === null ||
      currentStep === null ||
      event.over?.id !== "droppable"
    )
      return;
    if (validate(activeId)) {
      setActiveId(null);
      return;
    }

    const item = parameters.find((x) => x.name === activeId);
    if (!item) {
      setActiveId(null);
      return;
    }

    const step = getCurrentStep();
    if (step === null) return;

    const newStep = { ...step };

    newStep.parameters = [
      ...newStep.parameters,
      {
        ...item,
        id: uuidv4(),
      },
    ];

    updateStep(currentStep, newStep);
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
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
                $type: "integer",
                value: 0,
                defaultValue: 0,
                order: 0,
                parentId: "",
              }}
            />
          )}
        </DragOverlay>
      )}
      {children}
    </DndContext>
  );
};

export { useRecipeDragContext, RecipeDragProvider };

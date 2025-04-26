import { TabList, Tab } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AllParameters } from "@hooks/useGetParameters";

type Step = {
  id: string;
  comment: string;
  parameters: AllParameters[];
};

type StepTabListProps = {
  steps: Step[];
  onTabRemove: (index: number) => void;
  onTabAdd: () => void;
};

const StepTabList = ({ onTabRemove, onTabAdd, steps }: StepTabListProps) => {
  return (
    <TabList className="flex gap-1 w-full p-2 overflow-x-auto">
      <div className="overflow-x-auto flex gap-1 w-full">
        {steps.map((_, index) => (
          <StepTab key={index} index={index} onRemove={onTabRemove} />
        ))}
      </div>
      <button
        onClick={onTabAdd}
        className="p-2 rounded border border-gray-200 bg-white flex items-center justify-center aspect-square hover:bg-gray-100 z-50"
      >
        <PlusIcon className="h-5 aspect-square" />
      </button>
    </TabList>
  );
};

type StepTabProps = {
  index: number;
  onRemove: (index: number) => void;
};

const StepTab = ({ index, onRemove }: StepTabProps) => {
  return (
    <Tab
      key={index}
      className="w-full p-2 rounded border border-gray-200 bg-white relative group data-[selected]:bg-gray-50 focus:outline-none"
    >
      <p className="text-sm whitespace-nowrap">Step {index + 1}</p>
      <button
        onClick={() => onRemove(index)}
        className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:block rounded p-px hidden hover:bg-gray-100 bg-white"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </Tab>
  );
};

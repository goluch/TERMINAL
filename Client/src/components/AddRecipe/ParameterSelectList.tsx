import { AllParameters } from "@api/models/Parameters";
import { ParameterSelect } from "./ParameterSelect";

type ParameterSelectListProps = {
  parameters: AllParameters[];
};

/**
 * ParameterSelectList Component
 *
 * A component that displays a list of selectable parameters.
 * It allows users to select parameters for a recipe, with each parameter displayed as a selectable item.
 *
 * @component
 */
const ParameterSelectList = ({ parameters }: ParameterSelectListProps) => {
  return (
    <div className="flex flex-col flex-grow border border-gray-200 rounded-md bg-white shadow-sm overflow-auto">
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

export default ParameterSelectList;

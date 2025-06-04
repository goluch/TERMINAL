import InputField from "../Shared/InputField";
import { useState } from "react";
import { DialogButton } from "../Shared/DialogComp";
import useAddProject from "@hooks/projects/useAddProject";
import { toastPromise } from "utils/toast.utils";

/**
 * NewProjectForm Component
 *
 * A form component that allows users to add a new project.
 *
 * @component
 */
const NewProjectForm = () => {
  const { mutateAsync } = useAddProject();
  const [projectName, setProjectName] = useState("");
  const [isProjectNameValid, setIsProjectNameValid] = useState(true);

  const checkIfNameIsValid = (name: string) => {
    return name.length >= 3 && name.length <= 50;
  };

  const handleSubmit = async () => {
    const projectNameValid = checkIfNameIsValid(projectName);
    setIsProjectNameValid(projectNameValid);

    if (!projectNameValid) return;

    await toastPromise(mutateAsync({ name: projectName }), {
      success: "Project added succesfully",
      loading: "Adding project...",
      error: "Failed adding project",
    });

    setProjectName("");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
        <div className="flex justify-between items-center w-full pb-5">
          <p className="font-medium text-lg">Add new project</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <InputField
              label="Name"
              value={projectName}
              onChange={(e) => setProjectName(e.currentTarget.value)}
              isValid={isProjectNameValid}
              validationInfo="Project name must be between 3 and 50 characters long"
            />
          </div>
          <DialogButton
            className="hover:border-green-400"
            onClick={handleSubmit}
          >
            Add Project
          </DialogButton>
        </div>
      </div>
    </div>
  );
};

export default NewProjectForm;

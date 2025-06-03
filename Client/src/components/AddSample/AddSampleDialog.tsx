import { ProjectDto } from "@api/terminalSchemas";
import {
  DialogButton,
  DialogComp,
  DialogProps,
} from "@components/Shared/DialogComp";
import InputField from "@components/Shared/Forms/InputField";
import { SelectItem, LabeledSelect } from "@components/Shared/LabeledSelect";
import { Checkbox } from "@headlessui/react";
import { useProjects } from "@hooks/projects/useGetProjects";
import { useState } from "react";

function isRecipeNameValid(name: string) {
  return name.length >= 5;
}

type AddSampleDialogProps = Omit<DialogProps, "title"> & {
  onSubmit: (name: string) => void;
};

const AddSampleDialog = ({
  onSubmit,
  setIsOpen,
  ...rest
}: AddSampleDialogProps) => {
  const [recipeName, setRecipeName] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(
    null,
  );
  const [isNameValid, setIsNameValid] = useState(true);

  const { data, isLoading } = useProjects({ pageSize: 999, pageNumber: 0 });

  const handleClose = () => {
    setRecipeName("");
    setIsNameValid(true);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!isRecipeNameValid(recipeName)) {
      setIsNameValid(false);
      return;
    }

    onSubmit(recipeName);
    handleClose();
  };

  if (isLoading) return <div></div>;

  return (
    <DialogComp
      {...rest}
      title="Add sample"
      setIsOpen={setIsOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col">
        <InputField
          label="Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.currentTarget.value)}
          isValid={isNameValid}
          validationInfo="Sample name must be at least 5 characters long"
        />
        <LabeledSelect
          label="Project"
          value={selectedProject}
          displayValue={(project) => project?.name ?? ""}
          onChange={setSelectedProject}
          isValid={isNameValid}
          validationInfo="Choose a project from the list"
        >
          {data?.rows.map((project) => (
            <SelectItem<ProjectDto>
              key={project.id}
              value={project}
              displayValue={project.name}
            />
          ))}
        </LabeledSelect>
        <Checkbox />
      </div>
      <DialogButton className="hover:border-green-400" onClick={handleSubmit}>
        Add sample
      </DialogButton>
      <DialogButton className="hover:border-red-400" onClick={handleClose}>
        Cancel
      </DialogButton>
    </DialogComp>
  );
};

export default AddSampleDialog;

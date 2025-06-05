import IconButton from "@components/Shared/IconButton";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";

type ProjectsRowActions = {
  onEdit: () => void;
  onDelete: () => void;
};
const ProjectsRowActions = ({ onEdit, onDelete }: ProjectsRowActions) => {
  return (
    <div className="flex gap-1">
      <IconButton
        onClick={onEdit}
        className="hover:bg-gray-100 hover:border-blue-200"
      >
        <EllipsisHorizontalIcon className="h-4 rounded-md" />
      </IconButton>
      <IconButton
        onClick={onDelete}
        className="hover:bg-gray-100 hover:border-red-200"
      >
        <XMarkIcon className="h-4 rounded-md" />
      </IconButton>
    </div>
  );
};

export default ProjectsRowActions;

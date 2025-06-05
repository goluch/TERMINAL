import IconButton from "@components/Shared/IconButton";
import {
  PencilIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type UsersRowActions = {
  onEdit: () => void;
  onDelete: () => void;
  onChangePassword: () => void;
};
const UsersRowActions = ({
  onEdit,
  onDelete,
  onChangePassword,
}: UsersRowActions) => {
  return (
    <div className="flex gap-1">
      <IconButton
        onClick={onEdit}
        className="hover:bg-gray-100 hover:border-blue-200"
      >
        <PencilIcon className="h-4 rounded-md" />
      </IconButton>
      <IconButton
        onClick={onChangePassword}
        className="hover:bg-gray-100 hover:border-blue-200 hidden"
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

export default UsersRowActions;

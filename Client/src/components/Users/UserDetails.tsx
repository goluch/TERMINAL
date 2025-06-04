import { useState, useEffect } from "react";
import { UserDetailsDto } from "@api/terminalSchemas.ts";
import InputField from "@components/Shared/InputField";
import { DialogButton, DialogComp } from "@components/Shared/DialogComp";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export interface UserDetailsProps {
  dataQuery: UserDetailsDto;
  onDeleted: (id: string) => void;
  onSubmit: (id: string, email: string, role: string) => void;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

/**
 * UserDetails Component
 *
 * Displays details of a user including email and role.
 * Provides functionality to reset changes, submit changes, change password, and delete the user.
 *
 * @component
 */
const UserDetails = (props: UserDetailsProps) => {
  const [email, setEmail] = useState(props.dataQuery?.email);
  const [role, setRole] = useState(props.dataQuery?.role);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setEmail(props.dataQuery?.email || "");
    setRole(props.dataQuery?.role || "");
    setIsChanged(false);
  }, [props.dataQuery]);

  const handleReset = () => {
    setEmail(props.dataQuery?.email || "");
    setRole(props.dataQuery?.role || "");
    setIsChanged(false);
  };

  const handleDeletion = () => {
    if (props.dataQuery?.id) {
      props.onDeleted(props.dataQuery.id);
    }
  };

  return (
    <DialogComp
      isOpen={props.open}
      setIsOpen={props.setOpen}
      title={"Edit user"}
    >
      <InputField
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsChanged(true);
        }}
      />
      {/* TODO: Change to combobox after merging */}
      <InputField
        label="Role"
        id="role"
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          setIsChanged(true);
        }}
      />
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-1">
          <DialogButton
            disabled={!isChanged}
            className="hover:border-blue-400 "
            onClick={() => props.onSubmit(props.dataQuery.id, email, role)}
          >
            Submit changes
          </DialogButton>
          <DialogButton
            disabled={!isChanged}
            className="!w-fit hover:border-blue-400"
            onClick={handleReset}
          >
            <ArrowPathIcon className="h-4 w-4" />
          </DialogButton>
        </div>
        <DialogButton className="hover:border-blue-400">
          Change password
        </DialogButton>
        <DialogButton
          className="border-red-200 hover:border-red-400"
          onClick={handleDeletion}
        >
          Delete
        </DialogButton>
      </div>
    </DialogComp>
  );
};

export default UserDetails;

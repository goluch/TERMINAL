import { useState, useEffect } from "react";
import { UserDetailsDto } from "@api/terminalSchemas.ts";
import { Button, Input, Select } from "@headlessui/react";

import {
  EnvelopeIcon,
  KeyIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

export interface UserDetailsProps {
  dataQuery: UserDetailsDto;
  onDeleted: (id: string) => void;
  onSubmit: (id: string, email: string, role: string) => void;
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
    <div className="border border-gray-200 rounded-lg bg-white p-2">
      <div className="text-lg font-medium border-b border-gray-200 h-[40.5px] p-2 flex">
        User Details
      </div>
      <div className="flex items-center font-light text-sm text-gray-600">
        <EnvelopeIcon className="w-6 h-6 pr-2" />
        <p className="font-medium flex items-center pr-1">Email:</p>
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsChanged(true);
          }}
          className="bg-gray-200 px-3 py-2 rounded mt-2 text-gray-500"
        />
      </div>
      <div className="flex items-center font-light text-sm text-gray-600">
        <UserIcon className="w-6 h-6 pr-2" />
        <p className="font-medium flex items-center pr-1">Role:</p>
        <Select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setIsChanged(true);
          }}
          className="bg-gray-200 px-3 py-2 rounded mt-2 text-gray-500"
        >
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="Registered">Registered</option>
          <option value="Guest">Guest</option>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Button
          className="btn btn-sm btn-soft rounded"
          onClick={handleReset}
          disabled={!isChanged}
        >
          Reset
        </Button>
        <Button
          className="btn btn-sm btn-soft rounded"
          onClick={() => props.onSubmit(props.dataQuery.id, email, role)}
          disabled={!isChanged}
        >
          Submit changes
        </Button>
        <Button className="btn btn-sm btn-primary text-white rounded gap-1">
          <KeyIcon className="w-4 h-4" />
          Change password
        </Button>
        <Button
          className="btn btn-sm btn-error text-white rounded gap-1"
          onClick={handleDeletion}
          disabled={!props.dataQuery?.id}
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;

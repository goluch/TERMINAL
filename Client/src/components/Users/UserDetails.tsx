import { useState } from "react";
import {AxiosResponse} from "axios";
import { UseMutationResult } from '@tanstack/react-query';
import { UserDetailsDto } from "@api/terminalSchemas.ts";
import { Button } from '@headlessui/react'
import { Input } from '@headlessui/react'
/**
 * Props for the UserDetails component.
 */
export interface UserDetailsProps {
    dataQuery: UserDetailsDto | undefined;
    mutation: UseMutationResult<AxiosResponse<any>, Error, string, unknown>;
    onUserDeleted: () => void;
}

/**
 * UserDetails component displays and allows editing of user details such as email and role.
 *
 * @param {UserDetailsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered UserDetails component.
 */
const UserDetails = (props: UserDetailsProps) => {
    const [email, setEmail] = useState(props.dataQuery?.email || "");
    const [role, setRole] = useState(props.dataQuery?.role || "");
    const [isChanged, setIsChanged] = useState(false);

    const handleReset = () => {
        setEmail(props.dataQuery?.email || "");
        setRole(props.dataQuery?.role || "");
        setIsChanged(false);
    };

    const handleSubmit = () => {
        // to be implemented
    };

    const handleDeletion = () => {
        if (props.dataQuery?.id) {
            props.mutation.mutateAsync(props.dataQuery.id);
            props.onUserDeleted();
        }
    };

    return (
        <div className="card-body">
            <div className="card-title text-4xl">User</div>
            <div className="divider"></div>
            <div className="grid grid-cols-[35%_65%] gap-y-3">
                <div className="font-bold">Email:</div>
                <b><div>{props.dataQuery?.email}</div></b>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mt-1">
                        Email*
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder={props.dataQuery?.email}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsChanged(true);
                        }}
                        className="bg-gray-200 px-3 py-2 rounded mt-2 text-gray-500"
                    />
                </div>
                <div></div>
                <div className="flex flex-col">
                    <label htmlFor="text" className="mt-1">
                        Role*
                    </label>
                    <select
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                            setIsChanged(true);
                        }}
                        className="bg-gray-200 px-3 py-2 rounded mt-2 text-gray-500"
                    >
                        <option value="Role">{props.dataQuery?.role}</option>
                        <option>Moderator</option>
                        <option>User</option>
                        <option>Guest</option>
                    </select>
                </div>
                <div></div>
                <div className="mt-6 flex gap-2">
                    <Button
                        className="btn btn-sm btn-soft rounded"
                        onClick={handleReset}
                        disabled={!isChanged}
                    >
                        Reset
                    </Button>
                    <Button
                        className="btn btn-sm btn-soft rounded"
                        onClick={handleSubmit}
                        disabled={!isChanged || props.mutation.isPending}
                    >
                        Submit changes
                    </Button>
                    <Button className="btn btn-sm btn-primary text-white rounded">Change password</Button>
                    <Button
                        className="btn btn-sm btn-error text-white rounded"
                        onClick={handleDeletion}
                        disabled={props.mutation.isPending}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
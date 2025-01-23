import UserComp from "./UserComp.tsx";
import {Button} from '@headlessui/react'
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import DialogComp from "../Shared/DialogComp.tsx";
import InvitationForm from "./InvitationForm.tsx";

export interface User {
    email: string,
    role: string
}

const Users = () => {

    const users: User[] = [
        {
            email: "Test",
            role: "Test"
        }
    ];

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            {users.map((user) =>
                <UserComp
                    key={user.email}
                    user={user}
                />
            )}

            <Button
                className="btn "
                onClick={() => setIsOpen(true)}
            >
                <PlusCircleIcon className="h-6 w-6 mt-0.5"/>
                Invite User
            </Button>

            <DialogComp
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="TEST"
            >
                <InvitationForm/>
            </DialogComp>

        </div>
    );
};

export default Users;
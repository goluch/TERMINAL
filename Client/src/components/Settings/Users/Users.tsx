import UserComp from "./UserComp.tsx";
import {Button} from '@headlessui/react'
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import DialogComp from "../../Shared/DialogComp.tsx";
import InvitationForm from "./InvitationForm.tsx";

export interface User {
    email: string,
    role: string
}

const Users = () => {

    const user: User =
        {
            email: "Test",
            role: "Test"
        };

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex w-full flex-wrap justify-center bg-white p-3 rounded-md">

            <UserComp user={user} />

            <div className="w-full flex justify-end">
                <Button
                    className="btn"
                    onClick={() => setIsOpen(true)}
                >
                    <PlusCircleIcon className="h-6 w-6 mt-0.5"/>
                    Invite User
                </Button>
            </div>

            <DialogComp
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Invite new user"
            >
                <InvitationForm />
            </DialogComp>

        </div>
    );
};

export default Users;
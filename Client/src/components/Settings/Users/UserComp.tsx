import {User} from "./Users.tsx";
import {Button} from "@headlessui/react";

interface UserProps {
    user: User
}

const UserComp = (props: UserProps) => {
    return (
        <>
            <div className="card w-96 shadow-xl my-4">
                <div className="card-body">

                    <h2 className="card-title">USER</h2>

                    <div> Email: {props.user.email}</div>
                    <div> Role: {props.user.role}</div>

                    <div className="card-actions justify-end">
                        {/* TODO: Delete User, change role etc */}
                        <Button
                            className="btn btn-sm "
                            onClick={() => console.log("Change password")}
                        >
                            Change Password
                        </Button>
                        <Button
                            className="btn btn-error btn-sm"
                            onClick={() => console.log("DELETE")}
                        >
                            Delete User
                        </Button>
                    </div>

                </div>
            </div>
            <div className="divider"></div>
        </>);
};

export default UserComp;
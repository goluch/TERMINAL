import {User} from "./Users.tsx";

interface UserProps {
    user: User
}

const UserComp = (props: UserProps) => {
    return (
        <div>
            USER
            <div> Email: {props.user.email}</div>
            <div> Role: {props.user.role}</div>

            {/* TODO: Delete User, change role etc */}
        </div>
            );
};

export default UserComp;
import {useState} from 'react';
import UserProfileDropdown from "./UserProfileDropdown.tsx";
import UserAuthButtons from "./UserAuthButtons.tsx";

const UserItems = () => {
    const [isAuth] = useState(false);

    return (
        <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuth ?
                <UserProfileDropdown />
                :
                <UserAuthButtons />
            }
        </div>
    )
        ;
};

export default UserItems;
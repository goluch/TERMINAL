import {Link} from "react-router-dom";
import {IdentificationIcon, KeyIcon} from "@heroicons/react/24/outline";

const UserAuthButtons = () => {
    return(
        <ul className="menu-horizontal flex-nowrap">
            <li className="p-2 text-sm ">
                <Link
                    to={{
                        pathname: `/login`
                    }}
                    className="flex rounded-md items-center p-1 text-gray-400 hover:bg-gray-700 "
                >
                    <KeyIcon className="h-6 w-6 mt-0.5 "/>
                    <div className="p-1 text-base ">Login</div>
                </Link>
            </li>
            <li className="p-2 text-sm">
                <Link
                    to={{
                        pathname: `/register`
                    }}
                    className="flex rounded-md items-center p-1 text-gray-700 bg-gray-400 hover:bg-gray-300 hover:text-gray-800"
                >
                    <IdentificationIcon className="h-7 w-7 mt-0.5 "/>
                    <div className="p-1 text-base">Sign up</div>
                </Link>
            </li>
        </ul>
    );
};

export default UserAuthButtons;
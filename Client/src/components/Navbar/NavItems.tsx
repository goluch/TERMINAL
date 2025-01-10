import {Link} from "react-router-dom";
import classNames from "classnames";
import {Navigation} from "./Navbar.tsx";

interface NavItemsProps {
    navigationItems: Navigation[];
}

const NavItems = (props: NavItemsProps) => {

    return (
        <div className="hidden sm:ml-6 sm:block content-start">
            <ul className="space-x-4 menu menu-horizontal px-1 flex-nowrap">
                {props.navigationItems.map((item, index) => (
                    <li  key={index}>
                        <Link
                            key={index}
                            to={{
                                pathname: `${item.href}`
                            }}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white active' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 lg:text-lg md:text-md sm:text-sm',
                            )}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavItems;
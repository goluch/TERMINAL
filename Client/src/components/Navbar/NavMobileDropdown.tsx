import {Navigation} from "./Navbar.tsx";
import {Link} from "react-router-dom";
import {Bars3Icon} from '@heroicons/react/24/outline'
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";

interface MobileDropdownButtonProps {
    navigationItems: Navigation [];
}

const NavMobileDropdown = (props: MobileDropdownButtonProps) => {
    return (
        <Menu as="div" className="relative ml-3 dropdown sm:hidden">
                <MenuButton
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none hover:bg-gray-700 btn btn-ghost btn-circle text-gray-400">
                    <Bars3Icon className="h-7 w-7 text-gray-400"/>
                </MenuButton>
            <MenuItems
                transition
                className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                {props.navigationItems.map((item, index) => (
                        <MenuItem key={index}>
                        <Link
                            to={{
                                pathname: `${item.href}`
                            }}
                            aria-current={item.current ? 'page' : undefined}
                            className='rounded-md block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                        >
                            {item.name}
                        </Link>
                        </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
};

export default NavMobileDropdown;
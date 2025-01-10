import { Disclosure} from '@headlessui/react'
import { CommandLineIcon} from '@heroicons/react/24/outline'
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import NavMobileDropdown from "./NavMobileDropdown.tsx";
import UserItems from "./UserItems.tsx";
import NavItems from "./NavItems.tsx";

export interface Navigation {
    name: string;
    href: string;
    current: boolean;
}

const Navbar = () => {

    const location = useLocation()

    const [navigation, setNavigation] = useState([
        { name: 'Home',  href: '/', current: location.pathname === "/" },
        { name: 'Test1', href: '/test1', current: location.pathname === "/test1" },
        { name: 'Test2', href: '/test2', current: location.pathname === "/test2" },
        { name: 'Test3', href: '/tes3', current: location.pathname === "/test3" },
    ])

    useEffect(() => {
        const onChangePage = (href: string) => {
            const nextNav = navigation.map((nav) => {
                if (href === nav.href) return { ...nav, current: true };
                else return { ...nav, current: false };
            });
            setNavigation(nextNav);
        };

        onChangePage(location.pathname);
    }, [location.pathname]);

    return (
        <Disclosure as="nav" className="bg-gray-800 navbar px-2 sm:px-6 lg:px-8 w-full">
            <div className="relative flex h-16 items-center w-full">

                {/*Small devices */}
                <NavMobileDropdown navigationItems={navigation}/>

                {/*Default */}
                <div className="flex flex-1  sm:items-stretch sm:justify-start flex-nowrap ">
                    <div className="shrink-0 hidden sm:block content-center">
                        <CommandLineIcon className="h-12 w-12 text-gray-400"/>
                    </div>
                    <NavItems  navigationItems={navigation}/>
                </div>

                <UserItems/>
            </div>
        </Disclosure>
    )
};

export default Navbar;


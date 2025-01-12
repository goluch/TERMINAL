import { Disclosure} from '@headlessui/react'
import { CommandLineIcon} from '@heroicons/react/24/outline'
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import NavMobileDropdown from "./NavMobileDropdown.tsx";
import NavItems from "./NavItems.tsx";
import UserProfileDropdown from "./UserProfileDropdown.tsx";
import UserAuthButtons from "./UserAuthButtons.tsx";

export interface Navigation {
    name: string;
    href: string;
    current: boolean;
}

const Navbar = () => {

    const [isAuth] = useState(true);

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
        <Disclosure as="nav" className="navbar bg-base-100">

            <div className="navbar-start">
                <CommandLineIcon className="h-10 w-10 hidden sm:block"/>
                <NavMobileDropdown navigationItems={navigation}/>
            </div>

            <div className="navbar-center hidden md:flex">
                <NavItems navigationItems={navigation}/>
            </div>

            <div className="navbar-end">
                {isAuth ?
                    (<UserProfileDropdown />)
                :
                    (<UserAuthButtons />)
                }
            </div>


        </Disclosure>
    )
};

export default Navbar;


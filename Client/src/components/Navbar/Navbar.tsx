import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {Bars3Icon, UserCircleIcon, CommandLineIcon, XMarkIcon, IdentificationIcon, KeyIcon} from '@heroicons/react/24/outline'
import classNames from 'classnames';
import {Link} from "react-router-dom";
import {useState} from "react";



const Navbar = () => {
    const [isAuth] = useState(false);

    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/', current: true },
        { name: 'Test1', href: '/', current: false },
        { name: 'Test2', href: '/', current: false },
        { name: 'Test3', href: '/', current: false },
    ])

    const handleSwitchPage = (key: number) => {
        const nextNav = navigation.map((nav, index) => {
            if(key === index) return {...nav, current: true} ;
            else return {...nav, current: false} ;
        })
        setNavigation(nextNav);
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <CommandLineIcon className="h-10 w-10 mt-0.5 text-gray-400"/>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={{
                                            pathname: `${item.href}`
                                        }}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                        onClick={() => handleSwitchPage(index)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        {isAuth ?
                            (<Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton
                                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none hover:bg-gray-700">
                                        {/*<span className="absolute -inset-1.5" />*/}
                                        <span className="sr-only">Open user menu</span>
                                        <UserCircleIcon className="h-10 w-10 mt-0.5 text-gray-400"/>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Your Profile
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>)
                            :
                            (<>
                                <div className="p-2 text-sm ">
                                    <Link
                                        to={{
                                            pathname: `/login`
                                        }}
                                        className="flex rounded-md items-center p-1 text-gray-400 hover:bg-gray-500 hover:text-gray-900"
                                    >
                                        <KeyIcon className="h-6 w-6 mt-0.5 "/>
                                        <div className="p-1 text-base ">Login</div>
                                    </Link>
                                </div>
                                <div className=" p-2 text-sm">
                                    <Link
                                        to={{
                                            pathname: `/register`
                                        }}
                                        className="flex rounded-md items-center p-1 text-gray-700 bg-gray-400 hover:bg-gray-300 hover:text-gray-800"
                                    >
                                        <IdentificationIcon className="h-7 w-7 mt-0.5 "/>
                                        <div className="p-1 text-base">Sign up</div>
                                    </Link>
                                </div>
                            </>)
                        }


                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
};

export default Navbar;


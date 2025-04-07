import { Disclosure } from "@headlessui/react";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { EyeDropperIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import NavMobileDropdown from "./NavMobileDropdown";
import { Link } from "react-router-dom";

/**
 * Interface for navigation items
 */
export interface Navigation {
  name: string;
  href: string;
}

const navigation: Navigation[] = [
  { name: "Home", href: "/" },
  { name: "Add project", href: "/add-new-project" },
  { name: "Projects", href: "/projects" },
  { name: "Recipes", href: "/recipes" },
];

/**
 * Navbar Component
 *
 * A navigation bar component that includes navigation items, a user profile dropdown, and authentication buttons.
 *
 * @component
 */
const Navbar = () => {
  return (
    <Disclosure
      as="nav"
      className="h-screen min-h-screen max-h-screen w-80 p-2"
    >
      <NavMobileDropdown navigationItems={navigation} />
      <div className="h-full hidden sm:inline-flex w-full flex-col justify-between rounded-md border border-solid bg-white border-gray-200">
        <div className="navbar-start w-full flex flex-col rounded-md bg-white">
          <div className="flex y-4 items-center bg-white p-4 rounded-t-md">
            <p className="text-xl font-semibold">Terminal</p>
            <CommandLineIcon className="h-5 w-5" />
          </div>
          <div className="h-px border-t border-solid border-gray-200 w-full"></div>
          <div className="flex flex-col p-4 bg-white">
            <p className="text-xs text-gray-500 ml-2">General</p>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <Squares2X2Icon className="w-5 h-5" />
              <p className="text-sm">Dashboard</p>
            </div>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <PlusCircleIcon className="w-5 h-5" />
              <p className="text-sm">Add new</p>
            </div>
            <p className="text-xs text-gray-500 mt-5 ml-2">Manage</p>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <EyeDropperIcon className="w-5 h-5" />
              <p className="text-sm">Samples</p>
            </div>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <ListBulletIcon className="w-5 h-5" />
              <p className="text-sm">Projects</p>
            </div>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <LightBulbIcon className="w-5 h-5" />
              <p className="text-sm">Recipes</p>
            </div>
            <p className="text-xs text-gray-500 mt-5 ml-2">Users</p>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <UserIcon className="w-5 h-5" />
              <p className="text-sm">Browse</p>
            </div>
            <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
              <EnvelopeIcon className="w-5 h-5" />
              <p className="text-sm">Invite</p>
            </div>
          </div>
        </div>
        <div className="navbar-end w-full">
          <div className="h-px border-t border-solid border-gray-200 w-full"></div>
          <div className="p-2 bg-white rounded-b-md">
            <div className="flex gap-3 rounded-md p-2 hover:bg-gray-200 hover:cursor-pointer">
              <div className="bg-neutral text-neutral-content w-12 h-10 rounded-lg flex justify-center items-center">
                <span>GG</span>
              </div>
              <div className="flex flex-col justify-start w-full">
                <p className="text-sm w-full">Gracjan Grzech</p>
                <p className="text-xs text-gray-500">Lab worker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

type NavbarItemProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

const NavbarItem = ({ icon, text, href }: NavbarItemProps) => {
  return (
    <Link to={href}>
      <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
        {icon}
        <p className="text-sm">{text}</p>
      </div>
    </Link>
  );
};

export default Navbar;

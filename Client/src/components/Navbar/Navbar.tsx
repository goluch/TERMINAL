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

type NavbarLink = { type: "link" } & NavbarItemProps;
type NavbarLinkGroup = { type: "group"; links: NavbarLink[] };

type NavbarContent = NavbarLink | NavbarLinkGroup;

const navigation: NavbarContent[] = [
  { type: "group", text: "General" },
  {
    type: "link",
    text: "Dashboard",
    icon: <Squares2X2Icon className="w-5 h-5" />,
    href: "/",
  },
  {
    type: "link",
    text: "Add new",
    icon: <PlusCircleIcon className="w-5 h-5" />,
    href: "/",
  },
  { type: "group", text: "Manage" },
  {
    type: "link",
    text: "Samples",
    icon: <EyeDropperIcon className="w-5 h-5" />,
    href: "/",
  },
  {
    type: "link",
    text: "Projects",
    icon: <ListBulletIcon className="w-5 h-5" />,
    href: "/",
  },
  {
    type: "link",
    text: "Recipes",
    icon: <LightBulbIcon className="w-5 h-5" />,
    href: "/",
  },
  { type: "group", text: "Users" },
  {
    type: "link",
    text: "Browse",
    icon: <UserIcon className="w-5 h-5" />,
    href: "/",
  },
  {
    type: "link",
    text: "Invite",
    icon: <EnvelopeIcon className="w-5 h-5" />,
    href: "/",
  },
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
    <nav className="h-screen min-h-screen max-h-screen w-80 p-2">
      <NavMobileDropdown navigationItems={navigation} />
      <div className="h-full hidden sm:inline-flex w-full flex-col justify-between rounded-md border border-solid bg-white border-gray-200">
        <div className="navbar-start w-full flex flex-col rounded-md bg-white">
          <div className="flex y-4 items-center bg-white p-4 rounded-t-md">
            <p className="text-xl font-semibold">Terminal</p>
            <CommandLineIcon className="h-5 w-5" />
          </div>
          <div className="h-px border-t border-solid border-gray-200 w-full"></div>
          <TerminalNavbarContent />
        </div>
        <div className="navbar-end w-full">
          <div className="h-px border-t border-solid border-gray-200 w-full"></div>
          <NavbarUserProfile />
        </div>
      </div>
    </nav>
  );
};

const NavbarUserProfile = () => {
  return (
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

type NavbarLinkGroupProps = {
  text: string;
  children: React.ReactNode;
};

const NavbarLinkGroup = ({ text, children }: NavbarLinkGroupProps) => {
  return (
    <div>
      <p className="text-xs text-gray-500 ml-2">{text}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

const TerminalNavbarContent = () => {
  return (
    <div className="flex flex-col p-4 gap-5 bg-white">
      <NavbarLinkGroup text="General">
        <NavbarItem
          text="Dashboard"
          href="/"
          icon={<Squares2X2Icon className="h-5 w-5" />}
        />
        <NavbarItem
          text="Add new"
          href="/"
          icon={<PlusCircleIcon className="h-5 w-5" />}
        />
      </NavbarLinkGroup>
      <NavbarLinkGroup text="Manage">
        <NavbarItem
          text="Samples"
          href="/samples"
          icon={<EyeDropperIcon className="h-5 w-5" />}
        />
        <NavbarItem
          text="Projects"
          href="/projects"
          icon={<ListBulletIcon className="h-5 w-5" />}
        />
        <NavbarItem
          text="Recipes"
          href="/"
          icon={<LightBulbIcon className="h-5 w-5" />}
        />
      </NavbarLinkGroup>
      <NavbarLinkGroup text="Users">
        <NavbarItem
          text="Browse"
          href="/users"
          icon={<UserIcon className="h-5 w-5" />}
        />
        <NavbarItem
          text="Invite"
          href="/settings"
          icon={<EnvelopeIcon className="h-5 w-5" />}
        />
      </NavbarLinkGroup>
    </div>
  );
};

export default Navbar;

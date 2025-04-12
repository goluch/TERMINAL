import { CommandLineIcon } from "@heroicons/react/24/outline";
import NavbarUserProfilePopover from "./NavbarUserProfile";
import TerminalNavbarContent from "./TerminalNavbarContent";

/**
 * Navbar Component
 *
 * A navigation bar component that includes navigation items, a user profile dropdown, and authentication buttons.
 *
 * @component
 */
const Navbar = () => {
  return (
      <nav className="h-screen min-h-screen max-h-screen min-w-72 p-2 pe-0">
        <div className="h-full hidden sm:inline-flex w-full flex-col justify-between rounded-md border border-solid bg-white border-gray-200 shadow-sm">
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
            <NavbarUserProfilePopover />
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
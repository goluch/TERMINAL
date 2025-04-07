import NavbarItem from "./NavbarItem";
import NavbarLinkGroup from "./NavbarLinkGroup";
import {
  Squares2X2Icon,
  PlusCircleIcon,
  EyeDropperIcon,
  EnvelopeIcon,
  LightBulbIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

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
          href="/recipes"
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

export default TerminalNavbarContent;

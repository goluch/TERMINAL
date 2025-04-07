import { Link } from "react-router-dom";

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

export default NavbarItem;

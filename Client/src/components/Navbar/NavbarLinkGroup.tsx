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

export default NavbarLinkGroup;

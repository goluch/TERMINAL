import {Link, useLocation} from "react-router-dom";
import {Navigation} from "./Navbar.tsx";

interface NavItemsProps {
    navigationItems: Navigation[];
}

const NavItems = (props: NavItemsProps) => {
    const location = useLocation()

    return (
        <ul className="menu menu-horizontal px-1">
            {props.navigationItems.map((item, index) => (
                <li key={index}>
                    <Link
                        to={{
                            pathname: `${item.href}`
                        }}
                        aria-current={(location.pathname===item.href) ? "page" : undefined}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavItems;
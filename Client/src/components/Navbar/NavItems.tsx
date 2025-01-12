import {Link} from "react-router-dom";
import {Navigation} from "./Navbar.tsx";

interface NavItemsProps {
    navigationItems: Navigation[];
}

const NavItems = (props: NavItemsProps) => {

    return (
        <ul className="menu menu-horizontal px-1">
            {props.navigationItems.map((item, index) => (
                <li  key={index}>
                    <Link
                        key={index}
                        to={{
                            pathname: `${item.href}`
                        }}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavItems;
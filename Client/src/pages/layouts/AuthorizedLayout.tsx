import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import Navbar from "../../components/Navbar/Navbar";

const AuthorizedNavbarLayout = () => {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default AuthorizedNavbarLayout;

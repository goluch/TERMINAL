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
    <div className="min-h-screen w-screen flex flex-col sm:flex-row bg-gray-100">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AuthorizedNavbarLayout;

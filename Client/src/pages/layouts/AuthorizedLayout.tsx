import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import Navbar from "../../components/Navbar/Navbar";

type AuthorizedNavbarLayoutProps = {
  pageName: string;
};

const AuthorizedNavbarLayout = ({ pageName }: AuthorizedNavbarLayoutProps) => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-screen flex flex-col gap-2 sm:flex-row bg-gray-100">
      <Navbar />
      <div className="p-2 ps-0 h-screen min-h-screen max-h-screen w-full">
        <div className="bg-white rounded-md inline-block border border-gray-200 shadow-sm w-full h-full overflow-hidden">
          <div className="h-[60px] text-xl flex font-medium items-center px-4 rounded-md">
            {pageName}
          </div>
          <div className="h-px border-t border-solid border-gray-200 w-full"></div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthorizedNavbarLayout;

import { useIsAuthenticated } from "@hooks/useIsAuthenticated";
import NotFoundPage from "./NotFoundPage";
import { Navigate } from "react-router-dom";

const LoginOrNotFound = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <NotFoundPage /> : <Navigate to="/login" />;
};

export default LoginOrNotFound;

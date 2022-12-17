import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Navigate to="/recipes" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;

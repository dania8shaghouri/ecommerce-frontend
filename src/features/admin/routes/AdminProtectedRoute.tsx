import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth/AuthContext";

const AdminProtectedRoute = () => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;

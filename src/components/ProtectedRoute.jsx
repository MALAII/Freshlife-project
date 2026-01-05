import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // ❌ Not logged in → always go to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;

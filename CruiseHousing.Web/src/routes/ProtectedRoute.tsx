import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedRoute() {
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isExpired = new Date(session.expiresAt) <= new Date();

  if (isExpired) {
    logout();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
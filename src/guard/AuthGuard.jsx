import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const userSession = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

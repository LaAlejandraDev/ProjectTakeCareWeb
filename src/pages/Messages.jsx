import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Messages() {
  const location = useLocation();

  if (location.pathname === "/index/messages") {
    return <Navigate to="list" replace />;
  }

  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function RoutesProtect() {
  const { user } = useContext(AuthContext);

  console.log("Mostrando el usuario", user);

  if (!user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}

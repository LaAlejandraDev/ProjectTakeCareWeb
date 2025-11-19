import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RoutesProtect() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}

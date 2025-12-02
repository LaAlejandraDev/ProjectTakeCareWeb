import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RoutesProtect() { // Componente para proteger rutas
  const { user, loading } = useContext(AuthContext);
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !delayDone) return <LoadingScreen />;

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}

function LoadingScreen() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
}

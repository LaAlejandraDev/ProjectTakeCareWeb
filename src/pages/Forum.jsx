import { Navigate, Outlet, useLocation } from "react-router-dom";
import SearchBar from "../components/Forum/SearchBar";
import { useEffect, useState } from "react";

export default function Forum() { // Componente principal del foro
  const location = useLocation();
  const [searchDisabled, setSearchDisabled] = useState(false);

  useEffect(() => {
    setSearchDisabled(location.pathname !== "/index/forum/allpost");
  }, [location.pathname]);

  if (location.pathname === "/index/forum") {
    return <Navigate to="allpost" replace />;
  }

  return (
    <div className="flex flex-col gap-3">
      {!searchDisabled && <SearchBar />}
      <Outlet />
    </div>
  );
}

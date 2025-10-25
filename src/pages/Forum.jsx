import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/Forum/SearchBar";
import { useEffect, useState } from "react";

export default function Forum() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchDisabled, setSearchDisabled] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/index/forum/allpost") {
      setSearchDisabled(true);
    } else {
      setSearchDisabled(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Navigate to={"allpost"} />
        {
          !searchDisabled ?
          <SearchBar /> : null
        }
        <Outlet />
      </div>
    </>
  );
}

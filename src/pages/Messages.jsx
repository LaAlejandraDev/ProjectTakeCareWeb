import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import PearsonList from "../components/Chat/PearsonList";
import { useEffect } from "react";

export default function Messages() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("index/messages/list");
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </>
  );
}

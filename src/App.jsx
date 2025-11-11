import { useEffect, useRef, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignalR } from "./context/SignalContext";

function App() {
  const { connection, isConnected } = useSignalR();
  const location = useLocation();
  const navigate = useNavigate();
  const lastMessageId = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Tu sesión ha expirado. Inicia sesión nuevamente.");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!connection || isConnected) return;

    const handleMessage = (user, message) => {
      const msgId = Date.now();
      if (lastMessageId.current === msgId) return;
      lastMessageId.current = msgId;

      if (!location.pathname.includes("/mensajes")) {
        toast.info(`${user}: ${message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    connection.on("ReceiveMessage", handleMessage);

    return () => {
      connection.off("ReceiveMessage", handleMessage);
    };
  }, [connection, isConnected, location]);

  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex bg-base-200">
        <div className="flex p-2 w-50">
          <Menu />
        </div>
        <div className="flex-grow overflow-y-auto p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

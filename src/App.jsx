import { useEffect, useRef, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignalR } from "./context/SignalContext";
import ToastMessage from "./components/Toast/ToastTest";

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
    if (!connection) return;

    console.log("Listo para recibir mensajes")

    const handleMessage = (message) => {
      console.log(message)
      const msgId = Date.now();
      if (lastMessageId.current === msgId) return;
      lastMessageId.current = msgId;

      console.log(location.pathname.includes("/messages/chat"))

      if (!location.pathname.includes("/messages/chat")) {
        toast(<ToastMessage message={message} toastProps={{  }}/>)
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

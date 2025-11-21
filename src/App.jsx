import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignalR } from "./context/SignalContext";
import ToastMessage from "./components/Toast/ToastTest";
import { AuthContext } from "./context/AuthContext";
import { UserAPI } from "./api/user.api";

function App() {
  const { connection, isConnected } = useSignalR();
  const location = useLocation();
  const navigate = useNavigate();
  const lastMessageId = useRef(null);
  const { user, roleData } = useContext(AuthContext)
  useEffect(() => {
    const token = localStorage.getItem("token");
    getRoleData()
    if (!token) {
      toast.warning("Tu sesión ha expirado. Inicia sesión nuevamente.");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!connection) return;

    const handleMessage = (message) => {
      const msgId = Date.now();
      if (lastMessageId.current === msgId) return;
      lastMessageId.current = msgId;

      if (!location.pathname.includes("/messages/chat")) {
        toast(<ToastMessage message={message} />);
      }
    };

    const handleNewDate = (date) => {
      toast(
        <ToastMessage
          message={{
            title: "Nueva cita agendada",
            body: `Fecha: ${new Date(date.fechaInicio).toLocaleString()}`
          }}
        />
      );
    };

    connection.on("ReceiveMessage", handleMessage);
    connection.on("NewDate", handleNewDate);

    return () => {
      connection.off("ReceiveMessage", handleMessage);
      connection.off("NewDate", handleNewDate);
    };
  }, [connection, isConnected, location]);


  async function getRoleData() {
    try {
      const response = await UserAPI.getUserInformation(user.id)
      if (response.status === 200) {
        roleData(response.data)
      }
    } catch (error) {

    }
  }

  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex bg-base-200">
        <div className="flex p-2 w-50 h-full">
          <Menu />
        </div>
        <div className="grow-1 overflow-y-auto p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

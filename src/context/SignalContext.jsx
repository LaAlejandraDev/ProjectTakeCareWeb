import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const SignalContext = createContext();

export function SignalProvider({ children }) { // Contexto para manejar la conexión de SignalR
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://chc92xn0-5002.usw3.devtunnels.ms/chatHub", {
        accessTokenFactory: () => token || "",
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    connection
      .start()
      .then(() => {
        console.log("Conectado al hub de SignalR (contexto global)");
        setIsConnected(true);
      })
      .catch((err) => console.error("Error al conectar al hub:", err));

    connection.onclose(() => setIsConnected(false));

    return () => {
      connection.stop();
    };
  }, [connection]);

  return (
    <SignalContext.Provider value={{ connection, isConnected }}>
      {children}
    </SignalContext.Provider>
  );
}

export function useSignalR() {
  return useContext(SignalContext);
}

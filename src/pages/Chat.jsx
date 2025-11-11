import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import MessageComponent from "../components/Chat/Message";
import Avatar from "../components/Avatar";

class Message {
  constructor(user = "", message = "", owner = true) {
    this.user = user;
    this.message = message;
    this.owner = owner;
  }
}

export default function Chat() {
  const [messagesList, setMessagesList] = useState([]);
  const [connection, setConnection] = useState(null);
  const [userConected, setUser] = useState("WebUser");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5002/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    let isMounted = true;

    connection
      .start()
      .then(() => {
        console.log("Conectado al hub de chat.");

        connection.on("ReceiveMessage", (user, message) => {
          if (!isMounted) return;
          const newMessage = new Message(
            user,
            message,
            user == userConected ? true : false
          );

          setMessagesList((prev = []) => [...prev, newMessage]);
        });
      })
      .catch((err) => console.error("Error al conectar al hub:", err));

    return () => {
      isMounted = false;
      connection.stop();
    };
  }, [connection]);

  const sendMessage = async () => {
    if (connection && message.trim()) {
      try {
        await connection.invoke("SendMessage", userConected, message);
        setMessage("");
      } catch (err) {
        console.error("Error al enviar mensaje:", err);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center shadow-lg">
      <div className="w-full p-4 bg-base-300 shadow-lg">
        <div className="w-full flex items-center gap-x-2">
          <Avatar name="J" isComment={true} />
          <p>Juan Pablo</p>
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto bg-base-100 shadow-md p-4 space-y-2">
        {Array.isArray(messagesList) && messagesList.length > 0 ? (
          messagesList.map((item, index) => (
            <MessageComponent
              key={index}
              message={item.message}
              owner={item.owner}
              user={item.user}
            />
          ))
        ) : (
          <p className="text-gray-500 text-2xl italic text-center">
            No hay mensajes aún...
          </p>
        )}
      </div>
      <div className="w-full flex gap-2 bg-base-100 p-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input flex-1"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Enviar Mensaje
        </button>
      </div>
    </div>
  );
}

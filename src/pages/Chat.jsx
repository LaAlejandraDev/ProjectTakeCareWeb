import { use, useEffect, useState } from "react";
import MessageComponent from "../components/Chat/Message";
import Avatar from "../components/Avatar";
import { useSignalR } from "../context/SignalContext";
import { useParams } from "react-router-dom";
import { ChatAPI } from "../api/chat.api";
import { toast } from "react-toastify";

class Message {
  constructor(user = "", message = "", owner = true) {
    this.user = user;
    this.message = message;
    this.owner = owner;
  }
}

export default function Chat() {
  const { connection, isConnected } = useSignalR();
  const [messagesList, setMessagesList] = useState([]);
  const [userConected, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chatUserName, setChatUserName] = useState("User")
  const chatId = useParams()
  const [idPsyco, setIdPsyco] = useState(-1)

  async function getChatMessages() {
    try {
      const response = await ChatAPI.getChatMessages(chatId.id)
      if (response.status === 200) {
        setMessagesList(response.data)
        console.log(response.data)
      } else {
        toast.error("No se pudieron obtener los mensajes, intenta mas tarde")
      }
    } catch (error) {
      toast.error("Ocurrio un error inesperado, intenta mas tarde")
    }
  }

  async function getChatInfo() {
    try {
      const response = await ChatAPI.getChatInfo(chatId.id)
      if (response.status === 200) {
        setUser(response.data.nombrePsicologo)
        setChatUserName(response.data.nombrePaciente)
        setIdPsyco(response.data.idPsicologo)
        console.log(response.data)
      } else {
        toast.error("No se pudo obtener la informacion de este chat, intenta mas tarde")
      }
    } catch (error) {
      toast.error("Ocurrio un error inesperado, intenta mas tarde")
    }
  }

  async function createNewMessage() {
    const newMessage = {
      idChat: chatId.id,
      idRemitenteUsuario: idPsyco,
      mensaje: message,
      leido: true,
    }

    console.log(newMessage)

    try {
      const response = await ChatAPI.sendMessage(newMessage);
      if (response.status === 200) {
        return true;
      } else {
        toast.error("No se pudo guardar el mensaje en la base de datos");
        return false;
      }
    } catch (error) {
      toast.error("Error de servidor al crear el mensaje");
      console.error(error);
      return false;
    }
  }

  useEffect(() => {
    getChatMessages()
    getChatInfo()
  }, [])

  useEffect(() => {
    if (!connection || !isConnected) return;

    const handleMessage = (user, msg) => {
      const newMessage = new Message(
        user,
        msg,
        user === userConected ? true : false
      );
      setMessagesList((prev) => [...prev, newMessage]);
    };

    connection.on("ReceiveMessage", handleMessage);
    return () => {
      connection.off("ReceiveMessage", handleMessage);
    };
  }, [connection, isConnected, userConected]);

  const sendMessage = async () => {
    if (!connection || !message.trim()) return;

    try {
      const success = await createNewMessage();
      if (!success) return;

      await connection.invoke("SendMessage", userConected, message);
      setMessage("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      toast.error("Error al enviar el mensaje por SignalR");
    }
  };


  return (
    <div className="w-full h-full flex flex-col items-center shadow-lg">
      <div className="w-full p-4 bg-base-300 shadow-lg">
        <div className="w-full flex items-center gap-x-2">
          <Avatar name="J" isComment={true} />
          <p>{chatUserName}</p>
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto bg-base-100 shadow-md p-4 space-y-2">
        {Array.isArray(messagesList) && messagesList.length > 0 ? (
          messagesList.map((item, index) => (
            <MessageComponent
              key={index}
              message={item.mensaje}
              owner={item.idRemitenteUsuario == idPsyco}
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

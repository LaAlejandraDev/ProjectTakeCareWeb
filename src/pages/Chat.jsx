import { useContext, useEffect, useRef, useState } from "react";
import MessageComponent from "../components/Chat/Message";
import Avatar from "../components/Avatar";
import { useSignalR } from "../context/SignalContext";
import { useParams } from "react-router-dom";
import { ChatAPI } from "../api/chat.api";
import { toast } from "react-toastify";
import { MessageCreateClass, MessageDataClass, MessageDeseralizerClass } from "../classes/MessageCreate";
import { AuthContext } from "../context/AuthContext";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { formatMessageDate } from "../utils/DateFormat";

export default function Chat() {
  const { connection, isConnected } = useSignalR();
  const [messagesList, setMessagesList] = useState([]);
  const [userConected, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chatUserName, setChatUserName] = useState("User");
  const { id: chatId } = useParams();
  const [idPsyco, setIdPsyco] = useState(-1);
  const { rolId } = useContext(AuthContext)
  const userRolId = rolId.id
  const userRolType = rolId.rol
  const chatRef = useRef(null)

  useEffect(() => {
    if(!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messagesList])

  function mapServerMessageToClientModel(serverMsg) {
    return new MessageDeseralizerClass(
      serverMsg.idChat,
      serverMsg.idRemitenteUsuario,
      serverMsg.mensaje,
      serverMsg.leido,
      serverMsg.fecha
    );
  }

  async function getChatMessages() {
    try {
      const response = await ChatAPI.getChatMessages(chatId);
      if (response.status === 200) {
        const data = response.data.map(
          (m) =>
            new MessageDataClass(
              m.id,
              m.idChat,
              m.idRemitenteUsuario,
              m.mensaje,
              m.leido,
              m.fecha
            )
        );
        setMessagesList(data);
      } else {
        toast.error("No se pudieron obtener los mensajes, intenta más tarde");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado al obtener los mensajes");
    }
  }

  async function getChatInfo() {
    try {
      const response = await ChatAPI.getChatInfo(chatId);
      if (response.status === 200) {
        setUser(userRolType === 2 ? (response.data.nombrePaciente) : (response.data.nombrePsicologo));
        setChatUserName(userRolType === 2 ? (response.data.nombrePaciente) : (response.data.nombrePsicologo));
        setIdPsyco(response.data.idPsicologo);
      } else {
        toast.error("No se pudo obtener la información del chat");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado al obtener la información");
    }
  }

  async function createNewMessage() {
    const newMessage = new MessageCreateClass(
      Number(chatId),
      userRolId,
      message.trim(),
      false,
    );

    try {
      const response = await ChatAPI.sendMessage(newMessage);
      if (response.status === 201) {
        return response.data;
      } else {
        toast.error("No se pudo guardar el mensaje en la base de datos");
        return null;
      }
    } catch (error) {
      toast.error("Error de servidor al crear el mensaje");
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    getChatMessages();
    getChatInfo();
  }, []);

  useEffect(() => {
    if (!connection) return;

    const handleMessage = (msg) => {
      try {
        const newMsg = mapServerMessageToClientModel(msg);
        setMessagesList((prev) => [...prev, newMsg]);
      } catch (error) {
        console.error("Error al mapear el mensaje recibido:", error);
      }
    };

    connection.on("ReceiveMessage", handleMessage);

    return () => {
      connection.off("ReceiveMessage", handleMessage);
    };
  }, [connection, isConnected]);


  const sendMessage = async (e) => {
    if (e) e.preventDefault();

    if (!connection || !message.trim()) return;

    const createdMsg = await createNewMessage();
    if (!createdMsg) return;

    if (!createdMsg.fecha) {
      createdMsg.fecha = new Date().toISOString();
    }

    try {
      await connection.invoke("SendMessage", createdMsg);
      setMessage("");
    } catch (err) {
      toast.error("Error al enviar el mensaje");
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

      <div className="w-full flex-1 overflow-y-auto bg-base-100 shadow-md p-4 space-y-2" ref={chatRef}>
        {Array.isArray(messagesList) && messagesList.length > 0 ? (
          messagesList.map((item, index) => (
            <MessageComponent
              key={index}
              idPsycologist={userRolId}
              messageData={item}
              date={formatMessageDate(item.date)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-2xl italic text-center">
            No hay mensajes aún...
          </p>
        )}
      </div>
      <div className="w-full bg-base-100 p-2">
        <form className="w-full flex gap-2" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input flex-1"
          />
          <button onClick={sendMessage} className="btn btn-secondary" type="submit">
            <PaperAirplaneIcon className="size-[2em]" />
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import MessageComponent from "../components/Chat/Message";
import Avatar from "../components/Avatar";
import { useSignalR } from "../context/SignalContext";
import { useParams } from "react-router-dom";
import { ChatAPI } from "../api/chat.api";
import { toast } from "react-toastify";
import { MessageCreateClass, MessageDataClass, MessageDeseralizerClass } from "../classes/MessageCreate";

export default function Chat() {
  const { connection, isConnected } = useSignalR();
  const [messagesList, setMessagesList] = useState([]);
  const [userConected, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chatUserName, setChatUserName] = useState("User");
  const { id: chatId } = useParams();
  const [idPsyco, setIdPsyco] = useState(-1);

  function mapServerMessageToClientModel(serverMsg) {
    return new MessageDeseralizerClass(
      serverMsg.idChat,
      serverMsg.idRemitenteUsuario,
      serverMsg.mensaje,
      serverMsg.leido,
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
        setUser(response.data.nombrePsicologo);
        setChatUserName(response.data.nombrePaciente);
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
      idPsyco,
      message.trim(),
      false
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


  const sendMessage = async () => {
    if (!connection || !message.trim()) return;

    const createdMsg = await createNewMessage();
    if (!createdMsg) return;

    try {
      await connection.invoke("SendMessage", createdMsg);
      setMessage("");
    } catch (err) {
      console.error("Error al enviar mensaje por SignalR:", err);
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
              idPsycologist={idPsyco}
              messageData={item}
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
          Enviar
        </button>
      </div>
    </div>
  );
}
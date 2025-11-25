import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { registerUser, sendMessage, onReceiveMessage } from "../helpers/socket";

export default function ReadChats() {
  const location = useLocation();
  const { chat, paciente } = location.state; // Recibimos datos del chat y paciente
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const psicologoId = localStorage.getItem("IdUsuario");

  useEffect(() => {
    // Registramos el psicólogo en el servidor Socket.IO
    registerUser(psicologoId);

    // Cargamos todos los mensajes históricos del chat
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.13:60572/api/ChatMensajes?IdChat=${chat.id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error cargando mensajes:", error);
      }
    };
    fetchMessages();

    // Escuchamos mensajes entrantes en tiempo real
    onReceiveMessage((message) => {
      if (message.idChat === chat.id) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, []);

  // Función para enviar mensaje
  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      IdChat: chat.id,
      IdRemitenteUsuario: parseInt(psicologoId),
      IdDestinatarioUsuario: paciente.idUsuario, // Enviamos al paciente específico
      Mensaje: newMessage,
    };

    // Enviamos mensaje por Socket.IO
    sendMessage(messageData);

    // Agregamos el mensaje al estado local para ver en la UI
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        idChat: chat.id,
        idRemitenteUsuario: parseInt(psicologoId),
        mensaje: newMessage,
        leido: false,
        fecha: new Date().toISOString(),
      },
    ]);

    setNewMessage(""); // Limpiamos input
  };

  return (
    <div className="chat-container">
      <h2 className="font-bold text-lg mb-2">
        Chat con {paciente.usuario.nombre}
      </h2>
      <div className="chat-messages mb-2 overflow-y-auto max-h-96">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-1 rounded ${
              msg.idRemitenteUsuario === parseInt(psicologoId)
                ? "bg-blue-200 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <strong>
              {msg.idRemitenteUsuario === parseInt(psicologoId)
                ? "Tú"
                : paciente.usuario.nombre}
              :
            </strong>{" "}
            {msg.mensaje}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4">
          Enviar
        </button>
      </div>
    </div>
  );
}

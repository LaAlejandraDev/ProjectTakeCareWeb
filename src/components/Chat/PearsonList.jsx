import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import axios from "axios";

export default function PearsonList({ contactList }) {
  const navigate = useNavigate();

  // Función para abrir el chat con un paciente
  const openChat = async (chat) => {
    try {
      // Obtenemos datos del paciente
      const response = await axios.get(
        `http://localhost:5000/api/Pacientes/${chat.idPaciente}`
      );
      const paciente = response.data;

      // Navegamos a la ruta del chat individual con el paciente
      navigate(`/chat/${chat.id}`, { state: { chat, paciente } });
    } catch (error) {
      console.error("Error obteniendo paciente:", error);
    }
  };

  return (
    <ul className="list rounded shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Lista de mensajes
      </li>
      {contactList.map((chat) => (
        <ListItem key={chat.id} chat={chat} openChat={() => openChat(chat)} />
      ))}
    </ul>
  );
}

function ListItem({ chat, openChat }) {
  return (
    <li
      className="rounded-none list-row border-bottom hover:bg-base-300 cursor-pointer transition"
      onClick={openChat}
    >
      <div>
        <Avatar name="Paciente" isComment={true} />
      </div>
      <div>
        <div className="font-bold">Paciente #{chat.idPaciente}</div>
        <p className="list-col-wrp text-xs line-clamp-1">
          Último mensaje:{" "}
          {chat.ultimoMensajeEn ? chat.ultimoMensajeEn : "Sin mensajes"}
        </p>
      </div>
    </li>
  );
}

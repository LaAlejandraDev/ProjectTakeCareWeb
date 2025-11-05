import { useEffect, useState } from "react";
import PearsonList from "../components/Chat/PearsonList";
import axios from "axios";

export default function Messages() {
  const [chats, setChats] = useState([]);

  // IdUsuario del psicólogo logueado
  const psicologoId = localStorage.getItem("IdUsuario");

  useEffect(() => {
    // Obtenemos todos los chats del psicólogo desde el backend .NET
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Chats");
        // Filtramos solo los chats de este psicólogo
        const psicologoChats = response.data.filter(
          (chat) => chat.idPsicologo.toString() === psicologoId
        );
        setChats(psicologoChats);
      } catch (error) {
        console.error("Error cargando chats:", error);
      }
    };
    fetchChats();
  }, []);

  return (
    <>
      {chats.length > 0 ? (
        <PearsonList contactList={chats} />
      ) : (
        <p className="text-center mt-10 text-gray-500">No tienes mensajes</p>
      )}
    </>
  );
}

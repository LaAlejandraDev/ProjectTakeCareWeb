import { Outlet, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { useContext, useEffect, useState } from "react";
import { ChatAPI } from "../../api/chat.api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function PearsonList() {
  const [listContacts, setListContacts] = useState([]);
  const { rolId } = useContext(AuthContext);
  const userRolType = rolId.rol;
  const idUserRole =
    rolId.paciente != null ? rolId.paciente.id : rolId.psicologo.id;

  async function getList() {
    console.log(idUserRole);
    try {
      const roleApiMap = {
        0: ChatAPI.getChatListPatient,
        2: ChatAPI.getChatList,
      };

      const apiFn = roleApiMap[userRolType];

      if (!apiFn) {
        toast.error("Rol no soportado");
        return;
      }

      const response = await apiFn(idUserRole);

      if (response.status === 200) {
        console.log(response);
        setListContacts(response.data);
      } else {
        toast.error("Error al obtener la lista de contactos");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado, intenta más tarde");
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <ul className="list rounded shadow-md bg-base-100">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Lista de conversaciones
        </li>
        {listContacts.map((item, index) => {
          return (
            <ListItem
              key={index}
              id={item.id}
              name={
                userRolType === 2
                  ? `${item.nombrePaciente} ${item.apellidosPaciente}`
                  : `${item.nombrePsicologo} - ${item.especialidad}`
              }
              lastMessage={item.ultimoMensajeEn}
            />
          );
        })}
      </ul>
    </>
  );
}

function ListItem({ id, name, avatar, lastMessage }) {
  const navigation = useNavigate();
  return (
    <>
      <li
        className="list-row border-bottom hover:bg-base-300 cursor-pointer transition items-center rounded-none"
        onClick={() => navigation("/index/messages/chat/" + id)}
      >
        <div>
          <Avatar name={name} isComment={true} />
        </div>
        <div>
          <div className="font-bold">{name}</div>
          <p className="list-col-wrp text-xs line-clamp-1">{lastMessage}</p>
        </div>
      </li>
    </>
  );
}

import { Outlet, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { Contacts } from "../../data/Contacts";
import { useEffect, useState } from "react";
import { ChatAPI } from "../../api/chat.api";
import { toast } from "react-toastify";


export default function PearsonList() {
  const [listContacts, setListContacts] = useState([])

  async function getList() {
    try {
      const response = await ChatAPI.getChatList(1)
      console.log(response)
      if (response.status === 200) {
        setListContacts(response.data)
      } else {
        toast.error("Error al obtener la lista de contactos, intenta mas tarde")
      }
    } catch(error) {
      toast.error("Ocurrio un error inesperado, intenta mas tarde")
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <ul className="list rounded shadow-md bg-base-100">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Lista de pacientes
        </li>
        {
          listContacts.map((item, index) => {
            return (
              <ListItem
                key={index}
                id={item.id}
                name={`${item.nombrePaciente} ${item.apellidosPaciente}`}
                lastMessage={item.ultimoMensajeEn}
              />
            )
          })
        }
      </ul>
    </>
  );
}

function ListItem({ id, name, avatar, lastMessage }) {
  const navigation = useNavigate()
  return (
    <>
      <li className="list-row border-bottom hover:bg-base-300 cursor-pointer transition items-center rounded-none" onClick={() => navigation("/index/messages/chat/"+id)}>
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

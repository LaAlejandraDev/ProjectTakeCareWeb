import { Outlet, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { Contacts } from "../../data/Contacts";


export default function PearsonList() {
  return (
    <>
      <ul className="list rounded shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Lista de mensajes
        </li>
        {
          Contacts.map((item, index) => {
            return (
              <ListItem
                key={index}
                name={item.name}
                lastMessage={item.lastMessage}
              />
            )
          })
        }
      </ul>
    </>
  );
}

function ListItem({ name, avatar, lastMessage }) {
  const navigation = useNavigate()
  return (
    <>
      <li className="rounded-none list-row border-bottom hover:bg-base-300 cursor-pointer transition" onClick={() => navigation("/index/messages/chat")}>
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

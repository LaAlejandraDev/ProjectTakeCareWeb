import { Outlet, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { Contacts } from "../../data/Contacts";

export default function PearsonList() {
  return (
    <>
      <ul className="list rounded shadow-md bg-base-100">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Lista de pacientes
        </li>
        {Contacts.map((item, index) => {
          return (
            <ListItem
              key={index}
              name={item.name}
              lastMessage={item.lastMessage}
            />
          );
        })}
      </ul>
    </>
  );
}

function ListItem({ name, avatar, lastMessage }) {
  const navigation = useNavigate();
  return (
    <>
      <li
        className="list-row border-bottom hover:bg-base-300 cursor-pointer transition items-center"
        onClick={() => navigation("/index/messages/chat")}
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

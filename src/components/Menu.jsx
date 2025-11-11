import {
  HomeIcon,
  ChatBubbleBottomCenterIcon,
  UserCircleIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const [selected, setSelected] = useState("Inicio");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/index/forum")) {
      setSelected("Inicio");
    } else if (location.pathname.includes("/index/messages")) {
      setSelected("Mensajes");
    } else if (location.pathname.includes("/index/diary")) {
      setSelected("Mi Diario");
    } else if (location.pathname.includes("/index/profile")) {
      setSelected("Perfil");
    }
  }, [location.pathname]);

  const handleSelect = (title) => {
    setSelected(title);
    switch (title) {
      case "Inicio":
        navigate("/index/forum/allpost");
        break;
      case "Mensajes":
        navigate("/index/messages");
        break;
      case "Mi Diario":
        navigate("/index/diary");
        break;
      case "Perfil":
        navigate("/index/profile");
        break;
      default:
        break;
    }
  };

  return (
    <ul className="menu bg-base-100 rounded shadow-sm gap-5 w-full">
      <h2 className="text-center pt-2 font-bold text-xl menu-title">
        TakeCare
      </h2>
      <li>
        <a className="font-bold text-lg">Inicio</a>
        <ul>
          <MenuItem
            title="Foro"
            section={selected}
            onSelect={handleSelect}
            icon={<QueueListIcon className="h-6 w-6" />}
          />
          <MenuItem
            title="Mensajes"
            section={selected}
            onSelect={handleSelect}
            icon={<ChatBubbleBottomCenterIcon className="h-6 w-6" />}
          />{" "}
        </ul>
      </li>
      <li>
        <a className="font-bold text-lg">Personal</a>
        <ul>
          <MenuItem
            title="Perfil"
            section={selected}
            onSelect={handleSelect}
            icon={<UserCircleIcon className="h-6 w-6" />}
          />
        </ul>
      </li>
    </ul>
  );
}

function MenuItem({ title, section, onSelect, icon }) {
  const isActive = title === section;
  return (
    <li onClick={() => onSelect(title)} className="my-2">
      <a
        className={`tooltip tooltip-right text-base-800 rounded-box py-2 ${
          isActive ? "bg-secondary text-white" : ""
        }`}
        data-tip={title}
      >
        {icon}
        {title}
      </a>
    </li>
  );
}

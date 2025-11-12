import { BookOpenIcon } from "@heroicons/react/16/solid";
import {
  ChatBubbleBottomCenterIcon,
  UserCircleIcon,
  QueueListIcon,
  ChartBarIcon,
  BookmarkSquareIcon,
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
        navigate("/index/forum");
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
      case "Expediente":
        navigate("/index/record");
        break;
      case "Dashboard":
        navigate("/index/dashboard");
        break;
      case "Diario":
        navigate("/index/diary");
        break;
      default:
        break;
    }
  };

  return (
    <ul className="menu bg-base-100 rounded-xl shadow-sm w-full h-full">
      <div className="w-full flex flex-col items-center justify-center">
        <img className="h-19 w-19" src="/logoNB.png" />
      </div>

      <li>
        <a className="font-bold text-lg">Dashboard</a>
        <ul>
          <MenuItem
            title="Dashboard"
            section={selected}
            onSelect={handleSelect}
            icon={<ChartBarIcon className="h-6 w-6" />}
          />
        </ul>
        <ul>
          <MenuItem
            title="Diario"
            section={selected}
            onSelect={handleSelect}
            icon={<BookOpenIcon className="h-6 w-6" />}
          />
        </ul>
        <ul>
          <MenuItem
            title="Expediente"
            section={selected}
            onSelect={handleSelect}
            icon={<BookmarkSquareIcon className="h-6 w-6" />}
          />
        </ul>
      </li>
      <li>
        <a className="font-bold text-lg">Foro</a>
        <ul>
          <MenuItem
            title="Inicio"
            section={selected}
            onSelect={handleSelect}
            icon={<QueueListIcon className="h-6 w-6" />}
          />
        </ul>
      </li>

      <li>
        <a className="font-bold text-lg">Mensajeria</a>
        <ul>
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

import {
  ChatBubbleBottomCenterIcon,
  UserCircleIcon,
  QueueListIcon,
  ChartBarIcon,
  BookmarkSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const [selected, setSelected] = useState("Inicio");
  const navigate = useNavigate();
  const location = useLocation();
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    if (location.pathname.includes("/index/forum")) {
      setSelected("Inicio");
    } else if (location.pathname.includes("/index/messages")) {
      setSelected("Mensajes");
    } else if (location.pathname.includes("/index/diary")) {
      setSelected("Mi Diario");
    } else if (location.pathname.includes("/index/profile")) {
      setSelected("Perfil");
    } else if (location.pathname.includes("/admin/dash")) {
      setSelected("Dashboard");
    } else if (location.pathname.includes("/admin/users")) {
      setSelected("Usuarios");
    } else if (location.pathname.includes("/admin/reports")) {
      setSelected("Reportes");
    } else if (location.pathname.includes("/admin/subscriptions")) {
      setSelected("Suscripciones");
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
      case "Dashboard":
        navigate("/admin/dash");
        break;
      case "Usuarios":
        navigate("/admin/users");
        break;
      case "Reportes":
        navigate("/admin/reports");
        break;
      case "Suscripciones":
        navigate("/admin/subscriptions");
        break;
      default:
        break;
    }
  };

  return (
    <ul className="menu bg-base-100 rounded-xl shadow-sm gap-5 w-full">
      <h2 className="text-center pt-2 font-bold text-xl menu-title">
        TakeCare
      </h2>
      {rol === "1" && (
        <>
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
          </li>
          <li>
            <a className="font-bold text-lg">Usuarios</a>
            <ul>
              <MenuItem
                title="Usuarios"
                section={selected}
                onSelect={handleSelect}
                icon={<UserGroupIcon className="h-6 w-6" />}
              />
            </ul>
          </li>
        </>
      )}

      {rol === "2" && (
        <>
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
        </>
      )}

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
          isActive ? "bg-primary text-white" : ""
        }`}
        data-tip={title}
      >
        {icon}
        {title}
      </a>
    </li>
  );
}

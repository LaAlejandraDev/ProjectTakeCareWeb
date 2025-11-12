import {
  HomeIcon,
  UserCircleIcon,
  QueueListIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MenuAdmin() {
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/admin/dashboard")) {
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
      case "Dashboard":
        navigate("/admin/dashboard");
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
        Administración
      </h2>

      <li>
        <a className="font-bold text-lg">General</a>
        <ul>
          <MenuItem
            title="Dashboard"
            section={selected}
            onSelect={handleSelect}
            icon={<HomeIcon className="h-6 w-6" />}
          />
        </ul>
      </li>

      <li>
        <a className="font-bold text-lg">Gestión</a>
        <ul>
          <MenuItem
            title="Usuarios"
            section={selected}
            onSelect={handleSelect}
            icon={<UserCircleIcon className="h-6 w-6" />}
          />
          <MenuItem
            title="Reportes"
            section={selected}
            onSelect={handleSelect}
            icon={<ChartBarIcon className="h-6 w-6" />}
          />
        </ul>
      </li>

      <li>
        <a className="font-bold text-lg">Finanzas</a>
        <ul>
          <MenuItem
            title="Suscripciones"
            section={selected}
            onSelect={handleSelect}
            icon={<QueueListIcon className="h-6 w-6" />}
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

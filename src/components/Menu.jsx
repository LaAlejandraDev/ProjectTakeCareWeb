import {
  HomeIcon,
  ChatBubbleBottomCenterIcon,
  BookmarkIcon,
  UserCircleIcon,
  BookOpenIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [selected, setSelected] = useState("Inicio");
  const navigate = useNavigate();

  useEffect(() => {
    switch (selected) {
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
      case "Leer Mensajes":
        navigate("/index/read_Messages");
        break;
      case "Dashboard":
        navigate("/index/Dashboard");
        break;
      case "Expedientes":
        navigate("/index/Expediente");
    }
  }, [selected]);

  return (
    <>
      <ul className="menu bg-base-100 rounded-box shadow-sm gap-5">
        <MenuItem
          title={"Dashboard"}
          section={selected}
          setSection={setSelected}
        >
          <ChartBarIcon className="h-6 w-6" />
        </MenuItem>
        <MenuItem title={"Inicio"} section={selected} setSection={setSelected}>
          <HomeIcon className="h-6 w-6" />
        </MenuItem>
        <MenuItem
          title={"Mensajes"}
          section={selected}
          setSection={setSelected}
        >
          <ChatBubbleBottomCenterIcon className="h-6 w-6" />
        </MenuItem>
        <MenuItem
          title={"Mi Diario"}
          section={selected}
          setSection={setSelected}
        >
          <BookmarkIcon className="h-6 w-6" />
        </MenuItem>

        <MenuItem
          title={"Expedientes"}
          section={selected}
          setSection={setSelected}
        >
          <BookOpenIcon className="h-6 w-6" />
        </MenuItem>

        <MenuItem title={"Perfil"} section={selected} setSection={setSelected}>
          <UserCircleIcon className="h-6 w-6" />
        </MenuItem>
      </ul>
    </>
  );
}

function MenuItem({ title, section, setSection, children }) {
  return (
    <li onClick={() => setSection(title)}>
      <a
        className={
          "tooltip tooltip-right text-base-800 py-2 text-md " +
          (title == section ? "bg-secondary text-white" : null)
        }
        data-tip={title}
      >
        {children}
        {title}
      </a>
    </li>
  );
}

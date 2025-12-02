import {
  ScaleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function SearchBar() { // Componente para la barra de búsqueda del foro
  const navigate = useNavigate()

  const createPost = () => {
    navigate("/index/forum/post/create");
  };

  return (
    <>
      <div className="w-full flex gap-2">
        <input
          type="text"
          placeholder="Buscar en el foro..."
          className="input input-bordered w-full flex-grow input-lg rounded-xl"
        />
        <button className="btn btn-primary btn-lg rounded-xl">
          <MagnifyingGlassIcon className="size-[1.5em]" />
        </button>
        <button
          className="btn btn-secondary btn-lg rounded-xl" onClick={() => createPost()}
        >
          <PlusIcon className="size-[1.5em]" />
          Crear Post
        </button>
      </div>
    </>
  );
}

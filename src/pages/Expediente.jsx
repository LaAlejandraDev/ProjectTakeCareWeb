import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { APIExpedientes } from "../api/expedientes.api";
import { toast } from "react-toastify";
import Avatar from "../components/Avatar";
import { FolderIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const Expediente = () => {
  const { rolId } = useContext(AuthContext);
  const [listaExpedientes, setLista] = useState([]);
  const idPsicologo = rolId?.psicologo?.id;
  const [busqueda, setBusqueda] = useState("");

  async function getList() {
    try {
      const response = await APIExpedientes.listaExpedientes(idPsicologo);
      if (response.status === 200) {
        setLista(response.data);
      } else {
        toast.error("Error al obtener los expedientes");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (idPsicologo) getList();
  }, [idPsicologo]);

  const expedientesFiltrados = listaExpedientes.filter((item) => {
    const usuario = item?.paciente?.usuario;
    if (!usuario) return false;
    const nombreCompleto =
      `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Expedientes</h2>
        <p className="text-md text-gray-500">
          Selecciona un usuario para ver su expediente
        </p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Buscar expediente..."
          className="input input-bordered w-full mb-4"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="w-full my-2 shadow-md rounded-xl bg-base-100 p-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="">
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Información</th>
                <th>Últimas Citas</th>
                <th>Últimos Diarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expedientesFiltrados.map((item, index) => (
                <ItemList key={index} data={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function ItemList({ data }) {
  const navigate = useNavigate();
  const { paciente, citas, diarios } = data;
  const usuario = paciente?.usuario;

  const handleView = () => {
    navigate(`/index/session/${usuario?.id}`);
  };

  return (
    <tr className="hover:bg-gray-50 transition-all">
      <td>
        <Avatar name={usuario?.nombre} />
      </td>
      <td>
        <div className="font-bold text-lg">{usuario?.nombre}</div>
        <div className="text-gray-500 text-sm">
          {usuario?.apellidoPaterno} {usuario?.apellidoMaterno}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          {paciente?.ciudad} - {paciente?.estadoCivil}
        </div>
      </td>
      <td>
        <div className="text-sm">
          <div>Contacto: {paciente?.contactoEmergencia}</div>
          <div>Diagnóstico: {paciente?.diagnostico || "Ninguno"}</div>
        </div>
      </td>
      <td>
        {citas.length ? (
          <ul className="list-disc list-inside text-sm">
            {citas.slice(-3).map((cita) => (
              <li key={cita.id}>
                {new Date(cita.fechaInicio).toLocaleDateString()} -{" "}
                {cita.motivo}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-400 text-sm">Sin citas</span>
        )}
      </td>
      <td>
        {diarios.length ? (
          <ul className="list-disc list-inside text-sm">
            {diarios.slice(-3).map((diario) => (
              <li key={diario.id}>
                {new Date(diario.fecha).toLocaleDateString()} -{" "}
                {diario.estadoEmocional}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-400 text-sm">Sin diarios</span>
        )}
      </td>
      <td>
        <button
          className="btn btn-primary btn-sm text-white"
          onClick={handleView}
        >
          Ver{" "}
          <span className="ml-1">
            <FolderIcon className="size-[1.5em]" />
          </span>
        </button>
      </td>
    </tr>
  );
}

export default Expediente;

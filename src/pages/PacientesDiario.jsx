import React, { useEffect, useState } from "react";
import { PacientesAPI } from "../api/pacientes.api";
import { UserAPI } from "../api/user.api";
import { useNavigate } from "react-router-dom";

export default function PacientesDiario() { // Componente principal para mostrar la lista de pacientes y acceder a sus diarios emocionales
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      const resp = await PacientesAPI.getAll();
      const pacientesConUsuario = await Promise.all(
        resp.data.map(async (p) => {
          const userResp = await UserAPI.getUserInformation(p.idUsuario);
          return { ...p, usuario: userResp.data };
        })
      );
      setPacientes(pacientesConUsuario);
    } catch (err) {
      console.log("Error cargando pacientes:", err);
    }
  };

  const pacientesFiltrados = pacientes.filter((p) => {
    const nombre = p.usuario?.nombre?.toLowerCase() || "";
    const apellidoP = p.usuario?.apellidoPaterno?.toLowerCase() || "";
    const apellidoM = p.usuario?.apellidoMaterno?.toLowerCase() || "";
    const term = search.toLowerCase();
    return (
      nombre.includes(term) ||
      apellidoP.includes(term) ||
      apellidoM.includes(term)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Diario emocional de pacientes
      </h1>
      <input
        type="text"
        placeholder="Buscar por nombre o apellido"
        className="input input-bordered w-full  mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pacientesFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.usuario?.nombre}</td>
              <td>{p.usuario?.apellidoPaterno}</td>
              <td>{p.usuario?.apellidoMaterno}</td>
              <td>{p.usuario?.correo}</td>
              <td>{p.usuario?.telefono}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/index/diario/paciente/${p.id}`)}
                >
                  Ver diario
                </button>
              </td>
            </tr>
          ))}
          {pacientesFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No se encontraron pacientes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

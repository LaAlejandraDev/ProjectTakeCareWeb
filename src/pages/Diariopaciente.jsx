import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiarioAPI } from "../api/diario.api";
import { PacientesAPI } from "../api/pacientes.api";
import { UserAPI } from "../api/user.api";

export default function DiarioPaciente() {
  const { id } = useParams();
  const [diarios, setDiarios] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPaciente();
    loadDiarios();
  }, []);

  const loadPaciente = async () => {
    try {
      const resp = await PacientesAPI.getById(id);
      setPaciente(resp.data);

      const userResp = await UserAPI.getUserInformation(resp.data.idUsuario);
      setUsuario(userResp.data);
    } catch (err) {
      console.log("Error cargando paciente:", err);
    }
  };

  const loadDiarios = async () => {
    try {
      const resp = await DiarioAPI.getAll();
      const diariosPaciente = resp.data.filter((d) => d.idPaciente == id);

      diariosPaciente.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setDiarios(diariosPaciente);
    } catch (err) {
      console.log("Error cargando diario:", err);
    }
  };

  const diariosFiltrados = diarios.filter((d) => {
    const fecha = new Date(d.fecha).toLocaleDateString().toLowerCase();
    return fecha.includes(search.toLowerCase());
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">
            {usuario
              ? `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
              : "Cargando..."}
          </h2>

          {usuario && (
            <div className="mt-2 text-gray-600">
              <p>
                <b>Correo:</b> {usuario.correo}
              </p>
              <p>
                <b>Teléfono:</b> {usuario.telefono}
              </p>
            </div>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar por fecha (ej: 20/11/2025)"
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3 className="text-xl font-semibold mb-4">
        Entradas del diario emocional
      </h3>

      <div className="space-y-4">
        {diariosFiltrados.map((d) => (
          <div key={d.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h4 className="font-semibold">
                {new Date(d.fecha).toLocaleDateString()}
              </h4>

              <p>
                <b>Estado emocional:</b> {d.estadoEmocional}
              </p>
              <p>
                <b>Nivel:</b> {d.nivel}
              </p>

              <p className="mt-2 whitespace-pre-wrap">
                {d.comentario || "Sin comentario"}
              </p>
            </div>
          </div>
        ))}

        {diariosFiltrados.length === 0 && (
          <p className="text-center text-gray-500">No hay registros</p>
        )}
      </div>
    </div>
  );
}
